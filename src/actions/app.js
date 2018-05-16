export const UPDATE_PAGE = 'UPDATE_PAGE';
export const RECEIVE_LAZY_RESOURCES = 'RECEIVE_LAZY_RESOURCES';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_WIDE_LAYOUT = 'UPDATE_WIDE_LAYOUT';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const UPDATE_SUBTITLE = 'UPDATE_SUBTITLE';

export const navigate = (location) => (dispatch) => {
    // Extract the page name from path.
    // Any other info you might want to extract from the path (like page type),
    // you can do here.
    const pathname = location.pathname;
    const parts = pathname.slice(1).split('/');
    const page = parts[0] || 'home';
    // item id is in the path: /detail/{itemId}
    const itemId = parts[1];
    // query is extracted from the search string: /explore?q={query}
    const match = RegExp('[?&]q=([^&]*)').exec(location.search);
    const query = match && decodeURIComponent(match[1].replace(/\+/g, ' '))

    dispatch(loadPage(page, query, itemId));
};

const loadPage = (page, query, itemId) => async (dispatch, getState) => {
    let module;
    switch (page) {
        case 'home':
            await import('../components/home-page.js');
            // Put code here that you want it to run every time when
            // navigate to view1 page and home-page.js is loaded
            break;
        case 'about':
            await import('../components/about-page.js');
            // Put code here that you want it to run every time when
            // navigate to view1 page and home-page.js is loaded
            break;
        case 'search':
            module = await import('../components/item-search.js');
            // Put code here that you want it to run every time when
            // navigate to explore page and item-search.js is loaded.
            //
            // In this case, we want to dispatch searchItems action.
            // In item-search.js module it exports searchItems so we can call the function here.
            dispatch(module.searchItems(query));
            break;
        case 'detail':
            module = await import('../components/item-detail.js');
            // Fetch the item info for the given item id.
            await dispatch(module.fetchItem(itemId));
            // Wait for to check if the item id is valid.
            if (isFetchItemFailed(getState().item)) {
                page = '404';
            }
            break;
        default:
            // Nothing matches, set page to '404'.
            page = '404';
    }

    if (page === '404') {
        import('../components/not-found-page.js');
    }

    dispatch(updatePage(page));

    const lazyLoadComplete = getState().app.lazyResourcesLoaded;
    // load lazy resources after render and set `lazyLoadComplete` when done.
    if (!lazyLoadComplete) {
        requestAnimationFrame(async () => {
            await import('../components/lazy-resources.js');
            dispatch({
                type: RECEIVE_LAZY_RESOURCES
            });
        });
    }
}

export const refreshPage = () => (dispatch, getState) => {
    const state = getState();
    // load page using the current state
    dispatch(loadPage(state.app.page, state.item && state.item.query, state.item && state.item.id));
}

const updatePage = (page) => {
    return {
        type: UPDATE_PAGE,
        page
    };
}

const isFetchItemFailed = (item) => {
    return !item.isFetching && item.failure;
}

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
    dispatch({
        type: OPEN_SNACKBAR
    });
    clearTimeout(snackbarTimer);
    snackbarTimer = setTimeout(() =>
        dispatch({type: CLOSE_SNACKBAR}), 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
    const prev = getState().app.offline;
    dispatch({
        type: UPDATE_OFFLINE,
        offline
    });
    if (prev !== undefined) {
        dispatch(showSnackbar());
    }
    //  automatically refresh when you come back online (offline was true and now is false)
    if (prev === true && offline === false) {
        dispatch(refreshPage());
    }
};

export const updateLayout = (wide) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_WIDE_LAYOUT,
        wide
    });
    if (getState().app.drawerOpened) {
        dispatch(updateDrawerState(false));
    }
}

export const updateDrawerState = (opened) => (dispatch, getState) => {
    if (getState().app.drawerOpened !== opened) {
        dispatch({
            type: UPDATE_DRAWER_STATE,
            opened
        });
    }
}

export const updateSubTitle = (subTitle) => {
    return {
        type: UPDATE_SUBTITLE,
        subTitle
    }
}

export const updateLocationURL = (url) => (dispatch) => {
    window.history.pushState({}, '', url);
    dispatch(navigate(window.location));
}

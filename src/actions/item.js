export const REQUEST_ITEM = 'REQUEST_ITEM';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const FAIL_ITEM = 'FAIL_ITEM';

const dbPromise = window.dbPromise = new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open('gowars', 5);
    openRequest.onsuccess = (event) => {
        resolve(event.target.result);
    };
    openRequest.onupgradeneeded = (event) => {
        event.target.result.createObjectStore('detail', {keyPath: "id"});
        event.target.result.createObjectStore('search', {keyPath: "id"});
    };
    openRequest.onerror = (error) => {
        reject(error);
    };
});

export const fetchItem = (id) => (dispatch, getState) => {

    dispatch(requestItem(id));
    //const state = getState();
    //const item = state.item && state.item.items && state.item.items[id];
    // if (item) {
    //     // item found in state.item.items
    //     dispatch(receiveItem(id));
    //     // dispatch()
    //     // let the calling code know there's nothing to wait for.
    //     return Promise.resolve();
    // } else {
    // item was not found in the store state

    // fetch item data given the item id.
    // also return a promise to wait for.
    dbPromise.then((db) => {
        const transaction = db.transaction(["detail"], 'readonly');
        const objectStore = transaction.objectStore("detail");
        const request = objectStore.get(parseInt(id));

        request.onerror = function (event) {
            //TODO Persist error log to database?
            console.log(item.error);
            dispatch(failItem(id));
        };
        request.onsuccess = function (event) {
            // onsuccess is in terms of errors. No results found / returned is still a success.
            // If result is undefined, no cached item was found.
            if (request.result !== undefined) {
                dispatch(receiveItem(id, request.result));
            } else {
                // Item was not found in cache, fetch it over HTTP.
                return fetch(`http://localhost:8082/item/${id}`)
                    .then(res => res.json())
                    .then(item => {
                        if (item.error) {
                            //TODO Persist error log to database?
                            console.log(item.error);
                            dispatch(failItem(id));
                        } else {
                            dispatch(receiveItem(id, item));
                            dispatch(saveItem(id, item));
                        }
                    })
                    .catch((e) => dispatch(failItem(id)));
            }
        };
    });
   // }
};

export const saveItem = (id, item) => (dispatch, getState) => {

    console.dir(item);

    dbPromise.then((db) => {
        //TODO Is there a writeonly? cant find such enum
        const transaction = db.transaction(['detail'], 'readwrite');
        const objectStore = transaction.objectStore('detail');

        const objectStoreRequest = objectStore.add(item);
        objectStoreRequest.onsuccess = () => {
            dispatch(receiveItem(id, item));
        };
    });
};

// export const loadItem = (id) => (dispatch) => {
//     dbPromise.then((db) => {
//         const transaction = db.transaction(['item'], 'readwrite');
//         const objectStore = transaction.get(id);
//         objectStore.onerror = function(event) {
//             dispatch(failItem(id));
//         };
//         objectStore.onsuccess = function(event) {
//             dispatch(receiveItem(id, objectStore.item));
//         };
//     });
// };


const requestItem = (id) => {
    return {
        type: REQUEST_ITEM,
        id
    };
};

const receiveItem = (id, item) => {
    return {
        type: RECEIVE_ITEM,
        id,
        item
    };
};

const failItem = (id) => {
    return {
        type: FAIL_ITEM,
        id
    };
};


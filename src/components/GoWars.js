import {LitElement, html} from '@polymer/lit-element';

import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import {menuIcon, backIcon, accountIcon} from './icons.js';
import './snack-bar.js'
import './item-input-decorator.js';
import './speech-mic.js';

import {connect} from 'pwa-helpers/connect-mixin.js';
import {installRouter} from 'pwa-helpers/router.js';
import {installOfflineWatcher} from 'pwa-helpers/network.js';
import {installMediaQueryWatcher} from 'pwa-helpers/media-query.js';
import {SharedStyles} from './shared-styles.js';

import {store} from '../store.js';
import {
    navigate,
    updateLocationURL,
    updateOffline,
    updateLayout,
    showSnackbar,
    updateDrawerState
} from '../actions/app.js';

class GoWars extends connect(store)(LitElement) {
    _render({
        appTitle,
        _page,
        _lazyResourcesLoaded,
        _subTitle,
        _lastVisitedListPage,
        _offline,
        _wideLayout,
        _drawerOpened,
        _snackbarOpened,
        _query,
        _bookId
    }) {

        // True to hide the menu button and show the back button.
        const hideMenuBtn = _page === 'detail';
        // True to hide the input.

        const backHref = _page === 'detail' ? `/search?q=${_query}` : `/detail/${_bookId}`;
        return html`
                ${SharedStyles}
                <!-- Header -->
                <app-header condenses reveals effects="waterfall">
                    <app-toolbar class="toolbar-top">
                        <button class="menu-btn" aria-label="Menu" hidden?="${hideMenuBtn}" on-click="${() => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
                        <a class="back-btn" aria-label="Go back" hidden?="${!hideMenuBtn}" href="${backHref}">${backIcon}</a>
                        <div main-title>
                            <a href="/search">${appTitle}</a>
                        </div>
                    </app-toolbar>
                </app-header>
                
                <!-- Drawer content -->
                <app-drawer opened="${_drawerOpened}" hidden="${!_lazyResourcesLoaded}" on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
                  <nav class="drawer-list" on-click="${e => store.dispatch(updateDrawerState(false))}">
                    <a selected?="${_page === 'home'}" href="/home">Home</a>
                    <a selected?="${_page === 'search'}" href="/search?q=${_query}">Search</a>
                    <a selected?="${_page === 'about'}" href="/about">About</a>
                  </nav>
                </app-drawer>
            
                <!-- Main content -->
                <main class="main-content">
                  <home-page class="_page" active?="${_page === 'home'}"></home-page>
                  <about-page class="_page" active?="${_page === 'about'}"></about-page>
                  <item-search class="_page" active?="${_page === 'search'}"></item-search>
                  <item-detail class="_page" active?="${_page === 'detail'}"></item-detail>
                  <not-found-page class="_page" active?="${_page === '404'}"></not-found-page>
                </main>
            
                <footer>
                  <p>&copy; 2018 Krijn van der Burg</p>
                </footer>
            
                <snack-bar active?="${_snackbarOpened}">
                    You are now ${_offline ? 'offline' : 'online'}.</snack-bar>
                `;
    }

    static get properties() {
        return {
            appTitle: String,
            _page: String,
            _lazyResourcesLoaded: Boolean,
            _subTitle: String,
            _lastVisitedListPage: Boolean,
            _offline: Boolean,
            _wideLayout: Boolean,
            _drawerOpened: Boolean,
            _snackbarOpened: Boolean,
            _query: String,
            _itemId: String
        }
    }

    _didRender(props, changed) {
        if ('_page' in changed) {
            window.scrollTo(0, 0);
        }
    }

    _firstRendered() {
        installRouter((location) => store.dispatch(navigate(location)));
        installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
        installMediaQueryWatcher(`(min - width:648px)and(min - height:648px)`, (matches) => store.dispatch(updateLayout(matches)));
        this._input = this.shadowRoot.getElementById('input');
    }

    _stateChanged(state) {
        this._page = state.app.page;
        this._lazyResourcesLoaded = state.app.lazyResourcesLoaded;
        this._subTitle = state.app.subTitle;
        this._lastVisitedListPage = state.app.lastVisitedListPage;
        this._offline = state.app.offline;
        this._wideLayout = state.app.wideLayout;
        this._drawerOpened = state.app.drawerOpened;
        this._snackbarOpened = state.app.snackbarOpened;
        this._query = state.item && state.item.query || '';
        this._bookId = state.item && state.item.id;
    }

    _micResult(e) {
        const d = e.detail;
        const value = d.completeTranscript;
        this._input.value = value;
        if (d.isFinal) {
            store.dispatch(updateLocationURL(`/search?q=${value}`));
        }
    }
}

window.customElements.define('go-wars', GoWars);

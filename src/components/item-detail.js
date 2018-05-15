import {PageViewElement} from './page-view-element.js';
import {connect} from 'pwa-helpers/connect-mixin.js';

import {ItemDetailTemplate} from './templates/tpl_item-detail';
import './item-offline.js';
import './item-image.js';

// This element is connected to the redux store.
import {store} from '../store.js';

import {fetchItem} from '../actions/item.js';
import {item, itemSelector} from '../reducers/item.js';

// We are lazy loading its reducer.
store.addReducers({
    item: item,
});

class ItemDetail extends connect(store)(PageViewElement) {
    _render({_item, _lastVisitedListPage, _showOffline}) {
        // Don't render if there is no item.
        if (!_item) {
            return;
        }

        return ItemDetailTemplate(_item,_lastVisitedListPage, _showOffline);
    }

    static get properties() {
        return {
            _item: Object,
            _lastVisitedListPage: Boolean,
            _showOffline: Boolean
        }
    }

    // This is called every time something is updated in the store.
    _stateChanged(state) {
        this._item = itemSelector(state);
        this._lastVisitedListPage = state.app.lastVisitedListPage;
        this._showOffline = state.app.offline && state.item.failure;
    }
}

window.customElements.define('item-detail', ItemDetail);

export {fetchItem};

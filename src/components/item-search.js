import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import {ItemSearchTemplate} from './templates/tpl_item-search';

import './item-image.js';
import './item-card.js';
import './item-offline.js';

// This element is connected to the redux store.
import { store } from '../store.js';

import { searchItems } from '../actions/items.js';
import { refreshPage } from '../actions/app.js';
import { items, itemListSelector } from '../reducers/items.js';

// We are lazy loading its reducer.
store.addReducers({
  item: items
});

class ItemSearch extends connect(store)(PageViewElement) {
  _render({_query, _items, _showOffline}) {
    updateMetadata({
      title: `${_query ? `${_query} - ` : ''} - item`,
      description: 'Search for GW2 item'
    });

    return  ItemSearchTemplate(_query, _items, _showOffline);
  }

  static get properties() { return {
    _query: String,
    _items: Array,
    _showOffline: Boolean
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._query = state.item.query;
    this._items = itemListSelector(state);
    this._showOffline = state.app.offline && state.item.failure;
  }
}

window.customElements.define('item-search', ItemSearch);

export { searchItems, refreshPage };

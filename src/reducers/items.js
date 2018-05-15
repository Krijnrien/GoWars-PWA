import { createSelector } from 'reselect';
import {
  REQUEST_ITEMS, RECEIVE_ITEMS, FAIL_ITEMS,
} from '../actions/items.js';

export const items = (state = {query: null}, action) => {
  switch (action.type) {
    case REQUEST_ITEMS:
      return {
        ...state,
        query: action.query,
        items: null, // reset items
        failure: false,
        isFetching: true
      };
    case RECEIVE_ITEMS:
      return {
        ...state,
        items: action.items.reduce((obj, item) => {
            obj[item.id] = item;
            return obj;
          }, {}),
        failure: false,
        isFetching: false
      };
    case FAIL_ITEMS:
      return {
        ...state,
        items: null,
        failure: true,
        isFetching: false
      };
    default:
      return state;
  }
}

export const itemsSelector = state => state.item && state.item.items;

export const itemListSelector = createSelector(
  itemsSelector,
  (items) => {
    return items ? Object.keys(items).map(key => items[key]) : [{},{},{},{},{}];
  }
);

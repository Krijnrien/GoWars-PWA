import { createSelector } from 'reselect';
import { itemsSelector } from './items.js';
import {
  REQUEST_ITEM, RECEIVE_ITEM, FAIL_ITEM
} from '../actions/item.js';

export const item = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ITEM:
      return {
        ...state,
        id: action.id,
        failure: false,
        isFetching: true
      };
    case RECEIVE_ITEM:
      return {
        ...state,
        item: action.item,
        failure: false,
        isFetching: false
      };
    case FAIL_ITEM:
      return {
        ...state,
        failure: true,
        isFetching: false
      };
    default:
      return state;
  }
}

const idSelector = state => state.item.id;
//TODO Fix naming scheme, also item.item?
const itemItemSelector = state => state.item.item;

export const itemSelector = createSelector(
  idSelector,
  itemsSelector,
  itemItemSelector,
  (id, items, item) => {
    return items && items[id] || item;
  }
);

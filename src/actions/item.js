export const REQUEST_ITEM = 'REQUEST_ITEM';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const FAIL_ITEM = 'FAIL_ITEM';

export const fetchItem = (id) => (dispatch, getState) => {

  dispatch(requestItem(id));
  const state = getState();
  const item = state.item && state.item.items && state.item.items[id];
  if (item) {

    // item found in state.item.items
    dispatch(receiveItem(id));
    // let the calling code know there's nothing to wait for.
    return Promise.resolve();
  } else {

    // fetch item data given the item id.
    // also return a promise to wait for.

    return fetch(`http://localhost:8082/item/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch(failItem(id));
        } else {
          dispatch(receiveItem(id, data));
        }
      })
      .catch((e) => dispatch(failItem(id)));
  }

};

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


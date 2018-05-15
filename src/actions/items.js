export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const FAIL_ITEMS = 'FAIL_ITEMS';

export const searchItems = (query) => (dispatch, getState) => {
  // Check to see if the cached results are from the same query.
  // This is useful for avoiding a network request.
  if (shouldSearchItems(getState(), query)) {
    dispatch(requestItems(query));
    if (query) {
      // const by = 'relevance';
      // const fields = 'fields=items(id,volumeInfo/*,accessInfo(embeddable,country,viewability))';
      fetch(`http://localhost:8082/item?name=${query}`)
        .then(res => res.json())
        .then(data => dispatch(receiveItems(query, data)))
        .catch(() => dispatch(failItems(query)));
    } else {
      // query is empty, clear the results
      dispatch(receiveItems(query, []));
    }
  }
};

const shouldSearchItems = (state, query) => {
  return state.item.failure || state.item.query !== query && !state.item.isFetching;
}

const requestItems = (query) => {
  return {
    type: REQUEST_ITEMS,
    query
  };
};

const receiveItems = (query, items) => {
  return {
    type: RECEIVE_ITEMS,
    query,
    items
  };
};

const failItems = (query) => {
  return {
    type: FAIL_ITEMS,
    query
  };
};

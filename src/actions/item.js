export const REQUEST_ITEM = 'REQUEST_ITEM';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const FAIL_ITEM = 'FAIL_ITEM';

const dbPromise = window.dbPromise = new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open('item', 5);
    openRequest.onsuccess = (event) => {
        resolve(event.target.result);
    };
    openRequest.onupgradeneeded = (event) => {
        event.target.result.createObjectStore('item', {keyPath: 'id'});
    };
    openRequest.onerror = (error) => {
        reject(error);
    };
});

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
        dbPromise.then((db) => {
            const transaction = db.transaction(["item"], 'readwrite');
            const objectStore = transaction.objectStore("item");
            console.log(id);
            //todo put id as varaible back below
            const request = objectStore.get(12885);

            request.onerror = function (event) {
                //TODO remove console log, temporary help
                console.log("failed");
                return fetch(`http://localhost:8082/item/${id}`)
                    .then(res => res.json())
                    .then(item => {
                        if (item.error) {
                            //TODO remove console log, temporary help
                            console.log("failed");
                            dispatch(failItem(id));
                        } else {
                            dispatch(receiveItem(id, item));
                            dispatch(saveItem(id, item))
                        }
                    })
                    .catch((e) => dispatch(failItem(id)));
            };
            request.onsuccess = function (event) {
                //TODO remove console log, temporary help
                console.log("success");
                //TODO Probably request.item is not valid
                console.log(request.result.item.toString())
                dispatch(receiveItem(id, request.result.item));
            };
        });
    }
};

export const saveItem = (id, item) => (dispatch, getState) => {
    dbPromise.then((db) => {
        const transaction = db.transaction(['item'], 'readwrite');
        const objectStore = transaction.objectStore('item');
        const objectStoreRequest = objectStore.add({
            id: item.id,
            name: item.name,
            icon: item.icon,
            type: item.type,
            rarity: item.rarity,
            level: item.level,
            vendor_value: item.vendor_value,
        });
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


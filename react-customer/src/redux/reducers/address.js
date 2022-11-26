import * as Types from '../../constants/ActionType';
let initialState = [];
let index = -1;

const findIndexs = (id, state) => {
    index = state.findIndex(e => e.cartId === id)
    return index;
}
const addresses = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_ADDRESS:
            state = action.items;
            return [...state];
        case Types.ADD_ADDRESS:
            state.push(action.item);
            return [...state];
        case Types.UPDATE_ADDRESS:
            state = action.items
            return [...state];
        case Types.REMOVE_ADDRESS:
            state = action.items
            return [...state];
        default: return [...state];
    }
};

export default addresses;
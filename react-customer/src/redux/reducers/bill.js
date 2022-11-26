import * as Types from './../../constants/ActionType';
let initialState = [];
let index = -1;

const findIndexs = (id, state) => {
    index = state.findIndex(e => e.id === id)
    return index;
}
const products = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_BILL:
            state = action.items;
            return [...state];
        case Types.ADD_BILL:
            state.push(action.item);
            return [...state];
        case Types.UPDATE_BILL:
            index = findIndexs(action.item.id, state);
            state[index] = { ...action.item };
            return [...state];
        case Types.REMOVE_BILL:
            index = findIndexs(action.item.id, state);
            state.splice(index, 1);
            return [...state];
        case Types.CLEAR_BILL:
            state = [];
            return [...state];
        default: return [...state];
    }
};

export default products;
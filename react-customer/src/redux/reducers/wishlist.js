import * as Types from '../../constants/ActionType';
let initialState = [];
let index = -1;

const findIndexs = (id, state) => {
    index = state.findIndex(e => e.wishlistId === id)
    return index;
}
const wishlist = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_WISHLIST:
      state = action.wishlist;
      return [...state];
    case Types.ADD_WISHLIST:
      state.push(action.wishlist);
      return [...state];
    case Types.REMOVE_WISHLIST:
      console.log("hêlo",action,state)
      index = findIndexs(action.id, state);
      state.splice(index, 1);
      return [...state];
    default: return [...state];
  }
};

export default wishlist;
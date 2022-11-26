import * as Types from '../../constants/ActionType';
let initialState = [];

const user = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_USER:
            state = action.user;
            return state;
        case Types.UPDATE_USER:
            state = Object.assign({},state,action.user);
            return state;
        default: return state;
    }
};

export default user;
import * as Types from '../../constants/ActionType';
let initialState = [];

const search = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_KEYSEARCH:
            state = action.newKeyPage;
            return  {...state};
        default: return {...state};
    }
};

export default search;
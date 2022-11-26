import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';

export const actFetchCategoriesRequest = () => {
    return async dispatch => {
        const res = await callApi('category/all', 'GET');
        if ( res && res.status === 200 ) {
            dispatch(actFetchCategories(res.data));
        }      
    };
}

export const actFetchCategories = (categories) => {
    return {
        type : Types.FETCH_CATEGORIES,
        categories
    }
}
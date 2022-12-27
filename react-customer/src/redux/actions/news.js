import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { actShowLoading, actHiddenLoading } from './loading'


// lấy tất cả tin tức
export const actFetchNewsRequest = (page) => {
    const newPage = page === null || page === undefined ? 1 : page
    return dispatch => {
        dispatch(actShowLoading());
        return new Promise((resolve, reject) => {
            callApi(`news/search?page=${newPage}&size=12&keyword`, 'GET', null, null)
                .then(res => {
                    if (res && res.status === 200) {
                        console.log("đây là trả về", res);
                        console.log("đây là trả về", res.data.listNews);
                        dispatch(actFetchNews(res.data.listNews));
                        resolve(res.data);
                        setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                    setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
                });
        });
    };
};




// lấy tin tức theo id
export const actGetNewRequest = (id) => {
    return async dispatch => {
        localStorage.setItem('_idnew', id);
        dispatch(actShowLoading());
        let token = localStorage.getItem('_auth');
        const res = await callApi(`news/${id}`, 'GET', null, null);
        if (res && res.status === 200) {
            console.log("vào đây rồi lấy thông tin luôn rồi", res.data)
            dispatch(actGetNew(res.data));
            setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
        }
        setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
    }
}

export const actGetNew = (product) => {
    return {
        type: Types.FETCH_NEW,
        product
    }
}
// lấy tin tức theo từ khóa
export const actGetNewOfKeyRequest = (key, page) => {
    const newPage = page === null || page === undefined ? 1 : page
    const newKey = (key === undefined || key === '' || key === null) ? 'latop' : key
    console.log(newPage, newKey)
    return dispatch => {
        //dispatch(actShowLoading());
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem('_auth');
            console.log('newKey: ', newKey);
            callApi(`product/search?keyword=${newKey}`, 'GET', null, token)
                .then(res => {
                    if (res && res.status === 200) {
                        localStorage.setItem("_keyword", newKey)
                        console.log("actGetNewOfKeyRequest res", res)
                        const newKeyPage = { key: newKey, totalPage: res.data.totalPage }
                        dispatch(actFetchNews(res.data.listProducts));
                        dispatch(actFetchKeySearch(newKeyPage));
                        console.log("lưu search", newKeyPage)
                        resolve(res.data);
                        //setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                    //setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
                });
        });
    };
}

export const actGetNewOfCategoryRequest = (name, page) => {
    const newPage = page === null || page === undefined ? 1 : page
    const newCategory = (name === undefined || name === '' || name === null) ? 'latop' : name
    console.log(newPage, newCategory)
    return dispatch => {
        dispatch(actShowLoading());
        return new Promise((resolve, reject) => {
            callApi(`view/product/search?category=${newCategory}&page=${newPage}`, 'GET')
                .then(res => {
                    if (res && res.status === 200) {
                        const newKeyPage = { key: newCategory, totalPage: res.data.totalPage }
                        dispatch(actFetchNews(res.data.listProduct));
                        dispatch(actFetchKeySearch(newKeyPage));
                        resolve(res.data);
                        setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                    setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
                });
        });
    };
}

export const actFetchNews = (products) => {
    return {
        type: Types.FETCH_NEWS,
        products
    }
}
//lưu tên search
export const actFetchKeySearch = (newKeyPage) => {
    return {
        type: Types.FETCH_KEYSEARCH,
        newKeyPage
    }
}




import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import { startLoading, doneLoading } from '../../utils/loading';
import 'react-toastify/dist/ReactToastify.css';



export const actFetchUserRequset = (id) => {
    return async dispatch => {
        let token = localStorage.getItem('_auth');
        const res = await callApi(`profile/${id}`, 'GET', null, token);
        console.log('actFetchUserRequset res: ', res);
        if (res && res.status === 200) {
            console.log(res.data)
            dispatch(actFetchUser(res.data));
        }
        return res
    };
}

export const actUpdateMeRequset = (data) => {
    return async dispatch => {
        let id = localStorage.getItem('_id');
        let token = localStorage.getItem('_auth');
        const res = await callApi(`profile/update/${id}`, 'PUT', data, token);
        console.log('actUpdateMeRequset res: ', res);
        if (res && res.status === 200) {
            console.log(res.data)
            dispatch(actFetchUserRequset(id));
            toast.success('Cập nhập tài khoản thành công')
        }
    };
}

export const actChangePasswordMeRequset = (data) => {
    return async dispatch => {
        let token = localStorage.getItem('_auth');
        const res = await callApi('profile/edit/password', 'PUT', data, token);
        if (res && res.status === 200) {
            toast.success('Thay đổi mật khẩu thành công')
        }
    };
}

export const actFetchUser = (user) => {
    return {
        type: Types.FETCH_USER,
        user
    }
}
export const actUpdateUser = (user) => {
    return {
        type: Types.UPDATE_USER,
        user
    }
}
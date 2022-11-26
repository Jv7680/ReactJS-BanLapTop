import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import { startLoading, doneLoading } from '../../utils/loading';
import 'react-toastify/dist/ReactToastify.css';



export const actFetchUserRequset = (id,idaccount) => {
    return async dispatch => {
        const res =await callApi(`account/profile?customerId=${id}&accountId=${idaccount}`, 'GET');
        if (res && res.status === 200) {
            console.log(res.data)
            dispatch(actFetchUser(res.data));
        }
        return res
    };
}

export const actUpdateMeRequset = (data) => {
    return async dispatch => {
        const res = await callApi('account/profile', 'PUT', data);
        if (res && res.status === 200) {
            console.log(res.data)
            dispatch(actUpdateUser(res.data));
            toast.success('Cập nhập tài khoản thành công')
        }
    };
}

export const actChangePasswordMeRequset = (data) => {
    return async dispatch => {
        const res = await callApi('account/password', 'PUT', data);
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
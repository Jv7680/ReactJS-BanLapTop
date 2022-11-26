import * as Types from '../../constants/ActionType';
import { toast } from 'react-toastify';
import callApi from '../../utils/apiCaller';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



export const actAddAddressRequest = (address) => {

    console.log("chuẩn bị call api", address)
    
    return async dispatch => {
        
        console.log("dữ liệu chuẩn bị gửi đi", address)
        const res = await callApi('address', 'POST', address);
        console.log("dữ liệu chuẩn bị gửi về", res)
        
        if (res && res.status === 200) {
            dispatch(actFetchAddress(res.data));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đã thêm địa chỉ',
                showConfirmButton: false,
                timer: 1000
              })
            
        };
        return res;
    }
}

export const actAddAddress = (item) => {
    return {
        type: Types.ADD_ADDRESS,
        item
    }
}

// lấy dữ liệu đia chỉ
export const actFetchAddressRequest = (id) => {
    console.log("dữ liệu chuẩn bị gửi đi", id)
    return async dispatch => {
        console.log("dữ liệu chuẩn bị gửi đi",id)
        const res = await callApi(`address/${id}`, 'GET');
        if (res && res.status === 200) {
            console.log("địa chỉ của tôi",res.data)
            dispatch(actFetchAddress(res.data));
        };
        return res.data;
    };
}

export const actFetchAddress = (items) => {
    return {
        type: Types.FETCH_ADDRESS,
        items
    }

}

// xóa giỏ hàng
export const actRemoveAddressRequest = (idAddress,id) => {
    console.log(idAddress,id)
    return async dispatch => {
        const res = await callApi(`address/delete/${id}?deliveryId=${idAddress}`, 'PUT');
        console.log(res.status)
        if (res && res.status === 200) {
            dispatch(actRemoveAddress(res.data));      
        };
        if(res && res.status === 204)
        {
            dispatch(actRemoveAddress([]));
        }
        return res
    };
}

export const actRemoveAddress = (items) => {
    return {
        type: Types.REMOVE_ADDRESS,
        items
    }
}

// sửa giỏ hàng
export const actUpdateAddressRequest = (idAddress,data) => {
    let id = localStorage.getItem("_id")
    console.log("dữ liệu chuẩn bị gửi đi", data)
    return async dispatch => {
        const res = await callApi(`address/${idAddress}`, 'PUT',data);
        if (res && res.status === 200) {
            dispatch(actUpdateAddress(res.data));
        };
        return res
    };
}

export const actUpdateAddress = (items) => {
    // console.log(item)
    return {
        type: Types.UPDATE_ADDRESS,
        items
    }
}

// // export const actClearRequest = () => {
// //     return async dispatch => {
// //         localStorage.setItem('_cart', JSON.stringify([]) );
// //         dispatch(actClearCart());
// //     };
// // }
// // export const actClearCart = (clear) => {
// //     return {
// //         type: Types.CLEAR_CART
// //     }
// // }
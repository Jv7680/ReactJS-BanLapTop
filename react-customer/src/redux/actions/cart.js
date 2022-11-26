import * as Types from '../../constants/ActionType';
import { toast } from 'react-toastify';
import callApi from '../../utils/apiCaller';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import { actShowLoading, actHiddenLoading } from './loading'
import withReactContent from "sweetalert2-react-content";



export const actAddCartRequest = (customerId, product, quantity) => {

    console.log("chuẩn bị call api", customerId, product, quantity)
    const newQuantity = quantity ? quantity : 1;
        const dataguidi = { customerId, productId: product.productId, quantity: newQuantity }
    return async dispatch => {
        if (quantity > product.quantity) {
            return toast.error(`Sản phẩm của chúng tôi hiện còn có ${product.quantity} sản phẩm`)
        }
        console.log("dữ liệu chuẩn bị gửi đi", dataguidi)
        const res = await callApi('cart', 'POST', dataguidi);
        console.log("dữ liệu chuẩn bị gửi về", res)
        
        if (res && res.status === 200) {
            dispatch(actFetchCart(res.data.cartEntities));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đã thêm vào giỏ',
                showConfirmButton: false,
                timer: 1000
              })
        };
    }
}

export const actAddCart = (item) => {
    return {
        type: Types.ADD_CART,
        item
    }
}

// lấy dữ liệu giỏ hàng
export const actFetchCartRequest = (id) => {
    console.log("dữ liệu chuẩn bị gửi đi", id)
    return async dispatch => {
        console.log("dữ liệu chuẩn bị gửi đi",id)
        const res = await callApi(`cart/${id}`, 'GET');
        if (res && res.status === 200) {
            console.log("giỏ hang của tôi",res.data.cartEntities)
            dispatch(actFetchCart(res.data.cartEntities));
        };
    };
}

export const actFetchCart = (items) => {
    return {
        type: Types.FETCH_CART,
        items
    }

}

// xóa giỏ hàng
export const actRemoveCartRequest = (item) => {
    let id = parseInt(localStorage.getItem("_id"))
    const dataguidi = {customerId:id,productId:item.productId,quantity:item.quantity}
    console.log("dữ liệu chuẩn bị gửi đi", dataguidi)
    return async dispatch => {
        const res = await callApi(`cart`, 'DELETE',dataguidi);
        console.log(res.status)
        if (res && res.status === 200) {
            console.log("xem thong tin ")
            console.log(res.data.cartEntities)
            dispatch(actRemoveCart(res.data.cartEntities))
        };
        if(res && res.status === 204)
        {
            dispatch(actRemoveCart([]))
        }
    };
}

export const actRemoveCart = (item) => {
    return {
        type: Types.REMOVE_CART,
        item
    }
}

// sửa giỏ hàng
export const actUpdateCartRequest = (item) => {
    let id = parseInt(localStorage.getItem("_id"))
    
    const dataguidi = {customerId:id,productId:item.productId,quantity:item.quantity}
    console.log("dữ liệu chuẩn bị gửi đi", dataguidi)
    return async dispatch => {
        const res = await callApi(`cart`, 'PUT',dataguidi);
        if (res && res.status === 200) {
           
            dispatch(actUpdateCart(res.data.cartEntities));
            console.log("giỏ hàng trả về",res.data.cartEntities)
        };
      
    };
}

export const actUpdateCart = (item) => {
    // console.log(item)
    return {
        type: Types.UPDATE_CART,
        item
    }
}

export const actClearRequest = () => {
    return async dispatch => {
      
        localStorage.setItem('_cart', JSON.stringify([]) );
        dispatch(actClearCart());
        
    };
}
export const actClearCart = (clear) => {
    return {
        type: Types.CLEAR_CART
    }
}
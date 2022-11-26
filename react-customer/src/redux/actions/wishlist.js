import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';




export const actFetchWishListRequest = (id) => {
  const idnew = parseInt(id)
  return async dispatch => {
    const res = await callApi(`wishlist?customerId=${idnew}`, 'GET');

    if (res && res.status === 200) {

      dispatch(actFetchWishList(res.data));
    }
    if(res && res.status === 204){
      dispatch(actFetchWishList([]));
    }
  };
}

export const actFetchWishList = (wishlist) => {
  return {
    type: Types.FETCH_WISHLIST,
    wishlist
  }
}

export const actAddWishListRequest = (customerId, productId) => {
  let data = {customerId,productId}
  console.log("haha",data)
  return async dispatch => {
    const res = await callApi('wishlist', 'POST',data);
    if (res && res.status === 200) {
      dispatch(actFetchWishListRequest(customerId))
      toast.success('thêm yêu thích thành công')

    }
  };
}

// export const actAddFavorite = (favorite) => {
//   return {
//     type: Types.ADD_FAVORITE,
//     favorite
//   }
// }

export const actDeleteWishListRequest = (idwishlist) => {
  return async dispatch => {
    const res = await callApi(`wishlist?wishlistId=${idwishlist}`, 'PUT');
    if (res && res.status == 200) {
      dispatch(actDeleteWishList(idwishlist))
    }
  };
}

export const actDeleteWishList = (id) => {
  return {
    type: Types.REMOVE_WISHLIST,
    id
  }
}

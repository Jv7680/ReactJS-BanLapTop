import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actShowLoading, actHiddenLoading } from './loading'



export const actFetchOrdersRequest = (status, id) => {
  const statusOrder = status == null || status === undefined ? "chưa duyệt" : status;
  const dataguidi = { statusOrder }
  console.log("trạng thái gửi đi", statusOrder)
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`orders/${id}`, "POST", dataguidi)
        .then(res => {
          if (res && res.status === 200) {
            dispatch(actFetchOrders(res.data));
            resolve(res.data);
            setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
          }
          else
            dispatch(actFetchOrders(res.data));
          { setTimeout(function () { dispatch(actHiddenLoading()) }, 200); }

        })
        .catch(err => {
          console.log(err);
          reject(err);
          setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
        });
    });
  };
};

export const actFetchOrdersDeliveredRequest = (status, id) => {
  const statusOrder = status == null || status === undefined ? "chưa duyệt" : status;
  const dataguidi = { statusOrder }
  console.log("trạng thái gửi đi", statusOrder)
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`orders/delivered/${id}`, "POST", dataguidi)
        .then(res => {
          if (res && res.status === 200) {
            dispatch(actFetchOrders(res.data));
            resolve(res.data);
            setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
          }
          else
            dispatch(actFetchOrders(res.data));
          { setTimeout(function () { dispatch(actHiddenLoading()) }, 200); }

        })
        .catch(err => {
          console.log(err);
          reject(err);
          setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
        });
    });
  };
};
export const actFetchOrders = orders => {
  return {
    type: Types.FETCH_ORDERS,
    orders
  };
};
export const actDeleteOrderRequest = (id) => {
  return async dispatch => {
    const res = await callApi(`orders/cancel/${id}`, "PUT");
    if(res && res.status === 200){
      dispatch(actDeleteOrder(id));
    }
  
  };
};

export const actDeleteOrder = id => {
  return {
    type: Types.REMOVE_ORDER,
    id
  };
};
export const actAddReview = (orderId, productId, customerId, rating, comments) => {

  const dataguidi = { orderId, productId, customerId, rating, comments }


  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`reviews`, "POST", dataguidi)
        .then(res => {
          if (res && res.status === 200) {
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

import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actShowLoading, actHiddenLoading } from './loading'



export const actFetchOrdersRequest = (status, id) => {
  const statusOrder = status == null || status === undefined ? "chưa duyệt" : status;
  const dataguidi = { statusOrder }
  let token = localStorage.getItem('_auth');
  console.log("trạng thái gửi đi", statusOrder)
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`orders/${id}?status=${status}`, "GET", null, token)
        .then(res => {
          if (res && res.status === 200) {
            console.log('actFetchOrdersRequest res: ', res);
            dispatch(actFetchOrders(res.data.listOrders));
            resolve(res.data);
            setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
          }
          else
            dispatch(actFetchOrders([]));
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
    //Lấy admin token
    // let bodyAdmin = {
    //   username: 'tin',
    //   password: '123456',
    // }
    // const resAdmin = await callApi(`auth/login`, "PUT", bodyAdmin);
    // console.log('resAdmin: ', resAdmin);


    let tokenAdmin = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2Njk5Mzk2ODksImV4cCI6MTY3MDU0NDQ4OX0.zqDesuC7oUMPfP7BxXfVg1-LssHJWcM0lc96YsCkxHM';
    let body = {
      orderStatus: 5,
    }
    let token = localStorage.getItem('_auth');
    const res = await callApi(`orders/cancel/${id}`, "PUT", null, token);
    if (res && res.status === 200) {
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

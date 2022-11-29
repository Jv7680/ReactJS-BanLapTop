
import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import { actShowLoading, actHiddenLoading } from './loading'
import 'react-toastify/dist/ReactToastify.css';
import { is_empty } from '../../utils/validations';

export const actFetchProductsRequest = (page) => {
  const newPage = page === null || page === undefined ? 1 : page;
  return async dispatch => {
    let token = localStorage.getItem('_auth');
    const res = await callApi(`product/all`, 'GET', null, token)
    console.log('actFetchProductsRequest res: ', res);
    if (res && res.status === 200) {
      dispatch(actFetchProducts(res.data.listProducts));
    };
    return res;
  };
};

export const actGetProductOfKeyRequest = (key, page) => {
  const newPage = page === null || page === undefined ? 1 : page
  const newKey = (key === undefined || key === '' || key === null) ? 'laptop' : key

  return async dispatch => {
    const res = await callApi(`product/search?keyword=${newKey}&page=${newPage}`, 'GET')
    if (res && res.status === 200) {
      dispatch(actFetchProducts(res.data.listProduct));
    };
    return res;
  };

}

export const actGetProductOfSupplierRequest = (Supplier, page) => {
  const newPage = page === null || page === undefined ? 1 : page
  const newSupplierId = (Supplier === undefined || Supplier === '' || Supplier === null) ? "laptop" : Supplier

  return async dispatch => {
    const res = await callApi(`product/search?SupplierId=${Supplier}&page=${newPage}`, 'GET')
    if (res && res.status === 200) {
      dispatch(actFetchProducts(res.data.listProduct));
    };
    return res;
  }
}

export const actGetProductOfCatagoryRequest = (catagory, page) => {
  const newPage = page === null || page === undefined ? 1 : page
  const newCatagory = (catagory === undefined || catagory === '' || catagory === null) ? "laptop" : catagory
  return async dispatch => {
    const res = await callApi(`product/search?category=${newCatagory}&page=${newPage}`, 'GET')
    if (res && res.status === 200) {
      dispatch(actFetchProducts(res.data.listProduct));
    };
    return res;
  }
}

export const actFetchProducts = (products) => {
  return {
    type: Types.FETCH_PRODUCTS,
    products
  }
}

export const actAddProductRequest = (data) => {
  console.log("duw lieu request", data)
  return async dispatch => {
    const res = await callApi('product', 'POST', data);
    console.log("res", res)
    if (res && res.status === 200) {
      toast.success('Thêm sản phẩm thành công')
      console.log("dữ liệu trả về", res.data)
      dispatch(actAddProduct(res.data));
    }
  }
}
export const actAddProduct = (data) => {
  return {
    type: Types.ADD_PRODUCT,
    data
  }
}

export const actDeleteProductRequest = (id, page) => {
  let newpage = is_empty(page) ? 1 : page;
  const data = {
    isDelete: "YES"
  }
  return async dispatch => {
    const res = await callApi(`product/delete/${id}?page=${newpage}`, 'PUT', data);
    if (res && res.status == 200) {
      dispatch(actDeleteProduct(res.data.listProduct));
    }

  }
}

export const actActiveProductRequest = (id, page) => {
  let newpage = is_empty(page) ? 1 : page;
  const data = {
    isDelete: "NO"
  }
  return async dispatch => {

    const res = await callApi(`product/delete/${id}?page=${newpage}`, 'PUT', data);
    if (res && res.status == 200) {
      dispatch(actDeleteProduct(res.data.listProduct));

    }

  }
}
export const actDeleteProduct = (Products) => {
  return {
    type: Types.REMOVE_PRODUCT,
    Products
  }
}


export const actEditProductRequest = (id, data) => {
  return async dispatch => {
    let token = localStorage.getItem('_auth');

    console.log('Dữ liệu được gửi cho server cập nhât: ', data);

    const res = await callApi(`admin/product/update`, 'PUT', data, token);
    console.log('actEditProductRequest res: ', res);
    if (res && res.status === 200) {
      toast.success('Sửa sản phẩm thành công')
      //dispatch(actEditProduct(res.data));
      dispatch(actFetchProductsRequest(1));
    }
  }
}

export const actEditProduct = (data) => {
  return {
    type: Types.EDIT_PRODUCT,
    data
  }
}


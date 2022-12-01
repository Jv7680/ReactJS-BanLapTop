import axios from 'axios';
import * as Config from '../constants/Config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import store from '../index'
import { actFetchCart } from '../redux/actions/cart'


const MySwal = withReactContent(Swal)
toast.configure()

export default async function callApi(endpoint, method = 'GET', body, token) {
  try {
    let data;
    if (token !== undefined && token !== null && token !== '') {
      data = await axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        headers: { Authorization: `${token}` },
        data: body
      });
      return data;
    } else {
      data = await axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
      });
      return data;
    }
  }
  catch (err) {
    if (err.response && err.response.data) {
      console.log('err.response.data: ', err.response.data);
      localStorage.setItem('errorCode', err.response.data.message);
      const error = err.response.data.message || err.response.data[0].defaultMessage;
      if (error === 'Giỏ hàng trống') {
        store.dispatch(actFetchCart([]));
      }
      else {
        MySwal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `${error}`
        })
      }

    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi Server',
        text: 'không thể kết nối server!'
      })
    }
  }
}
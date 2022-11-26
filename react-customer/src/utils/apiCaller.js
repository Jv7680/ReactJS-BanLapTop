import axios from 'axios';
import * as Config from '../constants/Config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
      console.log(err.response.data)
      const error = err.response.data.message || err.response.data[0].defaultMessage;
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: `${error}`
      })
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi Server',
        text: 'không thể kết nối server!'
      })
    }
  }
}
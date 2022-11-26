import React, { Component } from 'react'
import callApi from '../../utils/apiCaller';
import { actLoginGoogleRequest } from '../../redux/actions/auth';
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { connect } from 'react-redux'
import { startLoading, doneLoading } from '../../utils/loading'
const MySwal = withReactContent(Swal);

class LoginGoogle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          offset: 0,
          isSuccess: false
        }
      }
    async componentWillMount()
    {
        const {token,customerId,id,provider} = this.props
        console.log(`id cac thu ${provider}`)
        await this.props.loginGoogleRequest(token,customerId,id,provider);
    }
    // async componentDidMount(){
    //     const {orderid,paymentId,PayerID} = this.props
    //     console.log("đây là param sau khi chạy",orderid,paymentId,PayerID)
    //     startLoading();
    //     const resData = await callApi(`payment/paypal/success/${orderid}?paymentId=${paymentId}&PayerID=${PayerID}`, 'GET')
    //     console.log("dữ liệu trả về",resData)
    //     if(resData &&resData.status === 200)
    //     {
    //         this.setState({isSuccess:true})
    //         Swal.fire({
    //             position: 'center',
    //             icon: 'success',
    //             title: 'Thanh toán thành công',
    //             showConfirmButton: false,
    //             timer: 1500
    //           })
    //     }
    //     doneLoading();
    // }

    render() {
        const {isSuccess} = this.state
        const { user } = this.props;
        if (user !== null) {
            return <Redirect to="/"></Redirect>
          }
        return (
            <div>
                <h1>đăng nhập thất bại</h1>
            </div>
        )
    }
    
    
}

const mapStateToProps = (state) => {
    return {
      user: state.auth
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
      loginGoogleRequest: (token,customerId,id,provider) => {
        dispatch(actLoginGoogleRequest(token,customerId,id,provider))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginGoogle)

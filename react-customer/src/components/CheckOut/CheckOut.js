import React, { Component } from "react"
import { connect } from "react-redux";
import callApi from "../../utils/apiCaller";
import { Link, Redirect } from "react-router-dom";
import BillDetail from "./BillDetail";
import YourOrder from "./YourOrder";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { startLoading, doneLoading } from "../../utils/loading";
import { actFetchCartRequest, actClearRequest } from '../../redux/actions/cart';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./style.css";
import { is_empty } from "../../utils/validations";
const MySwal = withReactContent(Swal);

toast.configure();

let token, res, resultOrder;
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCheckout: false,
      login: true,
      shippingAddress: false,
      checkout: false,
      result: false,
      linkReplace: '',
      chooseCheckout: 'COD',
      chooseAddress: -1,
      redirectTo: false
    };
    this.billing = React.createRef();
  }

  componentDidMount() {
    token = localStorage.getItem("_auth");
  }
  toggleCheckout = async (e) => {
    e.preventDefault();
    let id = localStorage.getItem("_id");
    const items = this.props.cartStore
    const addresses = this.props.addresses
    let list = [];
    let count = 0;
    let shippingTotal = 0;
    const { toggleCheckout, shippingAddress,chooseAddress } = this.state;
    res = addresses.find(e=>e.deliveryAddressId == chooseAddress)

    if ( chooseAddress === -1) {
      return toast.error("vui lòng chọn địa chỉ");
    }

    // lấy danh sách cart để gửi đi
    if (items.length > 0) {
      list = items.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity
        }
      })
      count = items.reduce((sum, item) => {
        return (sum += item.quantity * item.priceAfterDiscount);
      }, 0);
    }
    
    if (list) {
      const newOder = {
        address: res.deliveryAddress,
        phoneNumber: res.phoneNumber,
        total: count + shippingTotal,
        list,
        customerId: parseInt(id)
      }
      console.log(newOder)
      resultOrder = newOder;
    }

    this.setState({
      toggleCheckout: !toggleCheckout,
      shippingAddress: !shippingAddress,
    });

  };



  submitOrder = async (state) => {
    let customerId = parseInt(localStorage.getItem("_id"));
    let id = parseInt(localStorage.getItem("_idaccount"));
    const items = this.props.cartStore
    let cartItemList = [];
    let count = 0;
    let resData;
    let shippingTotal = 0;
    const { chooseCheckout } = this.state
    console.log(chooseCheckout);
    if (items.length > 0) {
      cartItemList = items.map((item) => {
        return item.cartId
      })
      count = items.reduce((sum, item) => {
        return (sum += item.quantity * item.priceAfterDiscount);
      }, 0);
    }
    if (cartItemList) {
      const newOder = {
        address: res.deliveryAddress,
        phoneNumber: res.phoneNumber,
        total: count + shippingTotal,
        cartItemList,
        id,
        customerId
      }


      console.log(newOder)
      switch (chooseCheckout) {
        case "VNPAY":
          startLoading();
          resData = await callApi("payment/vnpay", "POST", newOder);
          if (resData && resData.status == 200) {
            this.setState({ linkReplace: resData.data, redirectTo: true })
          }
          doneLoading();
          break;
        case "MOMO":
          startLoading();
          console.log(window.location.origin +"/order")
          resData = await callApi("payment/momo", "POST", newOder);
          console.log(resData)
          if (resData && resData.status == 200) {
            if(is_empty(resData.data.payUrl))
            {
              Swal.fire(
                'Lỗi!',
                `${resData.data.localMessage}`,
                'error'
              )
              this.setState({ linkReplace: `${window.location.origin}/order/status1`, redirectTo: true })
            }
            else{
              this.setState({ linkReplace: resData.data.payUrl, redirectTo: true })
            }
           
          }
          doneLoading();
          break;
        case "PAYPAL":
          startLoading();
          resData = await callApi("payment/paypal", "POST", newOder);
          if (resData && resData.status == 200) {
              this.setState({ linkReplace: resData.data.link, redirectTo: true })
          }
          doneLoading();
          break
        default:
          startLoading();
          resData = await callApi("orders", "POST", newOder);
          if (resData && resData.status == 200) {
            // fetch lại giỏ hàng
            await this.props.reset_cart()
            toast.success("Tạo đơn hàng thành công")
            this.setState({
              checkout: true,
              result: true,
              redirectTo: false

            });
          }
          doneLoading();

      }



    }
  };

  onchangePayment(e) {
    console.log(e.target.value)
    this.setState({ chooseCheckout: e.target.value })
  }
  onChageAddress(e){
    console.log(e.target.value)
    this.setState({ chooseAddress: e.target.value})
  }

  render() {
    const {
      redirectTo,
      toggleCheckout,
      shippingAddress,
      checkout,
      result,
      linkReplace,
      chooseCheckout,
      chooseAddress
    } = this.state;
    const { addresses } = this.props

    if (redirectTo) {
      return window.location.replace(linkReplace)
    }
    return (
      <div className="checkout-area pt-60 pb-30">
        <div className="container">
          <div
            className="row"
            style={{ textAlign: "center", marginTop: -25, paddingBottom: 10 }}
          >
            <div className="col-3"></div>
            <div className="col-6">
              <div className="container">
                <ul className="progressbar">
                  <li className="active">login</li>
                  {shippingAddress ? (
                    <li className="active">Thông tin đơn hàng</li>
                  ) : (
                    <li >Thông tin đơn hàng</li>
                  )}
                  {
                    checkout ? (<li className="active">thanh toán</li>)
                      : <li>thanh toán</li>
                  }
                  {
                    result ? (<li className="active">Xong</li>)
                      : <li>Xong</li>
                  }
                </ul>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
          {
            result
              ? (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="error-wrapper text-center ptb-50 pt-xs-20">
                      <div>
                        <i class="fa-solid fa-cart-circle-check"></i>

                        {/* <img
                          src="https://i.ibb.co/pvDhxPj/checked-ok-yes-icon-1320196391133448530.png"
                          alt="checked"
                          height="70px"
                        /> */}
                        <h1>Cảm ơn.</h1>
                      </div>
                      <div>
                        <h1>Đơn hàng của bạn đặt thành công.</h1>
                      </div>
                      <div>
                        <p>
                          <i>
                            Vui lòng xem email để xem chi tiết.
                          </i>
                          <Link to='/' className="ml-3">Tiếp tục mua hàng</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
              : (
                <div className="row">
                  {
                    toggleCheckout ? (
                      <YourOrder
                        changeToggle={(result) => this.changeToggle(result)}
                        order={resultOrder}
                        submitOrder={() => this.submitOrder()}
                        submitOrderPaypal={() => this.submitOrderPaypal()}
                        chooseCheckout={(e) => this.onchangePayment(e)}
                      ></YourOrder>
                    ) : (
                      <BillDetail
                        ref={this.billing}
                        addresses={addresses} 
                        toggleCheckout = {(e) => this.toggleCheckout(e) }
                        chooseAddress = {(e) => this.onChageAddress(e)}
                        >

                      </BillDetail>
                    )
                  }
                  {/* <div className="col-12" style={{ textAlign: "center" }}>
                    {!toggleCheckout ? (
                      <button
                        onClick={() => this.toggleCheckout()}
                        className="btn btn-primary "
                        style={{ marginTop: -25, marginBottom: 10 }}
                      >
                        Bước tiếp theo
                      </button>
                    ) : null}
                  </div> */}

                </div>
              )
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartStore: state.cart,
    addresses: state.addresses
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    reset_cart: () => {
      dispatch(actClearRequest())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);

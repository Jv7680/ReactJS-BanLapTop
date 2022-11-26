import React, { Component } from "react";
import { connect } from "react-redux";
import { formatNumber } from "../../config/TYPE";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import { config } from "../../config";

class YourOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: "",
      chooseCheckout: this.props.chooseCheckout
    };
  }

  handSubmit = () => {
    console.log("đã vào đây")
    this.props.submitOrder();
  };




  render() {
    const { items, order, chooseCheckout } = this.props;
    const shippingTotal = 0;
    let count = 0;
    if (items.length > 0) {
      count = items.reduce((sum, item) => {
        return (sum += item.quantity * item.priceAfterDiscount);
      }, 0);
    }
    return (
      <div className="col-lg-10 col-12 mb-2" style={{ margin: "auto" }}>
        <div className="your-order">
          <h3>Đơn của bạn</h3>
          <div className="your-order-table table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th className="cart-product-name">Sản phẩm</th>
                  <th className="cart-product-total">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {items && items.length
                  ? items.map((item, index) => {
                    return (
                      <tr className="cart_item" key={index}>
                        <td className="cart-product-name">
                          {item.nameProduct}
                          <strong
                            className="product-quantity"
                            style={{
                              paddingLeft: 10,
                              color: "coral",
                              fontStyle: "italic",
                            }}
                          >
                            x{item.quantity}
                          </strong>
                        </td>
                        <td className="cart-product-total">
                          <span className="amount">
                            {formatNumber(item.quantity * item.priceAfterDiscount)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                  : null}
              </tbody>
              <tfoot>
                <tr className="cart-subtotal">
                  <th>Tổng tiền sản phẩm</th>
                  <td>
                    <span className="amount">
                      {count ? formatNumber(count) : 0}
                    </span>
                  </td>
                </tr>
                <tr className="cart-subtotal">
                  <th>Tiền ship</th>
                  <td>
                    <span className="amount">
                      Miễn phí
                    </span>
                  </td>
                </tr>
                <tr className="order-total">
                  <th>Tiền phải trả</th>
                  <td>
                    <strong>
                      <span className="amount" style={{ color: "red" }}>
                        {count ? formatNumber(count + shippingTotal) : 0}
                      </span>
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <h3>Phương thức thanh toán</h3>
          {/* <div className="col-sm-9" onChange={this.props.chooseCheckout}>

            <input className="i-checks" style={{ display: 'inline-block', paddingRight: 35 }} type="radio" defaultValue="COD" name="payment" /> COD
            <input className="i-checks" style={{ display: 'inline-block', paddingRight: 35 }} type="radio" defaultValue="PAYPAL" name="payment" /> PAYPAL
            <input className="i-checks" style={{ display: 'inline-block', paddingRight: 35 }} type="radio" defaultValue="VNPAY" name="payment" /> VNPAY

          </div> */

          }
          <div className="grid" onChange={this.props.chooseCheckout}>
            <label className="card">
              <input name="plan" className="radio" type="radio" defaultChecked value="COD"/>
              <span className="plan-details">
                <span className="plan-type">Thanh Toán Khi Nhận hàng</span>
               
              </span>
            </label>
            <label className="card">
              <input name="plan" className="radio" type="radio" value="VNPAY"/>
              <span className="plan-details" aria-hidden="true">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZ1qOTApEyWuPkh9iaQPHe8_-RVQeUJbmmfE36UdahHQAzL5omlhE7BBPN5PjiXI7VA&usqp=CAU"></img>
            
              </span>
            </label>
            <label className="card">
              <input name="plan" className="radio" type="radio" value="MOMO"/>
              <span className="plan-details" aria-hidden="true">
                <img src="https://images.viblo.asia/ae87b957-f016-45c0-9c29-34b34a9b3262.png"></img>
              </span>
            </label>
            <label className="card">
              <input name="plan" className="radio" type="radio" value="PAYPAL"/>
              <span className="plan-details" aria-hidden="true">
                <img src="https://file.hstatic.net/1000012850/file/paypal-logo-2015_grande.png"></img>
              </span>
            </label>
          </div>


          <div className="payment-accordion">
            <div
              onClick={this.props.submitOrder}
              className="order-button-payment"
            >
              <input type="submit" value="Thanh toán" />
            </div>
          </div>


          {/* <div className="payment-accordion">
            <div
              onClick=/{this.props.submitOrderPaypal}
              className="order-button-payment"
            >
              <input type="submit" value="Thanh toán Paypal" />
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.cart,
  };
};

export default connect(mapStateToProps, null)(YourOrder);

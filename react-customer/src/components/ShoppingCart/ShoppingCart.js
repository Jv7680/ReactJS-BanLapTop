import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import ShoppingCartItems from './ShoppingCartItems'
import { actFetchCartRequest } from '../../redux/actions/cart';
import { connect } from 'react-redux'
import SumTotal from './SumTotal';
let token;
let id;
class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectYourLogin: false
    }
  }



  componentDidMount() {
    token = localStorage.getItem("_auth");
    id = localStorage.getItem("_id");
    if (!token) {
      this.setState({ redirectYourLogin: true })
    }
    else {
    }
    this.props.fetch_items(id);
  


  }

  showItem(items) {
    let result = null;
    console.log(items)
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <ShoppingCartItems key={index} item={item} ></ShoppingCartItems>
        );
      });
    }
    return result;
  }

  render() {
    const { items } = this.props;
    const { redirectYourLogin } = this.state
    console.log("giở hàng trống", items)
    if (redirectYourLogin) {
      return (
        <Redirect to="/login"></Redirect>
      )
    }
    return (
      <div className="Shopping-cart-area pt-30 pb-30">
        <div className="container">
          {
            items.length > 0 ?
              (
                <div className="row">
                  <div className="col-sm-8 col-xs-12">
                    <form>
                      <div className="table-content table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="li-product-remove">Xóa</th>
                              <th className="li-product-thumbnail">Ảnh</th>
                              <th className="cart-product-name">Tên sản phẩm</th>
                              <th className="li-product-price">Giá</th>
                              <th className="li-product-quantity">Số lượng</th>
                              <th className="li-product-subtotal">Tổng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.showItem(items)
                            }
                          </tbody>
                        </table>
                      </div>
                    </form>
                  </div>
                  <div className="col-sm-4 col-xs-12">
                    <SumTotal></SumTotal>
                  </div>
                </div>
              )
              :
              (
                <div className="row">
                  <div className="col-sm-12 col-xs-12">
                    <img src='https://brabantia.com.vn/images/cart-empty.png' className="rounded mx-auto d-block"></img>
                  </div>
                </div>
              )
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_items: (id) => {
      dispatch(actFetchCartRequest(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)

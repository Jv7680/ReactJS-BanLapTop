import React, { Component } from 'react'
import { formatNumber } from '../../config/TYPE'
import { actRemoveCartRequest, actUpdateCartRequest } from '../../redux/actions/cart';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
toast.configure()

class ShoppingCartItems extends Component {

  upItem = (item) => {
    if (item.cartProductQuantity >= 5) {
      toast.error('Tối đa 5 sản phẩm')
      return
    }
    let newItem = item;
    newItem.cartProductQuantity++;
    this.props.changQuantityItem(newItem);
    // window.location.reload()

  }
  downItem = (item) => {
    if (item.cartProductQuantity <= 1) {
      toast.error('Tối thiểu 1 sản phẩm')
      return
    }
    let newItem = item;
    newItem.cartProductQuantity--;
    this.props.changQuantityItem(newItem);
    // window.location.reload()

  }

  removeItem = (item) => {
    this.props.removeItem(item);
    console.log("sản phẩm xóa", item)
    toast.success('Xóa thành công')
    // window.location.reload()

    // setTimeout(() => {
    //   if (localStorage.getItem('errorCode') === 'Giỏ hàng trống') {
    //     let id = parseInt(localStorage.getItem("_id"));
    //     //this.props.history.push(`/cart`);
    //     // this.setState = {
    //     //   emptyCart: true,
    //     // };
    //     localStorage.setItem('errorCode', '');
    //   }
    // }, 3000);

  }

  render() {
    const { item } = this.props;

    return (
      <tr>
        <td className="li-product-remove">
          <Link to="#"><i style={{ fontSize: 20 }}
            onClick={() => this.removeItem(item)}
            className="far fa-trash-alt" /></Link>
        </td>
        <td className="li-product-thumbnail d-flex justify-content-center">
          <Link to={`/products/${item.product.productId}`} >
            <div className="fix-cart"> <img className="fix-img" src={item.product.image} alt="Li's Product" /></div>
          </Link></td>
        <td className="li-product-name">
          <Link className="text-dark" to={`/products/${item.product.productId}`}>{item.product.productName}</Link></td>
        <td className="product-subtotal">
          {/* <span className="amount">{formatNumber(item.priceAfterDiscount)}</span> */}
          {
            item.product.discount > 0 ?
              (
                <>
                  <span className="amount" style={{ color: 'black', textDecoration: "line-through" }}>{formatNumber(item.product.unitprice)}</span><br />
                  <span className="amount" style={{ color: 'black' }}>{formatNumber(item.product.unitprice * ((100 - item.product.discount) / 100))}</span>
                </>
              )
              :
              (
                <span className="amount" style={{ color: 'black', textDecoration: "none" }}>{formatNumber(item.product.unitprice)}</span>
              )
          }
        </td>
        <td className="quantity">
          <div className="cart-plus-minus">
            <input onChange={() => { }} className="cart-plus-minus-box" value={this.props.item.cartProductQuantity || 0} />
            <div className="dec qtybutton" onClick={() => this.downItem(item)}><i className="fa fa-angle-down" />
            </div>
            <div className="inc qtybutton" onClick={() => this.upItem(item)}><i className="fa fa-angle-up" /></div>
          </div>
        </td>
        {
          item.product.discount > 0 ? (
            <td className="product-subtotal"><span className="amount">{formatNumber(item.product.unitprice * ((100 - item.product.discount) / 100) * item.cartProductQuantity)}</span></td>
          )
            :
            (
              <td className="product-subtotal"><span className="amount">{formatNumber((item.product.unitprice * item.cartProductQuantity))}</span></td>
            )
        }
      </tr>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (item) => {
      dispatch(actRemoveCartRequest(item))
    },
    changQuantityItem: (item) => {
      dispatch(actUpdateCartRequest(item))
    }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(ShoppingCartItems))

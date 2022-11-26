import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { actAddCartRequest } from '../../redux/actions/cart';
import { formatNumber } from '../../config/TYPE'
import { connect } from 'react-redux'
import { actDeleteWishListRequest } from '../../redux/actions/wishlist';
let token;
class ProductWishListItem extends Component {


  handleAddCart = (event, product,wishlistId) => {
    event.preventDefault();
    
    const idCustomer = localStorage.getItem('_id')
    console.log("nè he",product,wishlistId )
    this.props.addCart(idCustomer,product);
    this.props.deleteWishList(wishlistId);
  }

  handleRemoveItem = (wishlistId) => {
    console.log("sản phẩm xóa",wishlistId)
    this.props.deleteWishList(wishlistId);
  }

  render() {
    const { wishlistItem,value } = this.props;
    const product = wishlistItem.product
    console.log("mỗi sản phẩm",wishlistItem)
    return (
      <tr>
        <td className="li-product-remove"><Link  onClick={() => this.handleRemoveItem(wishlistItem.wishlistId,value)}>
          <i style={{ fontSize: 20 }} className="far fa-trash-alt" /></Link></td>
        <td className="li-product-thumbnail d-flex justify-content-center"><a href="/">
          <Link  to={`/products/${product.productId}`} className="fix-cart"> <img className="fix-img" src={product.productImageSet[0].image} alt="Li's Product" /></Link>
        </a></td>
        <td className="li-product-name"><Link className="text-dark" to={`/products/${product.productId}`}> {product.productName} </Link></td>
        <td className="product-subtotal"><span className="amount">{formatNumber(product.priceAfterDiscount)}</span></td>
        <td className="quantity">
          <button  onClick={(event) => this.handleAddCart(event, product,wishlistItem.wishlistId)} className="btn"  style={{ background: '#f68169', color: 'white' }} >Mua hàng</button>
        </td>
      </tr>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (id,product) => {
      dispatch(actAddCartRequest(id,product))
    },
    deleteWishList: (idwishlist) => {
      dispatch(actDeleteWishListRequest(idwishlist))
    },
  }
}

export default connect(null, mapDispatchToProps)(ProductWishListItem)

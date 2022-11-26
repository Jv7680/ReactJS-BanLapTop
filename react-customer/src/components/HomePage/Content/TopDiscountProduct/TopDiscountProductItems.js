import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { actGetProductRequest } from '../../../../redux/actions/products';
import { startLoading, doneLoading } from '../../../../utils/loading'
import { actAddCartRequest } from "../../../../redux/actions/cart"
import {actAddWishListRequest} from '../../../../redux/actions/wishlist'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import BeautyStars from 'beauty-stars';
import './style.css'
toast.configure()
let token,id;
id = parseInt(localStorage.getItem("_id"));
class TopDiscountProductItems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      quantity: 1
    }
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }
  getInfoProduct = (id) => {
    console.log("vào đây để lấy thông tin san phẩm", id)
    this.props.getInfoProduct(id);
  }
  addItemToCart = product => {
    const { quantity} = this.state;
    
    token = localStorage.getItem("_auth");
    id = parseInt(localStorage.getItem("_id"));
    if(!token){
      this.setState({
        redirectYourLogin: true
      }) 
    }
    else {
      this.setState({
        redirectYourLogin: false
      })
      this.props.addCart(id,product, quantity);
    }
    
  };

  addItemToFavorite = (productId) => {
    startLoading()
    if (!id) {
      return toast.error('vui lòng đăng nhập !')
    }
    this.props.addWishList(id,productId);
    doneLoading();
  }

  render() {
    const { product } = this.props;
    const { quantity } = this.state;

    return (


      <div className="single-product-wrap" >
        <div className="fix-img-div-new product-image">
          <Link onClick={(id) => this.getInfoProduct(product.productId)} to={`/products/${product.productId}`}>
            <img className="fix-img" src={product.productImageSet[0].image} alt="Li's Product " />
          </Link>
          <span className="sticker">{product.discount}%</span>
        </div>
        <div className="product_desc">
          <div className="product_desc_info">
            <h4><Link className="product_name text-truncate" onClick={(id) => this.getInfoProduct(product.productId)} to={`/products/${product.productId}`}>{product.productName}</Link></h4>
            <div className="price-box">
              <span className="new-price" style={{ color: 'red' }}>{product.priceAfterDiscount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
              <span className="new-price" style={{ color: 'black', textDecoration: "line-through" }}>{product.unitPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
            </div>
          </div>
          <div className="add-actions">
            <ul className="add-actions-link">
              <li className="add-cart active"><Link to="#" onClick={() => this.addItemToCart(product)} >Thêm vào giỏ</Link></li>
              <li><Link onClick={(id) => this.getInfoProduct(product.productId)} to={`/products/${product.productId}`} title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></Link></li>
              <li><Link  onClick={() => this.addItemToFavorite(product.productId)} className="links-details" title="Yêu thích" ><i className="fa fa-heart-o" /></Link></li>
            </ul>
          </div>
        </div>
      </div >



    )
  }
}

const mapStateToProps = (state) => {
  return {
    getProduct: state.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoProduct: (id) => {
      dispatch(actGetProductRequest(id))
    },
    addCart: (idCustomer,product,quantity) => {
      dispatch(actAddCartRequest(idCustomer,product,quantity));
    },
    addWishList: (id,idProduct) =>{
      dispatch(actAddWishListRequest(id, idProduct));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopDiscountProductItems)

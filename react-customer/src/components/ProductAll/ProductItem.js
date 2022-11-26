import React, { Component } from 'react'

import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import { actGetProductRequest } from '../../redux/actions/products';
import { actAddWishListRequest } from '../../redux/actions/wishlist'
import { actAddCartRequest } from "../../redux/actions/cart";
import { startLoading, doneLoading } from '../../utils/loading'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import BeautyStars from 'beauty-stars';
import './style.css'
toast.configure()
let token, id;
id = parseInt(localStorage.getItem("_id"));
class ProductItem extends Component {

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
    const { quantity } = this.state;
    id = parseInt(localStorage.getItem("_id"));
    token = localStorage.getItem("_auth");
    if (!token) {
      this.setState({
        redirectYourLogin: true
      })
    }
    else {
      this.setState({
        redirectYourLogin: false
      })
      this.props.addCart(id, product, quantity);
    }

  };
  addItemToFavorite = (productId) => {
    startLoading()
    if (!id) {
      return toast.error('vui lòng đăng nhập !')
    }
    this.props.addWishList(id, productId);
    doneLoading();
  }

  render() {
    const { product } = this.props;
    const { quantity, redirectYourLogin } = this.state;
    console.log(product)
    if (redirectYourLogin) {
      return <Redirect to='/login'></Redirect>
    }

    return (
      <div className="col-lg-3 col-md-4 col-sm-6 mt-40">
        {/* single-product-wrap start */}
        <div className="single-product-wrap">
          <div className="fix-img-div product-image">
            <Link onClick={(id) => this.getInfoProduct(product.productId)} to={`/products/${product.productId}`}>
              {/* <img className="fix-img" src={product.productImageSet[0].image} alt="Li's Product " /> */}
              <img className="fix-img" src={product.image} alt="Li's Product " />
            </Link>
            {
              product.discount > 0 && product.isDelete == 'NO' ? (
                <span className="sticker">{product.discount}%</span>
              ) :
                null
            }
          </div>
          <div className="product_desc">
            <div className="product_desc_info">
              <h4><Link className="product_name text-truncate" onClick={(id) => this.getInfoProduct(product.productId)} to={`/products/${product.productId}`}>{product.productName}</Link></h4>
              {
                product.isDelete == 'NO' ?
                  <div className="price-box">
                    <span className="new-price" style={{ color: 'red' }}>{product.priceAfterDiscount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                    {
                      product.discount > 0 ?
                        (
                          <span className="new-price" style={{ color: 'black', textDecoration: "line-through" }}>{product.unitPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                        ) :
                        null
                    }
                  </div>
                  :
                  null
              }

            </div>

            <div className="add-actions">
              <ul className="add-actions-link">
                {
                  product.isDelete == 'NO' ?
                    <div>
                      <li className="add-cart active"><Link to="#" onClick={() => this.addItemToCart(product)} >Thêm vào giỏ</Link></li>
                      <li><Link to={`/products/${product.productId}`} title="chi tiểt" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></Link></li>
                      <li><Link onClick={() => this.addItemToFavorite(product.productId)} className="links-details" to="#" title="yêu thích" ><i className="fa fa-heart-o" /></Link></li>
                    </div>
                    :
                    <h5>sản phẩm ngừng kinh doanh</h5>
                }

              </ul>
            </div>
          </div>
        </div>

        {/*// QUICK VIEW */}

        {/* single-product-wrap end */}
      </div>
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
    addCart: (idCustomer, product, quantity) => {
      dispatch(actAddCartRequest(idCustomer, product, quantity));
    },
    addWishList: (id, idProduct) => {
      dispatch(actAddWishListRequest(id, idProduct));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)

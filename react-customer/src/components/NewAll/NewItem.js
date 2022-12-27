import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import { actGetProductRequest } from '../../redux/actions/products';
import { actGetNewRequest } from '../../redux/actions/news';
import { actAddWishListRequest } from '../../redux/actions/wishlist'
import { actAddCartRequest } from "../../redux/actions/cart";
import { startLoading, doneLoading } from '../../utils/loading'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import BeautyStars from 'beauty-stars';
import './style.css'
import { set } from 'nprogress';
toast.configure()
let token, id;
id = parseInt(localStorage.getItem("_id"));
class NewItem extends Component {

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
  getInfoNew = async (id) => {
    console.log("getInfoNew id", id)
    await this.props.getInfoNew(id);

    //Cần delay để tránh việc vào trang thông tin sản phẩm mà chưa call api xong
    setTimeout(() => {
      console.log('call api xong');
      localStorage.setItem('_idproduct', id);
      this.props.history.push(`/news/${id}`);
    }, 250);

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
    const { newItem } = this.props;
    const { quantity, redirectYourLogin } = this.state;
    console.log('newItem: ', newItem)
    if (redirectYourLogin) {
      return <Redirect to='/login'></Redirect>
    }

    return (
      <div className="col-lg-4 col-md-4 col-sm-6 mt-40">
        {/* single-product-wrap start */}
        <div className="single-product-wrapNew" onClick={(id) => this.getInfoNew(newItem.newsId)}>
          <div className="fix-img-div product-image">
            <Link onClick={(id) => this.getInfoNew(newItem.newsId)} >
              {/* Hình ảnh tin tức */}
              <img className="fix-imgNew"
                src={newItem.imageLink} alt="Li's Product "
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
            </Link>
          </div>

          {/* Tiêu đề tin tức */}
          <div className="product_desc">
            <div className="product_desc_info" >
              <h4 className="product_name" style={{ textDecoration: 'none', padding: '0px 0px 10px 0px' }}>
                {newItem.title}
                <br />
                <span className="product_name" style={{ textDecoration: 'none', float: 'right' }}>
                  Ngày đăng:&#160;
                  {new Date(newItem.created).getDate()}
                  {'/'}
                  {new Date(newItem.created).getMonth() + 1}
                  {'/'}
                  {new Date(newItem.created).getFullYear()}
                </span>
              </h4>

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
    getInfoNew: (id) => {
      dispatch(actGetNewRequest(id))
    },
    addCart: (idCustomer, product, quantity) => {
      dispatch(actAddCartRequest(idCustomer, product, quantity));
    },
    addWishList: (id, idProduct) => {
      dispatch(actAddWishListRequest(id, idProduct));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewItem))

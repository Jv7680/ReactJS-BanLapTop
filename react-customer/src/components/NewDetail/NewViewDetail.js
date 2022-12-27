import React, { Component } from "react";
import { Rating } from 'react-simple-star-rating';
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import store from "../..";
import { actGetNewRequest } from '../../redux/actions/news';
import NewItemInNewDetail from "../NewAll/NewItemInNewDetail";

import { actGetProductRequest, actFetchProductsRequest } from "../../redux/actions/products";
import { actAddCartRequest } from "../../redux/actions/cart";
import callApi from "../../utils/apiCaller";
import BeautyStars from "beauty-stars";
import RatingView from "./RatingView"
import "./style.css";
import { is_empty } from "../../utils/validations";
import Slider from "react-slick";
import { result } from "lodash";
toast.configure();

let token;
let id;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px"
  }
};
class NewViewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectYourLogin: false,
    };
  }

  componentWillMount = async () => {

    await this.props.get_new(this.props.id);
  }

  // componentDidMount = () => {
  //   this.props.get_product(this.props.id);
  // }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { _new, news, user } = this.props;
    console.log('_new state của redux: ', _new);
    const { quantity, redirectYourLogin, cmtContent, cmtRating, ratingState, checkCommented } = this.state;
    if (redirectYourLogin) {
      return <Redirect to="/login"></Redirect>
    }

    //lấy top 3 tin tức mới nhất
    const top6New = news.slice((news.length - 3));
    console.log('top6New: ', top6New);
    return (
      <div className="content-wraper">
        <div className="container">
          {/* Tiêu đề */}
          <div style={{ margin: '50px 0 0 0' }}>
            <h2>{_new.title}</h2>
          </div>
          {/* ngày đăng */}
          <div>
            Ngày đăng:&#160;
            {new Date(_new.created).getDate()}
            {'/'}
            {new Date(_new.created).getMonth() + 1}
            {'/'}
            {new Date(_new.created).getFullYear()}
          </div>


          <div className="row single-product-area">
            <div className="product-details-view-content sp-normal-content pt-60">
              {/* Ảnh tiêu đề */}
              <div style={{ margin: '0 0 15px 0' }}>
                <img className="fix-imgNew"
                  src={_new.imageLink} alt="Li's Product "
                // style={{
                //   display: 'block',
                //   marginLeft: 'auto',
                //   marginRight: 'auto',
                // }}
                />

                {/* nội dung */}
              </div>
              <div className="product-info">
                <span dangerouslySetInnerHTML={{ __html: _new.content }}></span>
              </div>
            </div>

          </div>

          <div className="li-product-tab pt-30" style={{ margin: '0 0 80px 0' }}>
            <ul className="nav li-product-menu">
              <li>
                <a className="active" data-toggle="tab" href="#description">
                  <span>Tin tức gần đây</span>
                </a>
              </li>
            </ul>
            <div className="product-area shop-product-area">
              <div className="row">
                {top6New && top6New.length
                  ? top6New.map((item, index) => {
                    return (
                      <NewItemInNewDetail
                        key={index}
                        newItem={item}
                      >
                      </NewItemInNewDetail>
                    );
                  })
                  : null}
              </div>
            </div>

          </div>

        </div>

      </div >
    );
  }
}
const mapStateToProps = state => {
  return {
    _new: state._new,
    news: state.news,
    user: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_new: productId => {
      dispatch(actGetNewRequest(productId));
    },
    addCart: (idCustomer, product, quantity, token) => {
      dispatch(actAddCartRequest(idCustomer, product, quantity, token));
    }

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(NewViewDetail);

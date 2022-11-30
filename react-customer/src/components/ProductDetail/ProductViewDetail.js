import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { actGetProductRequest } from "../../redux/actions/products";
import { actAddCartRequest } from "../../redux/actions/cart";
import callApi from "../../utils/apiCaller";
import BeautyStars from "beauty-stars";
import RatingView from "./RatingView"
import "./style.css";
import { is_empty } from "../../utils/validations";
import Slider from "react-slick";
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
class ProductViewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      redirectYourLogin: false
    };
  }

  // componentDidMount = async () => {
  //   token = localStorage.getItem("_auth");
  //   const { id } = this.props;
  //   const res = await callApi(`product/${id}`, "GET");
  //   console.log('ressss', res);
  //   // if (res && res.status === 200) {
  //   //   this.props.get_product(id);
  //   // }
  // }

  upItem = (quantity) => {
    if (quantity >= 5) {
      toast.error('Tối đa 5 sản phẩm')
      return
    }
    this.setState({
      quantity: quantity + 1
    })
  }

  downItem = (quantity) => {
    if (quantity <= 1) {
      toast.error('Tối thiểu 1 sản phẩm')
      return
    }
    this.setState({
      quantity: quantity - 1
    })
  }

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  };

  addItemToCart = product => {
    const { quantity } = this.state;

    token = localStorage.getItem("_auth");
    id = parseInt(localStorage.getItem("_id"));
    if (!token) {
      this.setState({
        redirectYourLogin: true
      })
    }
    else {
      this.setState({
        redirectYourLogin: false
      })
      this.props.addCart(id, product, quantity, token);
    }

  };

  render() {
    const settings = {
      customPaging: function (i) {
        return (
          <Link to="#">
            <img style={{ height: 70, width: "auto" }} src={product.productImageList[i].image} alt="not found" />
          </Link>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const { product, user } = this.props;
    console.log('product state của redux: ', product);
    const { quantity, redirectYourLogin } = this.state;
    if (redirectYourLogin) {
      return <Redirect to="/login"></Redirect>
    }
    return (
      <div className="content-wraper">
        <div className="container">
          <div className="row single-product-area">
            <div className="col-lg-5 col-md-6 mt-2">

              <div className="product-details-left">
                <div className="product-details-images slider-navigation-1">
                  {/* <div className="lg-image"> */}
                  <div className="fix-width-slick">
                    <Slider  {...settings}>
                      {/* {product.productImageList && product.productImageList.length
                        ? product.productImageList.map((item, index) => {
                          return (
                            <div key={index} className="fix-img-div-slick">
                              <img className="fix-img-slick" src={item.image} alt="not found" />
                            </div>
                          );
                        })
                        : null} */}
                      <div className="fix-img-div-slick">
                        <img className="fix-img-slick" src={product.image} alt="not found" />
                      </div>
                    </Slider>

                    {/* <img className="fix-img" src={product.productImage} alt="Li's Product " /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="product-details-view-content sp-normal-content pt-60">
                <div className="product-info">
                  <h2>{product.productName}</h2>
                  {
                    product.isDelete == 'YES' ?
                      <h1 className="font-weight-bold">Sản phẩm ngừng kinh doanh</h1>
                      :
                      <div className="price-box pt-20">
                        {/* <span className="new-price new-price-2 mr-30">
                          {product && product.unitprice ? product.priceAfterDiscount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : null}
                        </span> */}
                        {
                          product.discount > 0 ?
                            (
                              <span className="new-price new-price-2" style={{ color: 'black', textDecoration: "line-through" }}>
                                {product && product.unitprice ? product.unitprice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : null}
                              </span>
                            )
                            :
                            (
                              <span className="new-price new-price-2" style={{ color: 'black', textDecoration: "none" }}>
                                {product && product.unitprice ? product.unitprice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : null}
                              </span>
                            )

                        }

                      </div>
                  }


                  <div className="product-desc">
                    <p>
                      <span dangerouslySetInnerHTML={{ __html: product.descriptionProduct }}></span>
                    </p>
                  </div>

                  {
                    product.isDelete == 'YES' ?
                      null
                      :
                      <div className="single-add-to-cart">
                        <form className="cart-quantity">
                          <div className="quantity">
                            <label>Số lượng</label>
                            <div className="cart-plus-minus">
                              <input
                                onChange={() => { }}
                                className="cart-plus-minus-box"
                                value={quantity}
                                type="text"
                              />
                              <div onClick={() => this.downItem(quantity)} className="dec qtybutton">
                                <i className="fa fa-angle-down" />
                              </div>
                              <div onClick={() => this.upItem(quantity)} className="inc qtybutton">
                                <i className="fa fa-angle-up" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <Link
                              onClick={() => this.addItemToCart(product)}
                              to="#"
                              className="add-to-cart button-hover-addcart button"
                            >
                              Thêm vào giỏ
                              <i class="fa fa-shopping-cart"></i>
                            </Link>
                          </div>
                        </form>
                      </div>
                  }

                </div>
              </div>
            </div>
          </div>
          <div className="li-product-tab pt-30">
            <ul className="nav li-product-menu">
              <li>
                <a className="active" data-toggle="tab" href="#description">
                  <span>Thông tin sản phẩm</span>
                </a>
              </li>
            </ul>

          </div>


          <div className="tab-content">
            <div
              id="description"
              className="tab-pane active show"
              role="tabpanel"
            >
              <div className="product-description">
                <span dangerouslySetInnerHTML={{ __html: product.description }}></span>
                {console.log('product.reviewsResponses: ', product)}
                <RatingView rating={product.reviewsResponses.rating} listReviews={product.reviewsResponses.listReviews}></RatingView>
                {
                  product.reviewsResponses.listReviews ? (

                    product.reviewsResponses.listReviews.length > 0 ?
                      (
                        <div className="comment-list">
                          <h5 className="text-muted mt-40">
                            <span className="badge badge-success">{product.reviewsResponses.listReviews.length}</span>{" "}
                            Comment
                          </h5>
                          {
                            product.reviewsResponses.listReviews.map((cmt, index) => {
                              return (
                                <div key={index} class="comment-item media border p-3">
                                  <div className="media-body">
                                    <h5>
                                      <small>
                                        {cmt.customerName}
                                      </small>
                                      <div className="mt-10">
                                        <BeautyStars
                                          size={10}
                                          activeColor={"#ed8a19"}
                                          inactiveColor={"#c1c1c1"}
                                          value={cmt.rating}
                                        />
                                      </div>
                                    </h5>
                                    <p> {cmt.comments}</p>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      ) : (

                        <div className="comment-list">
                          <h5 className="text-muted mt-40">
                            <span className="badge badge-success">Chưa Có Comment</span>
                          </h5>
                        </div>
                      )
                  ) :
                    (
                      <h1>không có danh sách đánh giá sản phẩm</h1>
                    )
                }

              </div>
            </div>
          </div>


        </div>

      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_product: productId => {
      dispatch(actGetProductRequest(productId));
    },
    addCart: (idCustomer, product, quantity, token) => {
      dispatch(actAddCartRequest(idCustomer, product, quantity, token));
    }

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductViewDetail);

import React, { Component } from "react";
import { Rating } from 'react-simple-star-rating';
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import store from "../..";
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
class ProductViewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      redirectYourLogin: false,
      cmtContent: '',
      cmtRating: 1,
      ratingState: '',
      checkCommented: false,
    };
  }

  componentWillMount = async () => {

    await this.props.get_product(this.props.id);
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

  handleOnclickRating = (startRating) => {
    //1 sao
    if (startRating === 20) {
      this.setState({
        cmtRating: 1,
      });
    }
    //2 sao
    else if (startRating === 40) {
      this.setState({
        cmtRating: 2,
      });
    }
    //3 sao
    else if (startRating === 60) {
      this.setState({
        cmtRating: 3,
      });
    }
    //4 sao
    else if (startRating === 80) {
      this.setState({
        cmtRating: 4,
      });
    }
    //5 sao
    else if (startRating === 100) {
      this.setState({
        cmtRating: 5,
      });
    }

    setTimeout(() => {
      console.log('cmtRating:', this.state.cmtRating);
    }, 1000);
  }

  renderMyCMT = () => {
    let { product } = this.props;
    let idAccount = localStorage.getItem('_idaccount');
    let listReviews = product.reviewsResponses.listReviews;

    for (let i = 0; i < product.reviewsResponses.listReviews.length; i++) {
      if (listReviews[i].accountId === parseInt(idAccount)) {
        //tài khoản này đã comment
        return (
          <div class="comment-item media border p-3">
            <div className="media-body">
              <h5>
                <span style={{ fontSize: "14px", fontStyle: "italic" }}>
                  {listReviews[i].username}&nbsp;(Bạn)
                </span>
                <span style={{ fontSize: "14px", fontStyle: "italic", float: "right" }}>
                  {listReviews[i].reviewsDate}&nbsp;
                </span>
                <div className="mt-10">
                  <Rating
                    initialValue={listReviews[i].rating}
                    readonly={true}
                    size={18}
                  />
                </div>
              </h5>
              <p> {listReviews[i].contents}</p>
            </div>
          </div>
        )
      }
    }

    return null;
  }

  handleSubmitCMT = (event) => {
    let { cmtContent, cmtRating } = this.state;
    let idOrder = localStorage.getItem('_orderId');
    let idAccount = localStorage.getItem('_idaccount');
    let idProduct = localStorage.getItem('_idproduct');

    let token = localStorage.getItem('_auth');

    let body = {
      orderId: parseInt(idOrder),
      accountId: parseInt(idAccount),
      productId: parseInt(idProduct),
      contents: cmtContent,
      rate: cmtRating,
    }
    //gọi api
    let res = callApi('reviews', 'POST', body, token)
      .then(result => {
        toast.success('Đánh giá thành công.');
        console.log('handleSubmitCMT result', result);

        //cập nhật lại sản phẩm hiện tại
        store.dispatch(actGetProductRequest(idProduct));
      });

    // setTimeout(() => {
    //   //kiểm tra tài khoản này đã từng comment chưa
    //   if (this.checkCommented()) {
    //     let { product } = this.props;
    //     let idAccount = localStorage.getItem('_idaccount');
    //     let listReviews = product.reviewsResponses.listReviews;

    //     for (let i = 0; i < product.reviewsResponses.listReviews.length; i++) {
    //       if (listReviews[i].accountId === parseInt(idAccount)) {
    //         //tài khoản này đã comment
    //         this.setState({
    //           cmtContent: listReviews[i].contents,
    //           cmtRating: listReviews[i].rating,
    //           checkCommented: true,
    //         });
    //       }
    //     }
    //   }
    // }, 3000);
  }

  checkCommented = () => {
    let { product } = this.props;
    let idAccount = localStorage.getItem('_idaccount');
    let listReviews = product.reviewsResponses.listReviews;

    for (let i = 0; i < product.reviewsResponses.listReviews.length; i++) {
      if (listReviews[i].accountId === parseInt(idAccount)) {
        //tài khoản này đã comment
        return true;
      }
    }

    //tài khoản này chưa comment
    return false;
  }

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
    const { quantity, redirectYourLogin, cmtContent, cmtRating, ratingState, checkCommented } = this.state;
    if (redirectYourLogin) {
      return <Redirect to="/login"></Redirect>
    }
    const idAccount = parseInt(localStorage.getItem('_idaccount'));
    return (
      <div className="content-wraper">
        <div className="container">
          <div className="row single-product-area">
            <div className="col-lg-5 col-md-6 mt-2">

              <div className="product-details-left">
                <div className="product-details-images slider-navigation-1">
                  {/* <div className="lg-image"> */}
                  <div className="fix-width-slick">
                    {/* <Slider  {...settings}>
                      {product.productImageList && product.productImageList.length
                        ? product.productImageList.map((item, index) => {
                          return (
                            <div key={index} className="fix-img-div-slick">
                              <img className="fix-img-slick" src={item.image} alt="not found" />
                            </div>
                          );
                        })
                        : null}
                      <div className="fix-img-div-slick">
                        <img className="fix-img-slick" src={product.image} alt="not found" />
                      </div>
                    </Slider> */}

                    {/* <img className="fix-img" src={product.productImage} alt="Li's Product " /> */}
                    <div className="fix-img-div-slick">
                      <br /><br />
                      <img className="fix-img-slick" src={product.image} alt="not found" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="product-details-view-content sp-normal-content pt-60">
                <div className="product-info">
                  <h2>{product.productName}</h2>
                  {/* Xử lý ngừng kinh doanh, hết hàng, và có discount */}
                  {
                    product.isDeleted === 'yes' ?
                      (
                        <>
                          <h3>Ngừng Kinh Doanh! </h3>
                          <h6>Chân thành xin lỗi quý khách, chúng tôi đã ngừng kinh doanh sản phẩm này.</h6>
                        </>
                      )
                      :
                      (
                        product.quantity === 0 ?
                          (
                            <>
                              <h3>Tạm Hết Hàng! </h3>
                              <h6>Chân thành xin lỗi quý khách, chúng tôi sẽ mong chóng nhập hàng để đáp ứng nhu cầu mua sắm của bạn.</h6>
                            </>
                          )
                          :
                          (
                            <div className="price-box pt-20">
                              {
                                product.discount > 0 ?
                                  (
                                    <>
                                      <p className="new-price new-price-2" style={{ color: 'black', textDecoration: "line-through" }}>
                                        {product.unitprice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}  <span>&emsp;-{product.discount}%</span>
                                      </p>
                                      <p className="new-price new-price-2" style={{ color: 'black', textDecoration: "none" }}>
                                        Chỉ còn: {(product.unitprice * ((100 - product.discount) / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                      </p>
                                    </>
                                  )
                                  :
                                  (
                                    <>
                                      <span className="new-price new-price-2" style={{ color: 'black', textDecoration: "none" }}>
                                        {product && product.unitprice ? product.unitprice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : null}
                                      </span>
                                    </>
                                  )
                              }
                            </div>
                          )
                      )
                  }

                  {/* Mốt có thể đặt mô tả nhanh ở đây */}
                  <div className="product-desc">
                    <p>
                      <span dangerouslySetInnerHTML={{ __html: product.descriptionProduct }}></span>
                    </p>
                  </div>

                  {
                    product.quantity === 0 || product.isDelete ?
                      (
                        null
                      )
                      :
                      <div className="single-add-to-cart">
                        <form className="cart-quantity">
                          <div className="quantity">
                            <label>Số lượng&emsp;&emsp;&emsp;<span style={{ fontSize: "15px", fontStyle: "italic", color: "green" }}>(Tồn kho:&nbsp;{product.quantity})</span></label>
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

                {/* đánh giá tổng quát của sản phẩm */}
                <RatingView rating={product.reviewsResponses.rating} listReviews={product.reviewsResponses.listReviews}></RatingView>

                {/* thêm comment của bản thân */}
                {
                  this.checkCommented() ?
                    (
                      <div className="cmtedArea">
                        <br />
                        <span
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          Bạn đã đánh giá sản phẩm này.
                        </span>
                        <br />
                        {/* <span
                          style={{ marginLeft: "20px" }}
                        >
                          Đánh giá:&emsp;
                          <Rating
                            initialValue={5}
                            readonly={true}
                            size={18}
                          />
                          {null}
                        </span>
                        <textarea placeholder="Nhập comment của bạn"
                          rows="5"
                          name="cmtContent"
                          value={this.state.cmtContent}
                          onChange={this.handleChange}
                          style={{ resize: "none", marginLeft: "20px" }}
                        >
                        </textarea>
                        <br /> */}
                      </div>
                    )
                    :
                    (
                      <div
                        className="cmtArea"
                      // style={{
                      //   borderTop: "1px solid #3596ff",
                      //   borderBottom: "1px solid #3596ff",
                      //   borderLeft: "1px solid #3596ff",
                      // }}
                      >
                        <br />
                        <span
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          Bạn chưa đánh giá sản phẩm này.
                        </span>
                        <br />
                        <span
                          style={{ marginLeft: "20px" }}
                        >
                          Đánh giá:&emsp;
                          <Rating
                            initialValue={1}
                            readonly={false}
                            size={18}
                            onClick={(startRating) => { this.handleOnclickRating(startRating) }}
                          />
                          {null}
                        </span>
                        <textarea placeholder="Nhập comment của bạn"
                          rows="5"
                          name="cmtContent"
                          value={this.state.cmtContent}
                          onChange={this.handleChange}
                          style={{ resize: "none", marginLeft: "20px" }}
                        >
                        </textarea>
                        <br />
                        <button
                          className="btn btn-primary"
                          onClick={this.handleSubmitCMT}
                          style={{ marginLeft: "20px" }}
                        >
                          Gửi Bình Luận
                        </button>
                        <br />
                        <br />
                      </div>
                    )
                }



                {/* danh sách comment */}
                {
                  product.reviewsResponses.listReviews ?
                    (
                      product.reviewsResponses.listReviews.length > 0 ?
                        (
                          <div className="comment-list">
                            <h5 className="text-muted mt-40">
                              <span className="badge badge-success">{product.reviewsResponses.listReviews.length}</span>
                              {" "}Comment
                            </h5>
                            {/* Render ra comment của bản thân trước */}
                            {
                              this.renderMyCMT()
                            }
                            {/* Render ra comment của những người còn lại */}
                            {
                              product.reviewsResponses.listReviews.map((cmt, index) => {
                                if (cmt.accountId === idAccount) {
                                  return null;
                                }
                                return (
                                  <div key={index} class="comment-item media border p-3">
                                    <div className="media-body">
                                      <h5>
                                        <span style={{ fontSize: "14px" }}>
                                          {cmt.username}
                                        </span>
                                        <span style={{ fontSize: "14px", fontStyle: "italic", float: "right" }}>
                                          {cmt.reviewsDate}&nbsp;
                                        </span>
                                        <div className="mt-10">
                                          <Rating
                                            initialValue={cmt.rating}
                                            readonly={true}
                                            size={18}
                                          />
                                        </div>
                                      </h5>
                                      <p> {cmt.contents}</p>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                        :
                        (
                          <div className="comment-list">
                            <h5 className="text-muted mt-40">
                              <span className="badge badge-success">Chưa Có Comment</span>
                            </h5>
                          </div>
                        )
                    )
                    :
                    (
                      <h1>không có danh sách đánh giá sản phẩm</h1>
                    )
                }

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
    product: state.product,
    user: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_product: async (productId) => {
      await dispatch(actGetProductRequest(productId));
    },
    addCart: (idCustomer, product, quantity, token) => {
      dispatch(actAddCartRequest(idCustomer, product, quantity, token));
    }

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductViewDetail);

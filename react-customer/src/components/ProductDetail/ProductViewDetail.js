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
        //t??i kho???n n??y ???? comment
        return (
          <div class="comment-item media border p-3">
            <div className="media-body">
              <h5>
                <span style={{ fontSize: "14px", fontStyle: "italic" }}>
                  {listReviews[i].username}&nbsp;(B???n)
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
    //g???i api
    let res = callApi('reviews', 'POST', body, token)
      .then(result => {
        toast.success('????nh gi?? th??nh c??ng.');
        console.log('handleSubmitCMT result', result);

        //c???p nh???t l???i s???n ph???m hi???n t???i
        store.dispatch(actGetProductRequest(idProduct));
      });

    // setTimeout(() => {
    //   //ki???m tra t??i kho???n n??y ???? t???ng comment ch??a
    //   if (this.checkCommented()) {
    //     let { product } = this.props;
    //     let idAccount = localStorage.getItem('_idaccount');
    //     let listReviews = product.reviewsResponses.listReviews;

    //     for (let i = 0; i < product.reviewsResponses.listReviews.length; i++) {
    //       if (listReviews[i].accountId === parseInt(idAccount)) {
    //         //t??i kho???n n??y ???? comment
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
        //t??i kho???n n??y ???? comment
        return true;
      }
    }

    //t??i kho???n n??y ch??a comment
    return false;
  }

  upItem = (quantity) => {
    if (quantity >= 5) {
      toast.error('T???i ??a 5 s???n ph???m')
      return
    }
    this.setState({
      quantity: quantity + 1
    })
  }

  downItem = (quantity) => {
    if (quantity <= 1) {
      toast.error('T???i thi???u 1 s???n ph???m')
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
    console.log('product state c???a redux: ', product);
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
                  {/* X??? l?? ng???ng kinh doanh, h???t h??ng, v?? c?? discount */}
                  {
                    product.isDeleted === 'yes' ?
                      (
                        <>
                          <h3>Ng???ng Kinh Doanh! </h3>
                          <h6>Ch??n th??nh xin l???i qu?? kh??ch, ch??ng t??i ???? ng???ng kinh doanh s???n ph???m n??y.</h6>
                        </>
                      )
                      :
                      (
                        product.quantity === 0 ?
                          (
                            <>
                              <h3>T???m H???t H??ng! </h3>
                              <h6>Ch??n th??nh xin l???i qu?? kh??ch, ch??ng t??i s??? mong ch??ng nh???p h??ng ????? ????p ???ng nhu c???u mua s???m c???a b???n.</h6>
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
                                        Ch??? c??n: {(product.unitprice * ((100 - product.discount) / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
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

                  {/* M???t c?? th??? ?????t m?? t??? nhanh ??? ????y */}
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
                            <label>S??? l?????ng&emsp;&emsp;&emsp;<span style={{ fontSize: "15px", fontStyle: "italic", color: "green" }}>(T???n kho:&nbsp;{product.quantity})</span></label>
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
                              Th??m v??o gi???
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
                  <span>Th??ng tin s???n ph???m</span>
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

                {/* ????nh gi?? t???ng qu??t c???a s???n ph???m */}
                <RatingView rating={product.reviewsResponses.rating} listReviews={product.reviewsResponses.listReviews}></RatingView>

                {/* th??m comment c???a b???n th??n */}
                {
                  this.checkCommented() ?
                    (
                      <div className="cmtedArea">
                        <br />
                        <span
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          B???n ???? ????nh gi?? s???n ph???m n??y.
                        </span>
                        <br />
                        {/* <span
                          style={{ marginLeft: "20px" }}
                        >
                          ????nh gi??:&emsp;
                          <Rating
                            initialValue={5}
                            readonly={true}
                            size={18}
                          />
                          {null}
                        </span>
                        <textarea placeholder="Nh???p comment c???a b???n"
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
                          B???n ch??a ????nh gi?? s???n ph???m n??y.
                        </span>
                        <br />
                        <span
                          style={{ marginLeft: "20px" }}
                        >
                          ????nh gi??:&emsp;
                          <Rating
                            initialValue={1}
                            readonly={false}
                            size={18}
                            onClick={(startRating) => { this.handleOnclickRating(startRating) }}
                          />
                          {null}
                        </span>
                        <textarea placeholder="Nh???p comment c???a b???n"
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
                          G???i B??nh Lu???n
                        </button>
                        <br />
                        <br />
                      </div>
                    )
                }



                {/* danh s??ch comment */}
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
                            {/* Render ra comment c???a b???n th??n tr?????c */}
                            {
                              this.renderMyCMT()
                            }
                            {/* Render ra comment c???a nh???ng ng?????i c??n l???i */}
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
                              <span className="badge badge-success">Ch??a C?? Comment</span>
                            </h5>
                          </div>
                        )
                    )
                    :
                    (
                      <h1>kh??ng c?? danh s??ch ????nh gi?? s???n ph???m</h1>
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

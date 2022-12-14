import React, { Component } from 'react'
import TopDiscountProductItems from './TopDiscountProductItems'
import { connect } from 'react-redux'
import { actFetchProductsDiscountRequest } from '../../../../redux/actions/products';
import Slider from "react-slick";
import './style.css'

class TopDiscountProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
  }

  componentDidMount() {
    const { page } = this.state;
    this.props.fetch_products_new(page);
  }

  render() {
    const { products } = this.props;

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <section className="product-area li-trending-product pt-60" style={{ height: "450px" }}>
        <div className="container">
          <div className="row">
            {/* Begin Li's Tab Menu Area */}
            <div className="col-lg-12">
              <div className="li-product-tab li-trending-product-tab">
                <h2>
                  <span>Top sản phẩm giảm giá</span>
                </h2>
                <ul className="nav li-product-menu li-trending-product-menu">
                  {/* <li><a className="active" data-toggle="tab" href="#home1"><span>Sanai</span></a></li>
                  <li><a data-toggle="tab" href="#home2"><span>Camera Accessories</span></a></li>
                  <li><a data-toggle="tab" href="#home3"><span>XailStation</span></a></li> */}
                </ul>
              </div>
              {/* Begin Li's Tab Menu Content Area */}
              <div className="tab-content li-tab-content li-trending-product-content">
                <div id="home1" className="tab-pane show fade in active">
                  {/* <div className="row"> */}
                  <Slider {...settings}>
                    {products && products.length ? products.map((product, index) => {
                      return (
                        <div key={index} className="col-sm-9 fix-ml pt-3">
                          <TopDiscountProductItems product={product} ></TopDiscountProductItems>
                        </div>
                      )
                    }) : null
                    }
                  </Slider>
                  {/* </div> */}
                </div>
              </div>
              {/* Tab Menu Content Area End Here */}
            </div>
            {/* Tab Menu Area End Here */}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsTopDiscount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products_new: (page) => {
      dispatch(actFetchProductsDiscountRequest(page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopDiscountProduct)

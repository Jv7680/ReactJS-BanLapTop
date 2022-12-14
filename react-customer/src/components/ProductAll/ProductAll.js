import React, { Component } from "react";
import ProductItem from "./ProductItem";
import { connect } from "react-redux";
import { actFetchProductsRequest } from "../../redux/actions/products";
import Paginator from 'react-js-paginator';

class ProductAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.fetch_reload_data();
  }

  fetch_reload_data() {
    this.props.fetch_products().then(res => {
      this.setState({
        total: res.totalPage
      });
    }).catch(err => {
      console.log(err);
    })
  }

  pageChange(content) {
    const page = content;
    this.props.fetch_products(page);
    this.setState({
      currentPage: content
    })
    window.scrollTo(0, 0);
  }


  render() {
    let { products } = this.props;
    const { total } = this.state;

    return (
      <div className="content-wraper pt-60 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Begin Li's Banner Area */}
              <div className="single-banner shop-page-banner">
                <a href="/">
                  <img
                    src={process.env.PUBLIC_URL + '/images/bannerproductpage.png'}
                    alt="Li's Static Banner"
                  />
                </a>
              </div>
              {/* Li's Banner Area End Here *presentation/}
              {/* shop-top-bar start */}

              {/* shop-top-bar end */}
              {/* shop-products-wrapper start */}
              <div className="shop-products-wrapper">
                <div className="tab-content">
                  <div
                    id="grid-view"
                    className="tab-pane fade active show"
                    role="tabpanel"
                  >
                    <div className="product-area shop-product-area">
                      <div className="row">
                        {products && products.length
                          ? products.map((item, index) => {
                            return (
                              <ProductItem
                                key={index}
                                product={item}
                              ></ProductItem>
                            );
                          })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paginatoin-area">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <p>Xem t??? 1-12 s???n ph???m</p>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <ul className="pagination-box">
                        <Paginator
                          pageSize={1}
                          totalElements={total}
                          onPageChangeCallback={(e) => { this.pageChange(e) }}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* shop-products-wrapper end */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_products: (page) => {
      return dispatch(actFetchProductsRequest(page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAll);

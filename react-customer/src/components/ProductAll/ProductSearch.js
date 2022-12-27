import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actGetProductOfKeyRequest } from '../../redux/actions/products';
import Paginator from 'react-js-paginator';
import ProductItem from "./../ProductAll/ProductItem";
import { constant } from 'lodash';

let categoryId;
class ShopCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      total: 0
    };
  }
  componentDidMount() {
    const { totalPage } = this.props.search
    this.setState({ total: totalPage })
  }

  pageChange(content) {
    const page = content;
    const { key } = this.props.search
    console.log("khóa tìm kiếm chage", key)
    this.props.fetch_products(key, page);
    this.setState({
      currentPage: content
    })
    window.scrollTo(0, 0);
  }

  render() {
    let { products, search } = this.props;
    const { total } = this.state;
    console.log("sản phẩm search và trang", products, search)
    return (
      <div className="content-wraper pt-60 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Begin Li's Banner Area */}
              <div className="single-banner shop-page-banner">
                <a href="/">
                  <img
                    src="http://baominhcomputer.com/wp-content/uploads/2021/12/home_collection_2_image-1.jpg.webp"
                    alt="Li's Static Banner"
                    style={{ height: "300px" }}
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
                      {/* <p>Showing 1-12 items</p> */}
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <ul className="pagination-box">
                        <Paginator
                          pageSize={1}
                          totalElements={search.totalPage}
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
const mapStateToProps = (state) => {
  return {
    products: state.products,
    search: state.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products: (key, page) => {
      return dispatch(actGetProductOfKeyRequest(key, page));
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory)


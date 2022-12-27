import React, { Component } from "react";
import NewItem from "./NewItem";
import { connect } from "react-redux";
import { actFetchProductsRequest } from "../../redux/actions/products";
import { actFetchNewsRequest } from "../../redux/actions/news";
import Paginator from 'react-js-paginator';

class NewAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currentPage: 1
    };
  }

  componentWillMount = async () => {
    await this.fetch_reload_data();
  }

  fetch_reload_data() {
    this.props.fetch_news().then(res => {
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
    let { news } = this.props;
    const { total } = this.state;

    return (
      <div className="content-wraper pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Begin Li's Banner Area */}
              {/* <div className="single-banner shop-page-banner">
                <a href="/">
                  <img
                    src="https://i.ibb.co/rfh0sf4/2.jpg"
                    alt="Li's Static Banner"
                  />
                </a>
              </div> */}
              {/* Li's Banner Area End Here *presentation/}

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
                        {news && news.length
                          ? news.map((item, index) => {
                            return (
                              <NewItem
                                key={index}
                                newItem={item}
                              ></NewItem>
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
    news: state.news
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_news: (page) => {
      return dispatch(actFetchNewsRequest(page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAll);

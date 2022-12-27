import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import { connect } from 'react-redux'
import { actFetchCartRequest } from '../../redux/actions/cart';
import { startLoading, doneLoading } from '../../utils/loading'
import { actGetProductOfKeyRequest } from '../../redux/actions/products'
import { actFetchWishListRequest } from '../../redux/actions/wishlist'
import { withRouter } from 'react-router-dom';



let token, id;
class HeaderMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: ''
    }
  }
  componentDidMount() {
    token = localStorage.getItem("_auth");
    id = localStorage.getItem("_id");
    if (token) {
      this.props.fetch_items(id);

      //tạm bỏ vì chưa có api
      //this.props.fetch_wishlist(id);
    }

  }


  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }
  handleClick = async () => {
    const { textSearch } = this.state;
    if (textSearch === '' || textSearch === null) {
      //this.props.history.push(`/`);
      return toast.error('Vui lòng nhập sản phẩm cần tìm ...');
    }
    else {
      //startLoading();
      let res = await this.props.searchProduct(textSearch);
      //console.log('searchProduct res: ', res);
      //doneLoading();
      this.props.history.push(`/search/${textSearch}`);
      // this.setState({
      //   textSearch: ''
      // })

    }

  }

  render() {
    const { textSearch } = this.state;
    const { countCart, countWishList } = this.props;
    let count = 0;
    let count2 = 0;
    if (countCart.length > 0) {
      countCart.forEach(item => {
        count += item.cartProductQuantity
      });
    }
    console.log("yêu thích", countWishList)
    return (
      <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
        <div className="container">
          <div className="row">
            {/* Begin Header Logo Area */}
            <div className="col-lg-3">
              <div className="logo pb-sm-30 pb-xs-30">
                <Link to="/">
                  <img src={process.env.PUBLIC_URL + '/images/logo/logoPTCustomer.png'}
                    style={{
                      width: '180px',
                      height: '50px',
                      borderRadius: '5px',
                      boxShadow: 'inset 0 -3em 3em rgba(0,0,0,0.1),0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)'
                    }}
                    alt="" />
                </Link>
              </div>
            </div>
            {/* Header Logo Area End Here */}
            {/* Begin Header Middle Right Area */}
            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
              {/* Begin Header Middle Searchbox Area */}
              <form className="hm-searchbox" >
                <input
                  name="textSearch"
                  value={textSearch}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Tìm kiếm sản phẩm ..." />
                {/* <button className="li-btn" type="submit"></button> */}
                <Link
                  onClick={this.handleClick}
                  to={`#`}>
                  <button className="li-btn" type="button"><i className="fa fa-search" /></button>
                </Link>
              </form>
              {/* Header Middle Searchbox Area End Here */}
              {/* Begin Header Middle Right Area */}
              <div className="header-middle-right">
                <ul className="hm-menu">

                  {/* Begin Header Middle Wishlist Area */}
                  {/* <li className="hm-wishlist">
                    <Link to="/wishlist">
                      <span className="cart-item-count wishlist-item-count"> {countWishList.length}</span>
                      <i className="fa fa-heart-o" />
                    </Link>
                  </li> */}

                  {/* Header Middle Wishlist Area End Here */}
                  {/* Begin Header Mini Cart Area */}
                  <li className="hm-minicart">
                    <Link to="/cart">
                      <div className="hm-minicart-trigger">
                        <span
                          className="item-icon fa-cart-arrow-down"
                          style={{ margin: "auto auto" }}
                        >
                        </span>
                        {/* <span className="item-text">
                          <span className="cart-item-count">{count}</span>
                        </span> */}
                      </div>
                    </Link>
                    <span />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    countCart: state.cart,
    countWishList: state.wishlist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (key, page) => {
      dispatch(actGetProductOfKeyRequest(key, page))
    },
    fetch_items: (id) => {
      dispatch(actFetchCartRequest(id))
    },
    fetch_wishlist: (id) => {
      dispatch(actFetchWishListRequest(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderMiddle))

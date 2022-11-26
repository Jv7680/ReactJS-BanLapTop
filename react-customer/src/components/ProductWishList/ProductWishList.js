import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductWishListItem from './ProductWishListItem';
import{actFetchWishListRequest} from '../../redux/actions/wishlist'
import './style.css'
class ProductWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProduct: false
    }
  }
  async componentWillMount(){
    const id = localStorage.getItem('_id');
    this.props.fetch_wishlist(id);
  }


  render() {
    const { wishlist } = this.props;
    return (
      <div className="Shopping-cart-area pt-30 pb-30">
        <div className="container">
          {
            wishlist && wishlist.length > 0 ? 
            <div className="row">
            <div className="col-sm-12 col-xs-12">
              <form>
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="li-product-remove">Xóa</th>
                        <th className="li-product-thumbnail">Ảnh</th>
                        <th className="cart-product-name">Tên sản phẩm</th>
                        <th className="li-product-price">Giá</th>
                        <th className="li-product-subtotal">Mua</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist && wishlist.length > 0? wishlist.map((item, index) => {
                        return (
                          <ProductWishListItem key={index} value={index} wishlistItem={item}></ProductWishListItem>
                        )
                      }) : 
                      (
                       null
                      )}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
            :
            (
              <div className="row">
                <div className="col-sm-12 col-xs-12">
                  <img src='https://brabantia.com.vn/images/cart-empty.png' className="rounded mx-auto d-block"></img>
                </div>
              </div>
            )
          }
         
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_wishlist: (id) =>{
      dispatch(actFetchWishListRequest(id))
    }

  }


}


export default connect(mapStateToProps, mapDispatchToProps)(ProductWishList)

import React, { Component } from 'react'
import ProductWishList from '../components/ProductWishList/ProductWishList'
import LinkHere from '../components/LinkHere/LinkHere'
export default class ProductWishListPage extends Component {
  render() {

    return (
      <div>
        <LinkHere url='/ Yêu thích'></LinkHere>
        <ProductWishList></ProductWishList>
      </div>
    )
  }
}

import React, { Component } from 'react'
import ProductViewDetail from '../components/ProductDetail/ProductViewDetail'
import LinkHere from '../components/LinkHere/LinkHere'

export default class ProductDetailPage extends Component {
  render() {
    const url = this.props.match.match.url;
    const {id} = this.props.match.match.params
    window.scrollTo(0, 0);
    return (
      <div>
        <LinkHere url='/ Chi tiết sản phẩm'></LinkHere>
        <ProductViewDetail id={id}></ProductViewDetail>
      </div>
    )
  }
}

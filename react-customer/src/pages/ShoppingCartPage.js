import React, { Component } from 'react'
import ShoppingCart from '../components/ShoppingCart/ShoppingCart'
import LinkHere from '../components/LinkHere/LinkHere'

export default class ShoppingCartPage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url='/Giỏ hàng'></LinkHere>
        <ShoppingCart></ShoppingCart>
      </div>
    )
  }
}

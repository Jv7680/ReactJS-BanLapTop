import React, { Component } from 'react'
import VnPay from '../components/Payment/VnPay';


export default class VnPayPage extends Component {


  render() {
   const search = this.props.match.location.search;
    const params = new URLSearchParams(search);
    const vnp_ResponseCode = params.get('vnp_ResponseCode'); // bar
    
    const {orderid} = this.props.match.match.params
    window.scrollTo(0, 0);
    return (
      <div>
        <VnPay orderid = {orderid} vnp_ResponseCode={vnp_ResponseCode} ></VnPay>
      </div>
    )
  }
}

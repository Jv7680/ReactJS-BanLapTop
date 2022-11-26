import React, { Component } from 'react'
import Paypal from '../components/Payment/Paypal';


export default class PaypalPage extends Component {


  render() {
   const search = this.props.match.location.search;
    const params = new URLSearchParams(search);
    const paymentId = params.get('paymentId'); // bar
    const PayerID = params.get('PayerID'); // bar
    const {orderid} = this.props.match.match.params
   console.log("đây là payment",orderid,paymentId,PayerID)
    window.scrollTo(0, 0);
    return (
      <div>
        <Paypal orderid = {orderid} paymentId={paymentId} PayerID={PayerID} ></Paypal>
      </div>
    )
  }
}

import React, { Component } from 'react'
import MoMo from '../components/Payment/MoMo';


export default class MoMoPage extends Component {


  render() {
   const search = this.props.match.location.search;
    const params = new URLSearchParams(search);
    const errorCode = params.get('errorCode'); // bar
    const {orderid} = this.props.match.match.params
   
    window.scrollTo(0, 0);
    return (
      <div>
        <MoMo orderid = {orderid} errorCode={errorCode}></MoMo>
      </div>
    )
  }
}

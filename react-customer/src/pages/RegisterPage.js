import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import Register from '../components/LoginRegister/Register'

export default class RegisterPage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url= "/ Đăng ký"></LinkHere>
        <div className="page-section mb-60">
        <div className="container">
          <div className="row justify-content-center">
            <Register></Register>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

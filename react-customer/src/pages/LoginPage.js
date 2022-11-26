import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import Login from '../components/LoginRegister/Login'

export default class LoginRegisterPage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url='/ Đăng nhập'></LinkHere>
        <div className="page-section mb-60">
        <div className="container">
          <div className="row justify-content-center">
            <Login></Login>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

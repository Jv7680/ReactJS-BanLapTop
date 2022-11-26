import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import ForgotPassword from '../components/LoginRegister/ForgotPassword'

export default class ForgotPasswordPage extends Component {
    render() {
        const url = this.props.match.match.url;
        return (
            <div>
                <LinkHere url='/ quên mật khẩu'></LinkHere>
                <ForgotPassword></ForgotPassword>
            </div>
        )

    }
}

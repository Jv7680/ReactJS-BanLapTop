import React, { Component } from 'react'
import ResetPassword from '../components/LoginRegister/ResetPassword'; 

export default class ResetPasswordPage extends Component {
    render() {
        const code = this.props.match.match.params;
        return (
            <ResetPassword code = {code}></ResetPassword>
        )
    }
}

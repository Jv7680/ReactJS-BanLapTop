import React, { Component } from 'react'
import { actActiveRequest, actLoginRequest } from '../../redux/actions/auth';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { startLoading, doneLoading } from '../../utils/loading'
import { withRouter } from 'react-router-dom';


import callApi from '../../utils/apiCaller';

import "./style.css";
toast.configure()

class ActiveAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeCode: "",
        }
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        // console.log(event)
        const { activeCode } = this.state;
        console.log('active code là: ', activeCode);

        const user = {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }

        startLoading();
        await this.props.activeRequest(activeCode, user);
        doneLoading();
    }


    render() {
        const { activeCode } = this.state;
        const { user } = this.props;
        if (user !== null) {
            return <Redirect to="/"></Redirect>
        }

        return (
            <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30">
                {/* Login Form s*/}
                <form >
                    <div className="login-form">
                        <h4 className="login-title">Kích Hoạt Tài Khoản</h4>
                        <div className="row">
                            <div className="col-md-12 col-12 mb-20">
                                <label>Mã Xác Thực *</label>
                                <input
                                    value={activeCode}
                                    onChange={this.handleChange}
                                    className="mb-0"
                                    type="text"
                                    placeholder="Nhập mã xác thực của bạn"
                                    name='activeCode'
                                />
                            </div>
                            <div className="col-md-4">
                                <button onClick={(event) => this.handleSubmit(event)} className="register-button mt-0 mb-3" value="Submit">Xác Nhận</button>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        activeRequest: (activeCode, user) => {
            dispatch(actActiveRequest(activeCode, user))
        },
        loginRequest: (user) => {
            dispatch(actLoginRequest(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActiveAccount))

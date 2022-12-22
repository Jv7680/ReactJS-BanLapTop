import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
import { toast } from 'react-toastify';
import { actForgotPasswordRequest } from '../../redux/actions/auth';
import { startLoading, doneLoading } from '../../utils/loading';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import callApi from '../../utils/apiCaller';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            code: '',
            password: '',
            repassword: '',
            sentCodeSuccess: false,
        }
    }
    handleChange = event => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        });
    }
    sendEmailResetPassword = async (event) => {
        event.preventDefault();
        const { email } = this.state;
        console.log(email)
        if (email === '') {
            return toast.error('Bạn chưa nhập Gmail!');
        }
        if (!email.match(/.+@.+/)) {
            return toast.error('Gmail không hợp lệ ');
        }
        const dataEmail = {
            email
        }
        await this.props.resetMyPassword(dataEmail)


        setTimeout(() => {
            this.setState({
                email: '',
                sentCodeSuccess: true,
            });
        }, 2000);

    }

    sendCodeResetPassword = async (event) => {
        event.preventDefault();
        const { code } = this.state;
        console.log(code)
        if (code === '') {
            return toast.error('Bạn chưa nhập mã xác thực!');
        }


        startLoading();
        const res = await callApi(`auth/reset/${code}`, 'GET', null);
        doneLoading();
        if (res && res.status === 200) {
            MySwal.fire({
                icon: 'success',
                title: 'Mã Hợp Lệ',
                text: 'Vui lòng nhập mật khẩu mới!'
            })
            this.props.history.push(`/reset/${code}`);
        }

        this.setState({
            email: '',
            //sentCodeSuccess: false,
        });
        // setTimeout(()=>{
        //     this.props.history.push(`/activeaccount`);
        // },1000);

    }

    render() {
        const { email, sentCodeSuccess, code } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6" style={{ padding: 55, margin: 'auto' }}>
                        {
                            sentCodeSuccess ?
                                (
                                    <form>
                                        <div className="login-form fix-border-rspw">
                                            <h4 className="login-title">Nhập mã xác thực</h4>
                                            <div className="row">
                                                <div className="col-md-12 col-12 mb-20">
                                                    <label>Nhập mã*</label>
                                                    <input
                                                        onChange={this.handleChange}
                                                        value={code}
                                                        className="mb-0"
                                                        type="text"
                                                        placeholder="Mã xác thực"
                                                        name='code'
                                                    />
                                                </div>
                                                <div className="col-md-4" style={{ width: "400px" }}>
                                                    <button
                                                        onClick={this.sendCodeResetPassword}
                                                        className="register-button mb-3 fix-button-resetpw">
                                                        Gửi
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )
                                :
                                (
                                    <form onSubmit={(event) => this.handleSubmit(event)}>
                                        <div className="login-form fix-border-rspw">
                                            <h4 className="login-title">Đặt lại mật khẩu</h4>
                                            <div className="row">
                                                <div className="col-md-12 col-12 mb-20">
                                                    <label>Nhập Gmail*</label>
                                                    <input
                                                        onChange={this.handleChange}
                                                        value={email}
                                                        className="mb-0"
                                                        type="email"
                                                        placeholder="Gmail"
                                                        name='email'
                                                    />
                                                </div>
                                                <div className="col-md-4" style={{ width: "400px" }}>
                                                    <button
                                                        onClick={this.sendEmailResetPassword}
                                                        className="register-button mb-3 fix-button-resetpw">
                                                        Gửi
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetMyPassword: (email) => {
            dispatch(actForgotPasswordRequest(email))
        }
    }
}
export default connect(null, mapDispatchToProps)(withRouter(ForgotPassword))
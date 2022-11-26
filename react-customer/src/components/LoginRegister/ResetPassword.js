import React, { Component } from 'react'
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import callApi from '../../utils/apiCaller';
import { actPasswordRequest } from '../../redux/actions/auth';
import { startLoading, doneLoading } from '../../utils/loading'

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.code,
            email: '',
            password: '',
            repassword: '',
            isActive: false,
            isSuccess: false
        }
    }

    async componentWillMount() {
        const { code } = this.state.code
        console.log("code hientai", code)
        startLoading();
        const res = await callApi(`auth/reset/${code}`, 'GET', null);
        doneLoading();
        if (res && res.status === 200) {
            toast.success('Xác thực thành công')
            const mailCrurrent = localStorage.getItem("_mailreset");
            this.setState({ isActive: true, email: mailCrurrent })
        }
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        });
    }
    sendPasswordReset = async (event) =>{
        event.preventDefault();
        const {email,password,repassword} = this.state
        const data = {
            email,
            password,
            repassword
        }
        this.props.resetPassword(data)
        this.setState({
            password: '',
            repassword: '',
            isSuccess: true
        })
    }


    render() {
        const { password, repassword,isSuccess} = this.state;
        if(isSuccess){
            return <Redirect to ='/login'></Redirect>
        }
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6" style={{ padding: 55, margin: 'auto' }}>
                        {/* Login Form s*/}
                        <form>
                            <div className="login-form fix-border-rspw">
                                <h4 className="login-title">Đặt lại mật khẩu</h4>
                                <div className="row">
                                    <div className="col-md-12 col-12 mb-20">
                                        <label>Mật khẩu mới</label>
                                        <input
                                            onChange={this.handleChange}
                                            value={password}
                                            className="mb-0"
                                            type="text"
                                            placeholder="Mật khẩu mới"
                                            name='password'
                                        />
                                    </div>
                                    <div className="col-md-12 col-12 mb-20">
                                        <label>Nhập lại mật khẩu</label>
                                        <input
                                            onChange={this.handleChange}
                                            value={repassword}
                                            className="mb-0"
                                            type="text"
                                            placeholder="Nhập lại mật khẩu"
                                            name='repassword'
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <button
                                            onClick={this.sendPasswordReset}
                                            className="register-button mb-3 fix-button-resetpw">
                                            Đổi mật khẩu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    
}
const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (user) => {
            dispatch(actPasswordRequest(user))
        }
    }
}
export default connect(null, mapDispatchToProps)(ResetPassword)

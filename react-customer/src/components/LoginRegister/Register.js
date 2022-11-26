import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actRegisterRequest } from '../../redux/actions/auth';
import { connect } from 'react-redux'
import { startLoading, doneLoading } from '../../utils/loading'
toast.configure()

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname:'',
      lastname:'',
      gmail: '',
      password: '',
      repassword: '',
      phonenumber:'',
      address:''
    }
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { firstname,lastname, gmail, password, repassword,phonenumber,address } = this.state;
    const user = {
      firstname,
      lastname,
      gmail,
      password,
      repassword,
      phonenumber,
      address
    }
    if (password !== repassword){
      toast.error('Mật khẩu không khớp!')
      return 
    }
    if (password.length < 6 || password.length > 32) {
      toast.error('Mật khẩu chỉ 6-32 ký tự');
      return
    }
    if(phonenumber.length !== 10)
    {
      toast.error('SĐT không hợp lệ');
      return
    }
    
    console.log(user);
  
    await this.props.registerRequest(user);
    this.setState ({
      firstname:'',
      lastname:'',
      gmail: '',
      password: '',
      repassword: '',
      phonenumber:'',
      address:''
    } ) 
  
  }

  render() {
    const { firstname,lastname, gmail, phonenumber,address,password,repassword } = this.state;
    return (
      <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12">
        <form onSubmit={(event) => this.handleSubmit(event)} >
          <div className="login-form">
            <h4 className="login-title">Đăng ký</h4>
            <div className="row">
              <div className="col-md-6 mb-20">
                <label>Họ và tên đệm</label>
                <input
                  value={lastname}
                  onChange={this.handleChange}
                  className="mb-0"
                  type="text"
                  name="lastname"
                  placeholder="Họ và tên đệm" />
              </div>
              <div className="col-md-6 mb-20">
                <label>Tên</label>
                <input
                  value={firstname}
                  onChange={this.handleChange}
                  className="mb-0"
                  type="text"
                  name="firstname"
                  placeholder="Họ tên" />
              </div>
              <div className="col-md-12 mb-20">
                <label>Gmail*</label>
                <input
                  value={gmail}
                  onChange={this.handleChange}
                  className="mb-0"
                  type="email"
                  name="gmail"
                  placeholder="Địa chỉ Gmail" />
              </div>
              <div className="col-md-6 mb-20">
                <label>Mật khẩu*</label>
                <input
                  value={password}
                  onChange={this.handleChange}
                  className="mb-0"
                  type="password"
                  name="password"
                  placeholder="Mật khẩu trên 6-32 ký tự" />
              </div>
              <div className="col-md-6 mb-20">
                <label>Nhập lại mật khẩu *</label>
                <input
                   value={repassword}
                  onChange={this.handleChange}
                  className="mb-0"
                  type="password"
                  name="repassword"

                  placeholder="Nhập lại mật khẩu"
                />
              </div>
              <div className="col-md-12 mb-20">
                <label>SĐT *</label>
                <input
                  value={phonenumber}
                  onChange={this.handleChange}
                  className="mb-0"
                  type="text"
                  name="phonenumber"
                  placeholder="Nhập số điện thoại (10 số) " /> 
              </div>
              <div className="col-md-12 mb-20">
                <label>Địa chỉ *</label>
                <input
                  value={address}
                  onChange={this.handleChange}
                  className="mb-0"
                  type="text"
                  name="address"
                  placeholder="Địa chỉ" /> 
              </div>
              <div className="col-12">
                <button className="register-button mt-0">Đăng ký</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (user) => {
      dispatch(actRegisterRequest(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(Register)


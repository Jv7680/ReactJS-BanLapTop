import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.css'
import { actTokenRequest } from '../../redux/actions/auth'
import { startLoading, doneLoading } from '../../utils/loading'


class HeaderTop extends Component {
  logOut = async () => {
    localStorage.removeItem('_auth');
    localStorage.removeItem('_id');
    localStorage.removeItem('_username');
    const token = null;
    startLoading();
    await this.props.setTokenRedux(token);
    doneLoading();
  }

  loadingPage = () => {
    startLoading();
    doneLoading();
  }

  render() {
    const { token, user } = this.props;
    const usernamelocal = localStorage.getItem('_username')
    console.log(user)

    return (
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="header-top-left">
                <ul className="phone-wrap">
                  <li><span>Liên hệ:</span><a href="/">(+84) 945470158</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="header-top-right">
                <ul className="ht-menu">

                  <li>
                    {
                      (!token)
                        ? (<Link onClick={() => this.loadingPage()} to="/login" className="fix-link-color language-selector-wrapper"> Login </Link>)
                        : (<div className="dropdown show">

                          <Link to="#" className=" fix-link-color dropdown-toggle navList__item-user-link" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={user.image || user.imageLink || "https://i.ibb.co/NCdx7FF/avatar-Default.png" } class="navList__item-user-avatar"></img>
                            <div class="navList__item-user-name ml-10"> {user.userCustomer || user.username ||usernamelocal }</div>
                          </Link>
                          <div className="fix-text-item dropdown-menu ht-setting-list " aria-labelledby="dropdownMenuLink">
                            <Link className="fix-text-item dropdown-item" to="/profile">Cá nhân</Link>
                            <Link className="fix-text-item dropdown-item" to="/order/status1">Đơn Hàng</Link>
                            <Link onClick={this.logOut} to="/login" className="fix-text-item dropdown-item" href="/">Đăng xuất</Link>
                          </div>
                        </div>)
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    token: state.auth,
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTokenRedux: (token) => {
      dispatch(actTokenRequest(token))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderTop)

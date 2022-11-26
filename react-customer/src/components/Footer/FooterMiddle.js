import React, { Component } from 'react'

export default class FooterMiddle extends Component {
  render() {
    return (
      <div className="footer-static-middle">
        <div className="container">
          <div className="footer-logo-wrap pt-50 pb-35">
            <div className="row">
              {/* Begin Footer Logo Area */}
              <div className="col-lg-4 col-md-6">
                <div className="footer-logo">
                  <img src={process.env.PUBLIC_URL + '/images/logo/logoPTCustomer.png'}
                    style={{
                      width: '180px',
                      height: '60px',
                      borderRadius: '5px',
                    }}
                    alt="Footer Logo" />
                  <p className="info">

                    Chúng tôi là một nhóm các nhà thiết kế và nhà phát triển tạo ra Mẫu HTML chất lượng cao            </p>
                </div>
                <ul className="des">

                  <li>
                    <span>Liên hệ: </span>
                    <a href="/">0945470158</a>
                  </li>
                  <li>
                    <span>Email: </span>
                    <a href="mailto://info@yourdomain.com">Tin@gmail.com</a>
                  </li>
                </ul>
              </div>
              {/* Footer Logo Area End Here */}
              {/* Begin Footer Block Area */}
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer-block">
                  <h3 className="footer-block-title">Sản phẩm</h3>
                  <ul>
                    <li><a href="/">Uy tín</a></li>
                    <li><a href="/">Chất lượng</a></li>
                  </ul>
                </div>
              </div>
              {/* Footer Block Area End Here */}
              {/* Begin Footer Block Area */}
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer-block">
                  <h3 className="footer-block-title">Thành viên</h3>
                  <ul>
                    <li><a href="/">Trung Tín</a></li>
                    <li><a href="/">Tấn Phi</a></li>
                    <li><a href="/">Về chúng tôi</a></li>
                    <li><a href="/">Liên hệ</a></li>
                  </ul>
                </div>
              </div>
              {/* Footer Block Area End Here */}
              {/* Begin Footer Block Area */}
              <div className="col-lg-4">
                <div className="footer-block">
                  <h3 className="footer-block-title">Theo dõi chúng tôi</h3>
                  <ul className="social-link">
                    <li className="twitter">
                      <a href="https://twitter.com" data-toggle="tooltip" title="Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>

                    <li className="google-plus">
                      <a href="https://www.plus.google.com" data-toggle="tooltip" title="Google Plus">
                        <i className="fab fa-google-plus-g"></i>
                      </a>
                    </li>
                    <li className="facebook">
                      <a href="https://www.facebook.com/" data-toggle="tooltip" title="Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="youtube">
                      <a href="https://www.youtube.com/" data-toggle="tooltip" title="Youtube">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>

                  </ul>
                </div>

                {/* Footer Newsletter Area End Here */}
              </div>
              {/* Footer Block Area End Here */}
            </div>
          </div>
        </div>
      </div>


    )
  }
}

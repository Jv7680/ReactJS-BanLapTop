import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
import { toast } from "react-toastify";
export default class Contact extends Component {

  render() {
    return (
      <div className="contact-main-page mt-60 mb-40 mb-md-40 mb-sm-40 mb-xs-40">
        <div className="container">
          <div className="row">
            <div className="col col-md-24 order-1 order-lg-2">
              <div className="contact-page-side-content">
                <h3 className="contact-page-title">Liên hệ chúng tôi</h3>
                <p className="contact-page-message mb-25">
                  Nội dung.
                </p>
                <div className="single-contact-block">
                  <h4>
                    <i className="fa fa-fax" /> Địa chỉ
                  </h4>
                  <p>03 Quang Trung – TP HCM - VN</p>
                </div>
                <div className="single-contact-block">
                  <h4>
                    <i className="fa fa-phone" /> Điện thoại
                  </h4>
                  <p>Mobile: (+84) 123 456 789</p>
                  <p>Hotline: 1009 678 456</p>
                </div>
                <div className="single-contact-block last-child">
                  <h4>
                    <i className="fa fa-envelope-o" /> Email
                  </h4>
                  <p>tin@gmail.com</p>
                  <p>phi@gmail.com</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

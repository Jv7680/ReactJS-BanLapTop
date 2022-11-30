import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BannerRight extends Component {
  render() {
    return (
      <div className="col-lg-4 col-md-4 text-center pt-xs-30">
        <div className="li-banner">
          <Link to="#">
            <img src="https://cdn.ankhang.vn/media/product/21949_asus_tuf_gaming_f15_fx506hm_hn366w.jpg" alt="not found"
              style={{ width: "300px", height: "190px" }}
            />
          </Link>
        </div>
        <div className="li-banner mt-15 mt-sm-30 mt-xs-30">
          <Link to="#">
            <img src="https://laptopaz.vn/media/lib/2233_4.jpg" alt="not found"
              style={{ width: "300px", height: "190px" }}
            />
          </Link>
        </div>
      </div>
    )
  }
}

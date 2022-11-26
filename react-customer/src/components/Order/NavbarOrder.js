import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavbarOrder extends Component {
    render() {
        return (

            <nav className="col-md-2 side-navbar">

                <ul className="list-unstyled">
                    <li><Link to="/order/status1"> <i className="fa-solid fa-list-check" />Đơn đang duyệt </Link></li>
                    <li><Link to="/order/status2"> <i className="fa-solid fa-cart-flatbed" />Đơn đang giao</Link></li>
                    <li><Link to="/order/status3"> <i className="fa-solid fa-clipboard-check" />Đơn đã giao</Link></li>
                    <li><Link to="/order/status4"> <i className="fa-solid fa-calendar-xmark" />Đơn đã hủy</Link></li>
                </ul>
            </nav>


        )
    }
}

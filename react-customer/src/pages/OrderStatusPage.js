import React, { Component } from 'react'
import Order from '../components/Order/OrderStatus1'
import NavbarOrder from '../components/Order/NavbarOrder'
import OrderStatus1 from '../components/Order/OrderStatus1'
import OrderStatus2 from '../components/Order/OrderStatus2'
import OrderStatus3 from '../components/Order/OrderStatus3'
import OrderStatus4 from '../components/Order/OrderStatus4'

export default class OrderPage extends Component {

    renderSwitch(param) {
        switch (param) {
            case 'status1':
                return <OrderStatus1></OrderStatus1>;
            case 'status2':
                return <OrderStatus2></OrderStatus2>;
            case 'status3':
                return <OrderStatus3></OrderStatus3>;
            default:
                return <OrderStatus4></OrderStatus4>;
        }
    }

    render() {
        console.log("lấy trạng thái", this.props.match.match.params.status)
        const status = this.props.match.match.params.status;
        return (
            <div className="page-content d-flex align-items-stretch">
                <NavbarOrder></NavbarOrder>
                {this.renderSwitch(status)}

            </div>
        )
    }
}

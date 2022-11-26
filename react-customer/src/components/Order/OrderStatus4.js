import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../config/TYPE'
import Moment from 'react-moment';
import './style.css'
import { connect } from 'react-redux'
import { actFetchOrdersRequest, actDeleteOrderRequest } from '../../redux/actions/order'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
let id;
class OrderStatus4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusPage: 'Đã hủy',
            redirectToProduct: false
        }
    }
    componentDidMount() {
        id = localStorage.getItem("_id");
        const { statusPage } = this.state
        console.log("id,va trangj thai", id, statusPage)
        this.fetch_reload_data(statusPage, id);
    }
    fetch_reload_data(statusPage, id) {
        this.props.fetch_orders(statusPage, id)
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        const { orders } = this.props
        console.log("oder laays dduioc", orders)
        return (
            <div className="content-inner">
                <section className="tables">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            {
                                                orders.length > 0 ?
                                                    (
                                                        <table className="table table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>id đơn hàng</th>
                                                                    <th>sản phẩm</th>
                                                                    <th>Tổng tiền</th>
                                                                    <th>Ngày tạo</th>
                                                                    <th>Hủy đơn</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {orders && orders.length ? orders.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row">{item.orderId}</th>
                                                                            <td>
                                                                                {
                                                                                    item.listProduct && item.listProduct.length ?
                                                                                        item.listProduct.map((product, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <li className='d-flex' key={index}>
                                                                                                        <div className="fix-order">
                                                                                                            <img src={product.productImage} className="fix-img-order" alt="not found" />
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <h6 className='pl-3 pt-10'>{product.productName}</h6>

                                                                                                            <strong
                                                                                                                className="pl-3 product-quantity"
                                                                                                                style={{
                                                                                                                    paddingLeft: 10,
                                                                                                                    color: "coral",
                                                                                                                    fontStyle: "italic",
                                                                                                                }}
                                                                                                            >
                                                                                                                x{product.quantity}
                                                                                                            </strong>
                                                                                                        </div>


                                                                                                    </li>
                                                                                                </>

                                                                                            )
                                                                                        }) : null
                                                                                }
                                                                            </td>
                                                                            <td>{formatNumber(item.amount)}</td>
                                                                            <td>
                                                                                <Moment format="YYYY/MM/DD">
                                                                                    {item.createDate}
                                                                                </Moment>
                                                                            </td>
                                                                            <td>
                                                                                <span className="badge badge-pill badge-danger mb-10">Đã hủy</span>
                                                                                <br />

                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }) : null}
                                                            </tbody>
                                                        </table>
                                                    ) :
                                                    (
                                                        <img src='https://brabantia.com.vn/images/cart-empty.png' className="rounded mx-auto d-block"></img>
                                                    )
                                            }

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        orders: state.orders
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetch_orders: (status, id) => {
            return dispatch(actFetchOrdersRequest(status, id))
        },
        delete_order: (id) => {
            dispatch(actDeleteOrderRequest(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus4)



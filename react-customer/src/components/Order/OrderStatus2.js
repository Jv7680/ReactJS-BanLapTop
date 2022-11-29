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
class OrderStatus2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusPage: 'Chưa duyệt',
            redirectToProduct: false
        }
    }
    componentDidMount() {
        let id = parseInt(localStorage.getItem("_id"));
        const { statusPage } = this.state

        //status = 2 là đã duyệt
        this.fetch_reload_data(2, id);
    }
    fetch_reload_data(statusPage, id) {
        this.props.fetch_orders(statusPage, id)
            .catch(err => {
                console.log(err);
            })
    }
    handleRemove = (id) => {
        MySwal.fire({
            title: 'Xóa đơn hàng?',
            text: `Bạn chắc chắn xóa đơn hàng ${id}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.value) {
                await this.props.delete_order(id);
                await Swal.fire(
                    'Xóa!',
                    'Đơn hàng của bạn đã được xóa.!',
                    'success'
                )
                // window.location.reload();
            }
        })
    }


    render() {
        const { orders } = this.props
        console.log("orders của redux: ", orders)
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
                                                                    {/* Tạm thời bỏ sản phẩm */}
                                                                    <th>sản phẩm</th>
                                                                    <th>Tổng tiền</th>
                                                                    <th>Ngày tạo</th>
                                                                    <th>Trạng thái</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {orders && orders.length ? orders.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row">{item.orderId}</th>
                                                                            <td>
                                                                                {
                                                                                    item.lstOrdersDetail && item.lstOrdersDetail.length ?
                                                                                        item.lstOrdersDetail.map((product, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <li className='d-flex' key={index}>
                                                                                                        <div className="fix-order">
                                                                                                            <img src={product.imgLink} className="fix-img-order" alt="not found" />
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
                                                                                                                SL: {product.quantity}
                                                                                                            </strong>
                                                                                                        </div>


                                                                                                    </li>
                                                                                                </>

                                                                                            )
                                                                                        }) : null
                                                                                }
                                                                            </td>
                                                                            <td>{formatNumber(item.totalAmount)}</td>
                                                                            <td>
                                                                                <Moment format="DD/MM/YYYY">
                                                                                    {item.createDate}
                                                                                </Moment>
                                                                            </td>
                                                                            <td>
                                                                                <span className="badge badge-pill badge-warning mb-10">Đã duyệt</span>
                                                                                {/* <br />
                                                                                <button className="btn btn-outline-danger"
                                                                                    value={item.orderId}
                                                                                    onClick={() => this.handleRemove(item.orderId)} > Hủy đơn</button> */}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }) : <tr>Chưa có Đơn </tr>}
                                                            </tbody>
                                                        </table>
                                                    )
                                                    :
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus2)



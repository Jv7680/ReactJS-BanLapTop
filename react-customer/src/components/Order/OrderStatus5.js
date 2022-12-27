import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../config/TYPE'
import Moment from 'react-moment';
import './style.css'
import { connect } from 'react-redux'
import { actFetchOrdersRequest, actDeleteOrderRequest } from '../../redux/actions/order'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Modal from "react-modal";
const MySwal = withReactContent(Swal)
let id;
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "1000px"
    }
};

class OrderStatus5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusPage: 'Đã hủy',
            redirectToProduct: false,
            modalIsOpen: false,
            listProductOrdered: [],
        }
    }
    componentDidMount() {
        id = localStorage.getItem("_id");
        const { statusPage } = this.state
        console.log("id,va trangj thai", id, statusPage)

        //status = 5 là đã hủy
        this.fetch_reload_data(5, id);
    }
    fetch_reload_data(statusPage, id) {
        this.props.fetch_orders(statusPage, id)
            .catch(err => {
                console.log(err);
            })
    }

    openModalOrderDetail = (e, item) => {
        e.preventDefault();


        //lấy danh saasch sản phẩm của mỗi đơn hàng item
        let listProductOrdered = item.lstOrdersDetail;
        console.log('itemsss:', item);
        console.log('listProductOrdered:', listProductOrdered);
        localStorage.setItem('_orderId', item.orderId);
        this.setState({
            modalIsOpen: true,
            listProductOrdered: item.lstOrdersDetail,
        })
    }

    showItem(items) {
        let result = null;
        console.log('items: ', items)
        if (items.length > 0) {
            result = items.map((item, index) => {
                return (
                    <tr>
                        <td className="li-product-thumbnail d-flex justify-content-center">
                            <Link to={`/products/${item.productId}`} >
                                <div className="fix-cart"> <img className="fix-img" src={item.imgLink} alt="Li's Product" /></div>
                            </Link>
                        </td>
                        <td className="li-product-name">
                            <Link className="text-dark" to={`/products/${item.productId}`}>{item.productName}</Link>
                        </td>
                        <td className="li-product-name">
                            {formatNumber(item.price)}
                        </td>
                        <td className="li-product-name">
                            {item.quantity}
                        </td>
                    </tr>
                );
            });
        }
        return result;
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { orders } = this.props
        const { listProductOrdered } = this.state
        console.log("oder laays dduioc", orders)
        return (
            <div className="content-inner">
                <section className="tables">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <Modal
                                            isOpen={this.state.modalIsOpen}
                                            onAfterOpen={this.afterOpenModal}
                                            onRequestClose={this.closeModal}
                                            style={customStyles}
                                            ariaHideApp={false}
                                            contentLabel="Example Modal"
                                        >
                                            <div className="table-content table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th className="li-product-thumbnail">Ảnh</th>
                                                            <th className="cart-product-name">Tên sản phẩm</th>
                                                            <th className="li-product-price">Giá</th>
                                                            <th className="li-product-quantity">Số lượng</th>
                                                            {/* <th className="li-product-subtotal">Tổng</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.showItem(listProductOrdered)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="feedback-input">
                                                <div className="feedback-btn pb-15">

                                                    <button
                                                        onClick={this.closeModal}
                                                        className="btn mr-1"
                                                        style={{ background: "#fed700", color: "white" }}
                                                    >
                                                        Thoát
                                                    </button>
                                                </div>
                                            </div>

                                        </Modal>
                                        <div className="table-responsive">
                                            {
                                                orders.length > 0 ?
                                                    (
                                                        <table className="table table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>id đơn hàng</th>
                                                                    <th>Tổng sản phẩm</th>
                                                                    <th>Tổng tiền</th>
                                                                    <th>Khách hàng</th>
                                                                    <th>Số điện thoại</th>
                                                                    <th>Ngày hủy</th>
                                                                    <th>Trạng thái</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {orders && orders.length ? orders.map((item, index) => {
                                                                    return (
                                                                        <tr key={index} onDoubleClick={(e) => { this.openModalOrderDetail(e, item) }}>
                                                                            <th scope="row">{item.orderId}</th>
                                                                            <td>
                                                                                {/* {
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
                                                                                } */}
                                                                                {
                                                                                    item.totalQuantity
                                                                                }
                                                                            </td>
                                                                            <td>{formatNumber(item.totalAmount)}</td>
                                                                            <td>{item.receiptName}</td>
                                                                            <td>{item.phoneNumber}</td>
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus5)



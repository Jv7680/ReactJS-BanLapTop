import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../config/TYPE'
import Moment from 'react-moment';
import Modal from "react-modal";
import './style.css'
import BeautyStars from "beauty-stars";
import { connect } from 'react-redux'
import { actFetchOrdersDeliveredRequest, actDeleteOrderRequest, actAddReview, actFetchOrdersRequest } from '../../redux/actions/order'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
class OrderStatus4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusPage: 'Đã giao',
            redirectToProduct: false,
            ratingPoint: 0,
            modalIsOpen: false,
            listProductOrdered: [],
            idOrderReview: 0,
            idProductReview: 0,
            textRating: ""
        }
        // this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        id = localStorage.getItem("_id");
        const { statusPage } = this.state

        //status = 4 là đã giao
        this.fetch_reload_data(4, id);
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
                        {/* <td className="li-product-name">
                            {
                                item.isReviewed ?
                                    (
                                        <>
                                            <Link className="text-dark" to={`/products/${item.productId}`}>
                                                <span style={{ fontStyle: "italic", color: "green" }}>
                                                    Đã đánh giá
                                                </span>
                                            </Link>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <Link className="text-dark" to={`/products/${item.productId}`}>
                                                <span style={{ fontStyle: "italic", color: "red" }}>
                                                    Đánh giá ngay
                                                </span>
                                            </Link>
                                        </>
                                    )
                            }
                        </td> */}
                    </tr>
                );
            });
        }
        return result;
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleChangeRating = value => {
        this.setState({
            ratingPoint: value
        });
    };
    handleChange = event => {
        let name = event.target.name;
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        });
    };
    handleSubmitRating = async (event) => {
        event.preventDefault();
        const id = parseInt(localStorage.getItem("_id"))
        const { idOrderReview, idProductReview, ratingPoint, textRating, statusPage } = this.state
        if (textRating.length < 9) {
            this.setState({
                modalIsOpen: false,
                ratingPoint: 0
            });
            return Swal.fire(
                'Lỗi!',
                'Vui lòng nhập đánh giá trên 8 ký tự!',
                'error'
            )
        }
        else {
            this.props.add_Review(idOrderReview, idProductReview, id, ratingPoint, textRating)
                .then(res => {
                    console.log("dữ liệu trả về", res)
                    if (res) {
                        this.fetch_reload_data(statusPage, id);
                        this.setState({
                            modalIsOpen: false,
                            ratingPoint: 0
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            return Swal.fire(
                'Thành công!',
                'Đánh giá thành công!',
                'success'
            )

        }




    };

    render() {
        const { orders } = this.props
        const { listProductOrdered } = this.state
        const { idOrderReview, idProductReview, ratingPoint, textRating } = this.state

        console.log(orders)
        return (
            <div className="content-inner">
                <section className="tables">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                {/* <Modal
                                    isOpen={this.state.modalIsOpen}
                                    onAfterOpen={this.afterOpenModal}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    ariaHideApp={false}
                                    contentLabel="Example Modal"
                                >

                                    <h4 ref={subtitle => (this.subtitle = subtitle)}>Đánh giá</h4>
                                    <div className="modal-content" style={{ width: "auto", border: 0 }}>
                                        <div className="modal-body">
                                            <h3 className="review-page-title">Viết đánh giá</h3>
                                            <div className="modal-inner-area row">
                                                <div className="col-lg-12">
                                                    <div className="li-review-content">
                                                        <div className="feedback-area">
                                                            <div className="feedback">
                                                                <h3 className="feedback-title">Tặng sao</h3>
                                                                <form action="/">
                                                                    <div className="your-opinion">
                                                                        <label>Số sao của bạn</label>
                                                                        <div>
                                                                            <BeautyStars
                                                                                size={12}
                                                                                activeColor={"#ed8a19"}
                                                                                inactiveColor={"#c1c1c1"}
                                                                                value={ratingPoint}
                                                                                onChange={ratingPoint => this.handleChangeRating(ratingPoint)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <p className="feedback-form">
                                                                        <label htmlFor="feedback">Viết đánh giá</label>
                                                                        <textarea
                                                                            onChange={this.handleChange}
                                                                            id="textRating"
                                                                            name="textRating"
                                                                            cols={45}
                                                                            rows={8}
                                                                        />
                                                                    </p>
                                                                    <div className="feedback-input">
                                                                        <div className="feedback-btn pb-15">
                                                                            <button
                                                                                onClick={(event) => this.handleSubmitRating(event)}
                                                                                className="btn mr-1"
                                                                                style={{ background: "#e80f0f", color: "white" }}
                                                                            >
                                                                                Gửi
                                                                            </button>
                                                                            <button
                                                                                onClick={this.closeModal}
                                                                                className="btn mr-1"
                                                                                style={{ background: "#fed700", color: "white" }}
                                                                            >
                                                                                Close
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </Modal > */}
                                <div div className="card" >
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
                                                            {/* <th className="li-product-quantity">Đánh giá</th> */}
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
                                                                    <th>Ngày nhận</th>
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
                                                                                <Moment format="DD/MM/YYYY">
                                                                                    {item.createDate}
                                                                                </Moment>
                                                                            </td>

                                                                            {item && item.isReview === 'NO' ?
                                                                                (<td>
                                                                                    <span className="badge badge-pill badge-success mb-10">Đã giao</span>
                                                                                    <br />
                                                                                    <button className="btn btn-outline-info"
                                                                                        value={item.orderId}
                                                                                        onClick={() => this.openModal(item.orderId, item.productId)} > Đánh giá
                                                                                    </button>
                                                                                </td>)
                                                                                :
                                                                                (<td>
                                                                                    <span className="badge badge-pill badge-success mb-10">Đã giao</span>
                                                                                </td>)

                                                                            }


                                                                        </tr>



                                                                    )
                                                                }) : null}
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

                                </div >
                            </div >
                        </div >
                    </div >
                </section >
            </div >

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
            //return dispatch(actFetchOrdersDeliveredRequest(status, id))
            return dispatch(actFetchOrdersRequest(status, id))
        },
        delete_order: (id) => {
            dispatch(actDeleteOrderRequest(id))
        },
        add_Review: (idOrder, idProduct, idUser, ratingPoint, textRating) => {
            return dispatch(actAddReview(idOrder, idProduct, idUser, ratingPoint, textRating))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus4)



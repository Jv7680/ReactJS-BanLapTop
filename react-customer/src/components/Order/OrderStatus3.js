import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../config/TYPE'
import Moment from 'react-moment';
import Modal from "react-modal";
import './style.css'
import BeautyStars from "beauty-stars";
import { connect } from 'react-redux'
import { actFetchOrdersDeliveredRequest, actDeleteOrderRequest, actAddReview } from '../../redux/actions/order'
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
        width: "500px"
    }
};
class OrderStatus3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusPage: 'Đã giao',
            redirectToProduct: false,
            ratingPoint: 0,
            modalIsOpen: false,
            idOrderReview: 0,
            idProductReview: 0,
            textRating: ""
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        id = localStorage.getItem("_id");
        const { statusPage } = this.state

        this.fetch_reload_data(statusPage, id);
    }
    fetch_reload_data(statusPage, id) {
        this.props.fetch_orders(statusPage, id)
            .catch(err => {
                console.log(err);
            })
    }

    openModal(idOrder, idProduct) {
        this.setState(
            {
                modalIsOpen: true,
                idOrderReview: idOrder,
                idProductReview: idProduct
            }
        );
    }

    afterOpenModal() {
        this.subtitle.style.color = "#2d3136";
    }

    closeModal() {
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
        const { idOrderReview, idProductReview, ratingPoint, textRating } = this.state

        console.log(orders)
        return (
            <div className="content-inner">
                <section className="tables">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <Modal
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
                                                        {/* Begin Feedback Area */}
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
                                                        {/* Feedback Area End Here */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
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
                                                                    {/* <th>Tổng tiền</th> */}
                                                                    <th>Ngày tạo</th>
                                                                    <th>Hủy đơn</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {orders && orders.length ? orders.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>

                                                                            <th scope="row">{item.orderId}</th>
                                                                            <td className='d-flex'>
                                                                                <div className="fix-order">
                                                                                    <img src={item.productImage} className="fix-img-order" alt="not found" />
                                                                                </div>
                                                                                <div>
                                                                                    <h6 className='pl-3 pt-10'>{item.productName}</h6>
                                                                                    <strong
                                                                                        className="product-quantity"
                                                                                        style={{
                                                                                            paddingLeft: 10,
                                                                                            color: "coral",
                                                                                            fontStyle: "italic",
                                                                                        }}
                                                                                    >
                                                                                        x{item.quantity}
                                                                                    </strong>
                                                                                </div>



                                                                            </td>
                                                                            {/* <td>{formatNumber.format(item.amount)}</td> */}
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
                                                                                    <br />
                                                                                    <span>Đã đánh giá</span>
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
            return dispatch(actFetchOrdersDeliveredRequest(status, id))
        },
        delete_order: (id) => {
            dispatch(actDeleteOrderRequest(id))
        },
        add_Review: (idOrder, idProduct, idUser, ratingPoint, textRating) => {
            return dispatch(actAddReview(idOrder, idProduct, idUser, ratingPoint, textRating))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus3)



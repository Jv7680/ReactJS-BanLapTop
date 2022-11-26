import React, { Component } from 'react'
import Modal from "react-modal";
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import { is_empty } from '../../utils/validations';
import { actRemoveAddressRequest, actUpdateAddressRequest } from "../../redux/actions/address"
import withReactContent from 'sweetalert2-react-content'

import { Link } from 'react-router-dom'
const MySwal = withReactContent(Swal)
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
class ItemAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            address: '',
            phoneNumber: '',
            deliveryAddressId: '',
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        this.setState(
            {
                fullname: this.props.ItemAddress.fullname,
                address: this.props.ItemAddress.deliveryAddress,
                phoneNumber: this.props.ItemAddress.phoneNumber,
                deliveryAddressId: this.props.ItemAddress.deliveryAddressId

            }
        )
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleRemove = (idaddress) => {
        const id = localStorage.getItem("_id");
        const idAddress = parseInt(idaddress)
        console.log(id)
        MySwal.fire({
            title: `Xóa địa chỉ ?`,
            text: "Bạn chắc chắn muốn xóa địa chỉ này !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng',
            cancelButtonText: 'Quay lại'
        }).then(async (result) => {
            if (result.value) {
                await this.props.delete_address(idAddress, id);
                Swal.fire(
                    'Đã xóa!',
                    'Sản phẩm của bạn đã được xóa.',
                    'success'
                )
            }
        })
    }
    handleUpdateAddress = async () => {
        const { address, phoneNumber, fullname, deliveryAddressId } = this.state
        let customerId = parseInt(localStorage.getItem("_id"));
        if (is_empty(address) || is_empty(phoneNumber) || is_empty(fullname)) {
            return toast.error("Vui lòng nhập đầy đủ thông tin");
        }
        const data = {
            deliveryAddress: address,
            phoneNumber,
            customerId,
            fullname
        }
        let res = await this.props.update_address(deliveryAddressId, data)
        console.log(res)
        if (res && res.status === 200) {
            toast.success('Sửa địa chỉ thành công!')
            this.setState({
                modalIsOpen: false,
            })
        }

    }

    openModal(e) {
        e.preventDefault();
        this.setState({
            modalIsOpen: true,
        })
    }

    afterOpenModal() {
        // this.subtitle.style.color = "#2d3136";
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { ItemAddress } = this.props
        const { fullname, phoneNumber, address } = this.state
        return (

            <div key={ItemAddress.deliveryAddressId} >
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="checkout-form-list">
                                <label>Tên người nhận  <span className="required">*</span></label>
                                <input onChange={this.handleChange} type="text" name="fullname" value={fullname} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkout-form-list">
                                <label>SĐT  <span className="required">*</span></label>
                                <input onChange={this.handleChange} type="text" name="phoneNumber" value={phoneNumber} />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="checkout-form-list">
                                <label>Địa chỉ nhận hàng <span className="required">*</span></label>
                                <input onChange={this.handleChange} type="text" name="address" value={address} />
                            </div>
                        </div>
                    </div>
                    <div className="feedback-input">
                        <div className="feedback-btn pb-15">
                            <button
                                className="btn mr-1"
                                style={{ background: "#e80f0f", color: "white" }}
                                onClick={this.handleUpdateAddress}
                            >
                                Cập nhập
                            </button>
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


                <label className="card flex-row" >
                    <span className="col-md-9 plan-details">
                        <span className="d-flex align-items-center plan-cost p-0 ">
                            <span className='d-flex flex-row-reverse col-md-4'>Tên người nhận : </span>
                            <span className='col-md-8'>{ItemAddress.fullname}</span>
                        </span>
                        <span className="d-flex align-items-center plan-cost p-0 ">
                            <span className='d-flex flex-row-reverse col-md-4'>Địa chỉ : </span>
                            <span className='col-md-8'>{ItemAddress.deliveryAddress}</span>
                        </span>
                        <span className="d-flex align-items-center plan-cost p-0">
                            <span className='d-flex flex-row-reverse col-md-4'>Số điện thoại : </span>
                            <span className='col-md-8'>{ItemAddress.phoneNumber}</span>
                        </span>
                        
                    </span>
                    <div className="d-flex col-md-3 justify-content-center align-items-center">
                        <span title='Edit' className="fix-action">
                            <a onClick={(e) => this.openModal(e)}>
                                <i className="fa fa-edit"></i>
                            </a>
                        </span>
                        <span title='Delete' className="fix-action">
                            <a onClick={() => this.handleRemove(ItemAddress.deliveryAddressId)}> <i className="fa fa-trash" style={{ color: '#ff00008f' }}></i>
                            </a>
                        </span>
                    </div>
                </label>

                {/* <div className="col-md-3"> {ItemAddress.fullname}</div>
                <div className="col-md-3">{ItemAddress.deliveryAddress}</div>
                <div className="col-md-3">{ItemAddress.phoneNumber}</div>
                <div className="col-md-3">
                    <span title='Edit' className="fix-action">
                        <a onClick={(e) => this.openModal(e)}>
                            <i className="fa fa-edit"></i>
                        </a>
                    </span>
                    <span title='Delete' className="fix-action">
                        <a onClick={() => this.handleRemove(ItemAddress.deliveryAddressId)}> <i className="fa fa-trash" style={{ color: '#ff00008f' }}></i>
                        </a>
                    </span>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        addresses: state.addresses
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        delete_address: (idaddress, id) => {
            return dispatch(actRemoveAddressRequest(idaddress, id))
        },
        update_address: (idaddress, data) => {
            return dispatch(actUpdateAddressRequest(idaddress, data))
        }
    }
}
export default connect(null, mapDispatchToProps)(ItemAddress)

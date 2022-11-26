import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.css'
import Modal from "react-modal";
import { css } from '@emotion/core';
import { uploadImage } from '../../utils/upload'
import callApi from '../../utils/apiCaller';
import ClipLoader from 'react-spinners/ClipLoader';
import { actUpdateMeRequset, actChangePasswordMeRequset, actFetchUserRequset } from '../../redux/actions/user';
import { actFetchAddressRequest, actAddAddressRequest } from '../../redux/actions/address';

import { startLoading, doneLoading } from '../../utils/loading'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ItemAddress from './ItemAddress';
import { is_empty } from '../../utils/validations';
const MySwal = withReactContent(Swal)
toast.configure()

let token, id;
const override = css`
    display: block;
    margin: 0 auto;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
`;
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

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName: '',
            firstName: '',
            userName: '',
            phone: '',
            email: '',
            address: '',
            avatar: null,
            loading: false,
            img: null,
            currentPassword: '',
            newPassword: '',
            reNewPassword: '',

            fullnameModel: '',
            addressModel: '',
            phoneNumberModel: '',
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    async componentDidMount() {
        id = localStorage.getItem('_id');
        const idaccount = localStorage.getItem('_idaccount');
        const res = await this.props.fetch_user(id, idaccount);
        await this.props.fetch_address(id);
        this.setState({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.gmailCustomer,
            phone: res.data.phoneNumberCustomer,
            address: res.data.address,
            avatar: res.data.image,
            userName: res.data.userCustomer,
            // listAdresses: resAddress.data
        })
    }


    handleChangeImage = (event) => {
        if (event.target.files[0]) {
            const img = event.target.files[0];
            this.setState(() => ({ img }));
        }
        const output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmitChangePassword = (event) => {
        event.preventDefault();
        const customerId = parseInt(localStorage.getItem("_id"));
        const id = parseInt(localStorage.getItem("_idaccount"));
        const { currentPassword, newPassword, reNewPassword } = this.state;
        if (newPassword.length < 6 || newPassword.length > 32) {
            return toast.error('Mật khẩu từ 6-32 kí tự');
        }
        if (newPassword !== reNewPassword) {
            toast.error('Nhập lại mật khẩu không trùng khớp');
            return
        }
        const data = {
            customerId,
            id,
            currentPassword,
            newPassword,
            reNewPassword
        }
        startLoading();
        this.props.change_pw_me(data, token);
        doneLoading();
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const customerId = parseInt(localStorage.getItem("_id"));
        const id = parseInt(localStorage.getItem("_idaccount"));
        const { address, phone, email, firstName, lastName, userName } = this.state;
        let { img, avatar } = this.state;

        this.setState({
            loading: true
        })
        //upload image to firebase
        if (img !== null && img !== avatar) {
            avatar = await uploadImage(img);
        }

        const newAvatar = (avatar === '') ? null : avatar
        const newAddress = (address === '') ? null : address
        const newPhone = (phone === '') ? null : phone
        const newfirstName = (firstName === '') ? null : firstName


        //edit
        const editUser = {
            customerId,
            id,
            image: newAvatar,
            phoneNumber: newPhone,
            email: email,
            address: newAddress,
            firstName: newfirstName,
            lastName,
            userName,
            currentPassword: '',
            newPassword: '',
            reNewPassword: '',
        }

        await this.props.update_me(editUser);
        this.setState({
            loading: false,
        })
    }
    addNewAddress = async () => {
        const { fullnameModel, addressModel, phoneNumberModel } = this.state
        let customerId = parseInt(localStorage.getItem("_id"));
        if (is_empty(fullnameModel) || is_empty(addressModel) || is_empty(phoneNumberModel)) {
            return toast.error("Vui lòng nhập đầy đủ thông tin");
        }
        const data = {
            deliveryAddress: addressModel,
            phoneNumber: phoneNumberModel,
            customerId,
            fullname: fullnameModel
        }
        let res = await this.props.add_address(data)

        if (res && res.status === 200) {
            this.setState({
                modalIsOpen: false,
                fullnameModel: '',
                addressModel: '',
                phoneNumberModel: '',
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
        const { firstName, lastName, email, phone, address, avatar,
            loading, currentPassword, newPassword, reNewPassword,
            fullnameModel, addressModel, phoneNumberModel, modalIsOpen } = this.state;
        const { listAdresses, user } = this.props


        return (
            <div className="container emp-profile">

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
                                <input onChange={this.handleChange} type="text" name="fullnameModel" value={fullnameModel} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkout-form-list">
                                <label>SĐT  <span className="required">*</span></label>
                                <input onChange={this.handleChange} type="text" name="phoneNumberModel" value={phoneNumberModel} />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="checkout-form-list">
                                <label>Địa chỉ nhận hàng <span className="required">*</span></label>
                                <input onChange={this.handleChange} type="text" name="addressModel" value={addressModel} />
                            </div>
                        </div>
                    </div>
                    <div className="feedback-input">
                        <div className="feedback-btn pb-15">
                            <button
                                className="btn mr-1"
                                style={{ background: "#e80f0f", color: "white" }}
                                onClick={this.addNewAddress}
                            >
                                Thêm địa chỉ mới
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
                <div className='sweet-loading'>
                    <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={30}
                        color={'#796aeebd'}
                        loading={loading}
                    />
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="fix-img-div profile-img">
                            <img id="output" className="fix-img" src={avatar || 'https://i.ibb.co/NCdx7FF/avatar-Default.png'} alt="not found" />
                        </div>
                        <span className="btn btn-default btn-file" style={{ color: '#212529' }}>
                            Chọn thư mục <input onChange={this.handleChangeImage} type="file" />
                        </span>
                    </div>
                    <div className="col-md-8">
                        <div className="profile-head" style={{}}>
                            <h5>
                                {firstName} {lastName}
                            </h5>

                            <p className="proile-rating"></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Cá nhân</a>
                                </li>

                                {
                                    user && user.provider == "GOOGLE" ? null :
                                        <li className="nav-item">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Đổi mật khẩu</a>
                                        </li>
                                }
                                <li className="nav-item">
                                    <a className="nav-link" id="history-tab" data-toggle="tab" href="#history" role="tab" aria-controls="history" aria-selected="false">Quản lý Địa chỉ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">

                            <div className="col-md-12">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <form onSubmit={(event) => this.handleSubmit(event)}>
                                            <div className="row mt-1">
                                                <div className="col-md-3">
                                                    <label>Họ,tên đệm</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <input name="firstName" onChange={this.handleChange} value={firstName} className="form-control form-control-sm" type="text" />
                                                </div>
                                                <div className="col-md-1">
                                                    <label>Tên </label>
                                                </div>
                                                <div className="col-md-4">
                                                    <input name="lastName" onChange={this.handleChange} value={lastName} className="form-control form-control-sm" type="text" />
                                                </div>
                                            </div>

                                            <div className="row mt-1 flex-item-center">
                                                <div className="col-md-3">
                                                    <label>Email</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input disabled value={email} className="form-control form-control-sm" type="text" />
                                                </div>
                                            </div>
                                            <div className="row mt-1 flex-item-center">
                                                <div className="col-md-3">
                                                    <label>Địa chỉ</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input onChange={this.handleChange} name="address" value={address} className="form-control form-control-sm" type="text" />
                                                </div>
                                            </div>
                                            <div className="row mt-1 flex-item-center">
                                                <div className="col-md-3">
                                                    <label>SĐT</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input onChange={this.handleChange} name="phone" value={phone} className="form-control form-control-sm" type="text" />
                                                </div>
                                            </div>
                                            <div className="row mt-2 flex-item-center">
                                                <div className="col-md-3">
                                                </div>
                                                <div className="col-md-3">
                                                    <button style={{ backgroundColor: '#f68169', border: '#0b0bed8c', color: "#fff" }} type="submit" className="btn">Cập nhập</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <form onSubmit={(event) => this.handleSubmitChangePassword(event)} >
                                            <div className="row mb-1">
                                                <div className="col-md-3">
                                                    <label>Mật khẩu</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="password" name="currentPassword" value={currentPassword} onChange={this.handleChange} className="form-control form-control-sm" />
                                                </div>
                                            </div>
                                            <div className="row mb-1">
                                                <div className="col-md-3">
                                                    <label>Mật khẩu mới</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="password" name="newPassword" value={newPassword} onChange={this.handleChange} className="form-control form-control-sm" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label>Nhập lại mật khẩu</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="password" name="reNewPassword" value={reNewPassword} onChange={this.handleChange} className="form-control form-control-sm" />
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-md-3">
                                                </div>
                                                <div className="col-md-3">
                                                    <button style={{ backgroundColor: '#f68169', border: '#0b0bed8c' }} type="submit" className="btn btn-primary">Đôi mật khẩu</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="history" aria-labelledby="history-tab">
                                        <div className="row mb-10" style={{ flexDirection: 'column', border: '#0b0bed8c' }}>
                                            <button className="btn" onClick={(e) => this.openModal(e)}>Thêm địa chỉ mới</button>
                                        </div>
                                        {

                                            listAdresses && listAdresses.length > 0 ? listAdresses.map((item, index) => {

                                                return (
                                                    <ItemAddress ItemAddress={item}></ItemAddress>
                                                )
                                            }) :
                                                <h4 className=' row col-md-12 mt-10 flex-justify-center'>Chưa có địa chỉ</h4>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user,
        listAdresses: state.addresses
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_user: (id, idaccount) => {
            return dispatch(actFetchUserRequset(id, idaccount))
        },
        update_me: (data) => {
            dispatch(actUpdateMeRequset(data))
        },
        change_pw_me: (data) => {
            dispatch(actChangePasswordMeRequset(data))
        },
        fetch_address: (id) => {
            dispatch(actFetchAddressRequest(id))
        },
        add_address: (address) => {
            return dispatch(actAddAddressRequest(address))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)



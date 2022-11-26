import React, { Component } from 'react'

import { connect } from "react-redux";
import AddressItems from './AddressItems';
import {actAddAddressRequest} from  '../../redux/actions/address';
import Modal from "react-modal";
import { toast } from "react-toastify";
import { is_empty } from '../../utils/validations';
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
class BillDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      address: '',
      phoneNumber: '',
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {


  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }
  addNewAddress = async ()=>{
    const {address,phoneNumber,fullname} = this.state
    let customerId = parseInt(localStorage.getItem("_id"));
    if (is_empty(address)|| is_empty(phoneNumber)|| is_empty(fullname)) {
      return toast.error("Vui lòng nhập đầy đủ thông tin");
    }
    const data = {
      deliveryAddress:address,
      phoneNumber,
      customerId,
      fullname
    }
    let res = await this.props.add_address(data)
    
    if(res && res.status === 200)
    {
      console.log("vao roi ne")
      this.setState({
        modalIsOpen: false,
      })
    }

  }
  

  getBillingState = (event) => {
    return this.state; //ref react
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

  showItemAddress(addresses) {
    let result = null
    if (addresses.length > 0) {
      result = addresses.map((address, index) => {
        return (
          <AddressItems key={index} address={address} ></AddressItems>
        );
      });
    }
    return result;
  }


  render() {
    const { address, phoneNumber, modalIsOpen,fullname } = this.state;
    const { addresses } = this.props
    console.log(addresses)
    return (
      <div className="col-lg-10 col-12" style={{ margin: 'auto' }}>
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
                onClick = {this.addNewAddress}
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
        <form>
          <div className="checkbox-form">
            <h3>Thông tin đơn hàng
            </h3>
            <div className="address-page-controll">
              <button className="btn" onClick={(e) => this.openModal(e)}>Thêm địa chỉ mới</button>
              <button className="btn btn-next" onClick={this.props.toggleCheckout} >Bước tiếp theo</button>
            </div>
            <div onChange={this.props.chooseAddress}>
              {
                this.showItemAddress(addresses)
              }
            </div>



          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_address: (address) => {
      return dispatch(actAddAddressRequest(address))
    }
  }
}

export default connect(null, mapDispatchToProps)(BillDetail);

import React, { Component } from 'react'

export default class AddressItems extends Component {

    
    render() {
        const {address} = this.props
        return (
            <div>
                <label className="card" >
                    <input name="plan" className="radio" type="radio" value={address.deliveryAddressId}/>
                    <span className="plan-details">
                        <span className="plan-cost p-0">Tên người nhận : {address.fullname}</span>
                        <span>Địa chỉ : {address.deliveryAddress}</span>
                        <span>Sđt   : {address.phoneNumber}</span>
                    </span>
                </label>
            </div>
        )
    }
}

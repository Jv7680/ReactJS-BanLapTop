import React, { Component } from 'react'
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';
import callApi from '../../utils/apiCaller';
import { startLoading, doneLoading } from '../../utils/loading'
class ActiveRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: this.props.code,
            isActive: false,
            isSuccess:false
        }
    }
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        });
    }
    
    async componentWillMount(){
        const { code } = this.state.code
        console.log(code)
        startLoading();
        const res = await callApi(`registration/activate/${code}`, 'GET',null);
        doneLoading();
        if(res && res.status === 200){
            toast.success('Xác thực thành công')
            this.setState({isActive :true})
        }

    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { code } = this.state.code
        console.log(code)
        startLoading();
        const res = await callApi(`registration/activate/${code}`, 'GET',null);
        doneLoading();
        if(res && res.status === 200){
            toast.success('Xác thực thành công')
            this.setState({isActive :true})
        }
    }

    render() {
        const { code } = this.state.code
        const {isActive} = this.state
        if (isActive ) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12 d-flex justify-content-center">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="row">
                        <div className="col-md-12 mb-20 ">
                            <label>Mã xác thực</label>
                            <input
                                value={code}
                                onChange={this.handleChange}
                                className="mb-0"
                                type="text"
                                name="code"
                                placeholder="Họ tên" />
                        </div>
                        <div className="col-12">
                            <button className="register-button mt-0">Xác nhận</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default (ActiveRegister)

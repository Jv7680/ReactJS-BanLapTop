import React, { Component } from 'react'
import callApi from '../../utils/apiCaller';
import { Redirect, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

import { startLoading, doneLoading } from '../../utils/loading'
const MySwal = withReactContent(Swal);
const override = css`
    display: block;
    margin: 0 auto;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
`;


export default class MoMoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            isSuccess: false,
            mes: '',
            isError: false,
            isloading: true
        }
    }

    async componentWillMount() {
        const { orderid, errorCode } = this.props
        console.log(`đây là orderid ${orderid} ---- ${errorCode}`)
        startLoading();
        const resData = await callApi(`payment/momo/${orderid}?errorCode=${errorCode}`, 'GET')
        console.log("dữ liệu trả về", resData)
        if (resData && resData.status === 200) {
            this.setState({ isSuccess: true, isloading: false, mes: 'Thanh toán thành công' })

            // Swal.fire({
            //     position: 'center',
            //     icon: 'success',
            //     title: 'Thanh toán thành công',
            //     showConfirmButton: false,
            //     timer: 1500
            // })
        }
        if (resData && resData.status === 204) {
            this.setState({ isError: true, isloading: false, mes: 'Thanh toán thất bại' })
            // Swal.fire({
            //     position: 'center',
            //     icon: 'info',
            //     title: `${resData.data}`,
            //     showConfirmButton: false,
            //     timer: 1500
            // })
        }
        doneLoading();

    }

    render() {
        const { isSuccess, isloading, mes, isError } = this.state


        return (
            isloading ?
                <div className="hidden-loading">
                    <div className='sweet-loading'>
                        <ClipLoader
                            css={override}
                            sizeUnit={"px"}
                            size={35}
                            color={'#796aeebd'}
                            loading={isloading}
                        />
                    </div>
                </div>
                :

                <div className='sweet-loading'>
                    <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={35}
                        color={'#796aeebd'}
                        loading={isloading}
                    />
                    {
                        isSuccess ?
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="error-wrapper text-center ptb-50 pt-xs-20">
                                        <div>
                                            <i class="fa-solid fa-cart-circle-check"></i>
                                            <h1>Cảm ơn quý khách.</h1>
                                        </div>
                                        <div>
                                            <h1>{mes}</h1>
                                        </div>
                                        <div>
                                            <p>
                                                <i>
                                                    Vui lòng xem email để xem chi tiết.
                                                </i>
                                                <Link to='/' className="ml-3">Tiếp tục mua hàng</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                    {
                        isError ?
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="error-wrapper text-center ptb-50 pt-xs-20">
                                        <div>
                                            <i class="h1 fa-solid fa-circle-exclamation"></i>
                                            <h1>{mes}</h1>
                                        </div>
                                        <div>
                                            <p>
                                                <Link to='/' className="ml-3">Tiếp tục mua hàng</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null

                    }
                </div>




        )
    }
}

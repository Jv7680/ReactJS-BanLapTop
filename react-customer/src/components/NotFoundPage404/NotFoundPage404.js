import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NotFoundPage404 extends Component {
    render() {
        return (
            <div className="error404-area pt-30 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="error-wrapper text-center ptb-50 pt-xs-20">
                                <div className="error-text">
                                    <h1>404</h1>
                                    <h2>Lỗi !Không tìm thấy trang</h2>
                                    <p>Xin lỗi bạn ! trang của bạn không tìm thấy hoặc<br /> Tên đã bị thay đổi hay bị Xóa</p>
                                </div>
                                <div className="error-button">
                                    <Link to="/">Trở về trang chủ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

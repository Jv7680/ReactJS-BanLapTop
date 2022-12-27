import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { actFetchCategoriesRequest } from '../../redux/actions/category';
import { actGetProductOfCategoryRequest } from '../../redux/actions/products';
import { startLoading, doneLoading } from '../../utils/loading'
import { NavLink } from "react-router-dom";


class HeaderBottom extends Component {

  componentDidMount() {
    //tạm đóng vì chưa có api
    //this.props.fetchAllcategories();
  }

  loaddingPage = () => {
    startLoading();
    doneLoading();
  }
  getCategory = async (name) => {
    startLoading();
    console.log("tên gửi đi", name)
    await this.props.getAllProductOfCategory(name);
    doneLoading();
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="header-bottom header-sticky d-lg-block d-xl-block" >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hb-menu">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                  {/* <Link className="navbar-brand" to="/"><img src="https://i.ibb.co/t8T3s70/icons8-home-30.png" alt="not found" style={{height: 30, width: 30}}/></Link> */}
                  <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      <li className="nav-item px-3 ">
                        <NavLink className="nav-link" to="/" exact={true}>Trang chủ</NavLink>
                      </li>
                      <li className="nav-item px-3 ">
                        <NavLink className="nav-link" to="/products" exact={true}>Sản phẩm</NavLink>
                      </li>
                      <li className="nav-item px-3 ">
                        <NavLink className="nav-link" to="/news" exact={true}>Tin tức</NavLink>
                      </li>
                      <li className="nav-item px-3">
                        <NavLink className="nav-link" to="/about" exact={true}>Về chúng tôi</NavLink>
                      </li>
                      <li className="nav-item px-3">
                        <NavLink className="nav-link" to="/contact" exact={true}>Liên hệ</NavLink>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllcategories: () => {
      dispatch(actFetchCategoriesRequest());
    },
    getAllProductOfCategory: (name) => {
      dispatch(actGetProductOfCategoryRequest(name));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBottom);

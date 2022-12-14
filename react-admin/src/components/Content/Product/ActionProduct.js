import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { actAddProductRequest, actEditProductRequest } from '../../../redux/actions/product';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import callApi from '../../../utils/apiCaller';
import { uploadImage } from '../../../utils/upload'
import Dropzone from 'react-dropzone';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import validateProduct from '../../../utils/validations/validateProduct';

let token;
let id;
const override = css`
    display: block;
    margin: 0 auto;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
`;
class ActionProduct extends Component {

  constructor(props) {
    super(props);
    this.onDrop = (files) => {
      let data = this.state.filesImage
      data = data.concat(files)

      this.setState({
        filesImage: data
      })
    };

    this.state = {
      productName: '',
      quantity: 0,
      productImageSet: [],
      filesImage: [],
      discount: 0,
      unitPrice: 0,
      descriptionProduct: '',
      dataCategories: [],
      dataSupplieres: [],
      categoryId: 1,
      supplierId: 1,
      image: '',
      renderImageLink: false,
      // hình để đưa ra giao diện
      redirectToProduct: false,
      loading: false,
    };

    //id của sản phẩm
    id = this.props.id
  }

  async componentDidMount() {
    let token = localStorage.getItem('_auth');
    if (id) {
      const res = await callApi(`product/${id}`, 'GET', null, token);
      if (res && res.status === 200) {
        console.log("dữ liệu trả về", res.data)
        this.setState({
          productName: res.data.productName,
          quantity: res.data.quantity,
          productImageSet: [res.data.image],
          discount: res.data.discount,
          unitPrice: res.data.unitprice,
          descriptionProduct: res.data.description,
          image: res.data.image,
          //categoryId: res.data.categoryFKDto.categoryId,
          //supplierId: res.data.supplierFKDto.supplierId,

        })

        //đưa ảnh hiện tại vào imgLinkCheckOld
        setTimeout(() => {
          let { image } = this.state;
          document.getElementById('imgLinkCheckOld').attributes.src.nodeValue = image;
        }, 100);
      }
    }

    //Chưa có api
    // const resCategories = await callApi('category/all', 'GET');
    // if (resCategories && resCategories.status === 200) {
    //   this.setState({
    //     dataCategories: resCategories.data
    //   })
    // }
    //console.log("dữ liệu trả về 2", resCategories.data)

    const resSupplieres = await callApi('admin/supplier/all', 'GET', null, token);
    console.log("dữ liệu trả về suplier", resSupplieres.data)
    if (resSupplieres && resSupplieres.status === 200) {
      this.setState({
        dataSupplieres: resSupplieres.data
      })
    }

    //console.log("dữ liệu trả về 3", resSupplieres.data)

  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleCheckImage = (event) => {
    let { image, renderImageLink } = this.state;
    console.log('imageLink là:', image);

    //Check lỗi độ dài
    if (!validateProduct.image(image)) {
      return false;
    }

    this.setState({
      renderImageLink: true,
    });

    setTimeout(() => {
      document.getElementById('imgLinkCheck').attributes.src.nodeValue = image;
    }, 100);

  }

  handleChangeSelecProducer = (event) => {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      supplierId: value
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
  handleChangeEditor = (value) => {
    this.setState({ descriptionProduct: value })
  }
  removeImage = (id, isImage) => {
    let { productImageSet, filesImage } = this.state
    if (isImage) {
      productImageSet.splice(id, 1)
      this.setState({
        productImageSet
      })
    }
    else {


      filesImage.splice(id, 1)
      console.log("vaof rooif", filesImage)

      this.setState({
        filesImage
      })
    }

  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      productName,
      quantity,
      discount,
      unitPrice,
      descriptionProduct,
      categoryId,
      supplierId,
      filesImage,
      productImageSet
    } = this.state;

    const newProductName = productName === '' ? '' : productName;
    const newQuantity = parseInt(quantity);
    const newDiscount = parseInt(discount);
    const newUnitPrice = parseInt(unitPrice);
    const newDescriptionProduct = descriptionProduct === '' ? '' : descriptionProduct;
    const newCategoryId = parseInt(categoryId);
    const newSupplierId = parseInt(supplierId);
    const { image } = this.state;

    //check lỗi
    if (!validateProduct.name(newProductName) || !validateProduct.unitprice(newUnitPrice) || !validateProduct.discount(newDiscount) || !validateProduct.quantity(newQuantity) || !validateProduct.description(newDescriptionProduct) || !validateProduct.image(image)) {
      return;
    }

    const addNewProduct = {
      "productName": newProductName,
      "quantity": newQuantity,
      "image": image,
      "unitprice": newUnitPrice,
      "discount": newDiscount,
      "description": newDescriptionProduct,
      "supplierId": newSupplierId
    }

    const newProduct = {
      "productId": parseInt(id),
      "productName": newProductName,
      "quantity": newQuantity,
      "image": image,
      "unitprice": newUnitPrice,
      "discount": newDiscount,
      "description": newDescriptionProduct,
      "supplierId": newSupplierId
    }

    this.setState({
      loading: true
    })

    if (!id) {
      console.log('addNewProduct: ', addNewProduct);
      await this.props.add_Product(addNewProduct);
      this.setState({
        loading: false,
        redirectToProduct: true
      })

    }
    else {
      // let checkImage = this.handleCheckImage(null);
      // if (!checkImage) {
      //   return;
      // }

      console.log('newProduct: ', newProduct);
      await this.props.edit_Product(id, newProduct);
      this.setState({
        loading: false,
        redirectToProduct: true
      })

    }
  }
  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  render() {
    //const { productName, quantity, productImageSet, filesImage, discount, unitPrice, descriptionProduct, dataSupplieres, categoryId, dataCategories, supplierId, loading, redirectToProduct } = this.state;
    const { productName, quantity, productImageSet, filesImage, discount, unitPrice, descriptionProduct, dataSupplieres, categoryId, dataCategories, supplierId, image, renderImageLink, loading, redirectToProduct } = this.state;
    console.log(productName);
    if (redirectToProduct) {
      return <Redirect to='/products'></Redirect>
    }
    console.log(productImageSet)
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <div className='sweet-loading'>
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={30}
            color={'#796aeebd'}
            loading={loading}
          />
        </div>
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Trang sản phẩm</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
            <li className="breadcrumb-item"><Link to="/products">Sản phẩm</Link></li>
            {
              !id ?
                <li className="breadcrumb-item active">thêm sản phẩm</li>
                : <li className="breadcrumb-item active"> Sửa sản phẩm</li>
            }

          </ul>
        </div>
        {/* Forms Section*/}
        <section className="forms">
          <div className="container-fluid">
            <div className="row">
              {/* Form Elements */}
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h3 className="h4">Thông tin sản phẩm</h3>
                  </div>
                  <div className="card-body">
                    <form className="form-horizontal" onSubmit={(event) => this.handleSubmit(event)} >
                      {/* tên sản phẩm */}
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Tên sản phẩm</label>
                        <div className="col-sm-9">
                          <input
                            onChange={this.handleChange}
                            value={productName}
                            name="productName"
                            type="text"
                            className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      {/* giá, số lượng */}
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Giá</label>
                        <div className="col-sm-3">
                          <input
                            onChange={this.handleChange}
                            value={unitPrice}
                            name="unitPrice"
                            type="number"
                            className="form-control" />
                        </div>
                        <label className="col-sm-3 form-control-label" style={{ textAlign: 'center' }}>Số lượng</label>
                        <div className="col-sm-3">
                          <input
                            onChange={this.handleChange}
                            value={quantity}
                            name="quantity"
                            type="number"
                            className="form-control" />
                        </div>
                        <label className="col-sm-3 form-control-label" >Giảm giá</label>
                        <div className="col-sm-3">
                          <input
                            onChange={this.handleChange}
                            value={discount}
                            name="discount"
                            type="number"
                            className="form-control" />
                        </div>
                      </div>


                      <div className="line" />
                      {/* mô tả */}
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Mô tả</label>
                        <div className="col-sm-9">
                          <ReactQuill
                            modules={this.modules}
                            formats={this.formats}
                            value={descriptionProduct}
                            onChange={this.handleChangeEditor}
                          />
                        </div>
                      </div>
                      <div className="line" />
                      {/* loại sản phẩm */}
                      {/* <div className="form-group row">
                        <label
                          className="col-sm-3 form-control-label">
                          Loại sản phẩm
                        </label>
                        <div className="col-sm-9">
                          {dataCategories && dataCategories.length ?
                            dataCategories.map((item, index) => {
                              return (
                                <div key={item.categoryId}
                                  className="i-checks"
                                  style={{ display: 'inline-block', paddingRight: 35 }} >
                                  {
                                    item.categoryId === categoryId ?
                                      <input
                                        id={item.categoryId}
                                        name="categoryId"
                                        checked
                                        // value={categoryId}
                                        onChange={this.handleChange}
                                        type="radio"
                                        value={item.categoryId}
                                        className="radio-template" />
                                      :
                                      <input
                                        id={item.categoryId}
                                        name="categoryId"
                                        // value={categoryId}
                                        onChange={this.handleChange}
                                        type="radio"
                                        value={item.categoryId}
                                        className="radio-template" />
                                  }
                                  <label>{item.categoryName}</label>
                                </div>
                              )
                            })
                            : null
                          }
                        </div>
                      </div> */}
                      <div className="line" />
                      {/* nhà cung cấp */}
                      <div className="form-group row">
                        <label
                          className="col-sm-3 form-control-label">
                          Nhà cung cấp
                        </label>
                        <div className="col-sm-9">
                          <select className="form-control mb-3" name="supplierId" value={supplierId} onChange={this.handleChangeSelecProducer}>
                            {
                              dataSupplieres && dataSupplieres.length ? dataSupplieres.map((item, index) => {
                                return (
                                  <option key={item.supplierId} value={item.supplierId} >{item.supplierName}</option>
                                )
                              }) : null
                            }
                          </select>
                        </div>
                      </div>
                      <div className="line" />

                      {/* image */}
                      <div className="form-group row">
                        <label htmlFor="fileInput" className="col-sm-3 form-control-label">Ảnh</label>
                        <div className="col-9 col-sm-9" >
                          {/* <Dropzone onDrop={this.onDrop}>
                            {({ getRootProps, getInputProps }) => (
                              <section style={{ border: '1px dotted' }}>
                                <div {...getRootProps({ className: 'dropzone' })}>
                                  <input {...getInputProps()} />
                                  <h2 className='ml-3'>Chọn ảnh tại đây!!!</h2>
                                </div>
                                <aside>

                                  <div>
                                    {
                                      productImageSet && productImageSet.length > 0 ?
                                        productImageSet.map((itemImage, index) => {
                                          return (
                                            < span key={index}>
                                              <div className='model m-3'>
                                                <div className="modal-content">
                                                  <div className="modal-header">
                                                    <button type="button"
                                                      onClick={() => this.removeImage(index, true)}
                                                      className="close_button" >
                                                      <span aria-hidden="true">&times;</span>
                                                    </button>
                                                  </div>
                                                  <img src={itemImage} style={{ height: 100, width: 100 }} alt="notfound" />
                                                </div>
                                              </div>
                                            </span>
                                          )
                                        })
                                        : null
                                    }
                                  </div>
                                </aside>
                              </section>
                            )}
                          </Dropzone> */}

                          {/* Xử lý image */}
                          <input
                            type="text"
                            onChange={this.handleChange}
                            value={image}
                            name="image"
                            className="form-control"
                            style={{ width: "89%", display: "inline" }}
                          />
                          <button
                            className="btn btn-primary"
                            type='button'
                            onClick={(event) => { this.handleCheckImage(event) }}
                            style={{ margin: "0 5px" }}
                          >
                            Check
                          </button>
                          {/* Dành cho edit sản phẩm */}
                          {
                            this.props.id ?
                              (
                                <p>
                                  <img
                                    id='imgLinkCheckOld'
                                    src="" alt="not found"
                                    style={{
                                      width: "200px",
                                      marginRight: "50px"
                                    }}
                                  />
                                  <span style={{ fontSize: "20px", color: "#5f68df" }}>(Ảnh Hiện Tại)</span>
                                </p>
                              )
                              :
                              (
                                null
                              )
                          }
                          {
                            !renderImageLink ?
                              (
                                null
                              )
                              :
                              (
                                <p>
                                  <img
                                    id='imgLinkCheck'
                                    src="" alt="not found"
                                    style={{
                                      width: "200px",
                                      marginRight: "50px"
                                    }}
                                  />
                                  <span style={{ fontSize: "20px", color: "#5f68df" }}>(Ảnh Mới)</span>
                                </p>
                              )
                          }


                        </div>
                      </div>
                      {/* chức năng */}
                      <div className="form-group row">
                        <div className="col-sm-4 offset-sm-3">
                          <Link to='/products' type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Thoát</Link>
                          <button type="submit" className="btn btn-primary">Lưu</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </section >
        {/* Page Footer*/}

      </div >
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_Product: (newProduct) => {
      dispatch(actAddProductRequest(newProduct))
    },
    edit_Product: (id, data) => {
      dispatch(actEditProductRequest(id, data))
    }
  }
}

export default connect(null, mapDispatchToProps)(ActionProduct)
import React, { Component } from 'react'
import Slider from '../components/HomePage/Slider/Slider'
import TopDiscountProduct from '../components/HomePage/Content/TopDiscountProduct/TopDiscountProduct'
import TopTreddingProduct from '../components/HomePage/Content/TrenddingProduct/TopTreddingProduct'
export default class HomPage extends Component {
    render() {
        return (
            <div>
                 <Slider></Slider>
                 <TopDiscountProduct></TopDiscountProduct>
                 <TopTreddingProduct></TopTreddingProduct>
            </div>
        )
    }
}

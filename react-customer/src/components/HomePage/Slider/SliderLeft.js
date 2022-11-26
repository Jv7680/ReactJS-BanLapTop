import React, { Component } from 'react'
import Slider from 'react-slick'

export default class SliderLeft extends Component {

  render() {
    const dataslide = [
      {
        img: "/images/slider/slideshow_4.jpg"
      },
      {
        img: "./images/slider/slideshow_6.jpg"
      },
      {
        img: "./images/slider/slideshow_14.jpg"
      }
    ]


    return (

      <div className="col-lg-8 col-md-8">
        <div className="slider-area">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {dataslide.map(item => {
                return (
                  <div className="carousel-item">
                    <img className="d-block w-100" src={item.img} alt="First slide" />
                  </div>
                )
              })}
              <div className="carousel-item active">
                <img className="d-block w-100" src="./images/slider/slideshow_3.jpg" alt="First slide" />
              </div>
              
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>

    )
  }
}

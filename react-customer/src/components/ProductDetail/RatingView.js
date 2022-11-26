


import React, { Component } from "react";


import "react-toastify/dist/ReactToastify.css";

import BeautyStars from "beauty-stars";
import { is_empty } from "../../utils/validations";



export default class RatingView extends Component {

  render() {
    const { rating, listReviews } = this.props;
    let count = 0;
    let showFixRating = "0";
    let oneStart = 0;
    let twoStart = 0;
    let threeStart = 0;
    let fourStart = 0;
    let fiveStart = 0;
    let showOneStart = 0;
    let showTwoStart = 0;
    let showThreeStart = 0;
    let showFourStart = 0;
    let showFiveStart = 0;
    showFixRating = is_empty(rating) ? 0 : rating;
    if (listReviews && listReviews.length > 0) {
      listReviews.forEach(item => {
        if (item.rating === 1) {
          oneStart++;
        }
        if (item.rating === 2) {
          twoStart++;
        }
        if (item.rating === 3) {
          threeStart++;
        }
        if (item.rating === 4) {
          fourStart++;
        }
        if (item.rating === 5) {
          fiveStart++;
        }
        count++;
      })
      showOneStart = ((oneStart / count) * 100).toFixed(0);
      showTwoStart = ((twoStart / count) * 100).toFixed(0);
      showThreeStart = ((threeStart / count) * 100).toFixed(0);
      showFourStart = ((fourStart / count) * 100).toFixed(0);
      showFiveStart = ((fiveStart / count) * 100).toFixed(0);

    }

    return (
      <div className="container mt-2">
        <div className="row">
          <div className="col-sm-6">
            <div className="rating-block">
              <h5>Đánh giá sản phẩm</h5>
              <h2 className="bold padding-bottom-7">
                {showFixRating}
                <small>/ 5</small>
              </h2>
              <div>
                <BeautyStars
                  size={12}
                  editable={false}
                  activeColor={"#ed8a19"}
                  inactiveColor={"#c1c1c1"}
                  value={showFixRating}
                />
              </div>
            </div>
          </div>


          <div className="col-sm-3">
            <div className="pull-left">
              <div
                className="pull-left"
                style={{ width: "35px", lineHeight: 1 }}
              >
                <div style={{ height: "9px", margin: "5px 0" }}>
                  {" "}
                  <img
                    src="https://i.ibb.co/2KKnLBh/148839.png"
                    style={{ height: 15 }}
                    alt="not found"
                  />{" "}
                  5 <span className="glyphicon glyphicon-star" />
                </div>
              </div>
              <div className="pull-left" style={{ width: "180px" }}>
                <div
                  className="progress"
                  style={{ height: "9px", margin: "8px 0" }}
                >
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuenow={5}
                    aria-valuemin={0}
                    aria-valuemax={5}
                    style={{ width: `${showFiveStart}%` }}

                  >
                    <span className="sr-only">
                      80% Complete (danger)
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="pull-right"
                style={{ marginLeft: "10px" }}
              >
                {fiveStart}
              </div>
            </div>
            <div className="pull-left">
              <div
                className="pull-left"
                style={{ width: "35px", lineHeight: 1 }}
              >
                <div style={{ height: "9px", margin: "5px 0" }}>
                  {" "}
                  <img
                    src="https://i.ibb.co/2KKnLBh/148839.png"
                    style={{ height: 15 }}
                    alt="not found"
                  />{" "}
                  4 <span className="glyphicon glyphicon-star" />
                </div>
              </div>
              <div className="pull-left" style={{ width: "180px" }}>
                <div
                  className="progress"
                  style={{ height: "9px", margin: "8px 0" }}
                >
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuenow={5}
                    aria-valuemin={0}
                    aria-valuemax={5}
                    style={{ width: `${showFourStart}%` }}

                  >
                    <span className="sr-only">
                      80% Complete (danger)
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="pull-right"
                style={{ marginLeft: "10px" }}
              >
                {fourStart}
              </div>
            </div>
            <div className="pull-left">
              <div
                className="pull-left"
                style={{ width: "35px", lineHeight: 1 }}
              >
                <div style={{ height: "9px", margin: "5px 0" }}>
                  {" "}
                  <img
                    src="https://i.ibb.co/2KKnLBh/148839.png"
                    style={{ height: 15 }}
                    alt="not found"
                  />{" "}
                  3 <span className="glyphicon glyphicon-star" />
                </div>
              </div>
              <div className="pull-left" style={{ width: "180px" }}>
                <div
                  className="progress"
                  style={{ height: "9px", margin: "8px 0" }}
                >
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuenow={5}
                    aria-valuemin={0}
                    aria-valuemax={5}
                    style={{ width: `${showThreeStart}%` }}

                  >
                    <span className="sr-only">
                      80% Complete (danger)
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="pull-right"
                style={{ marginLeft: "10px" }}
              >
                {threeStart}
              </div>
            </div>
            <div className="pull-left">
              <div
                className="pull-left"
                style={{ width: "35px", lineHeight: 1 }}
              >
                <div style={{ height: "9px", margin: "5px 0" }}>
                  {" "}
                  <img
                    src="https://i.ibb.co/2KKnLBh/148839.png"
                    style={{ height: 15 }}
                    alt="not found"
                  />{" "}
                  2 <span className="glyphicon glyphicon-star" />
                </div>
              </div>
              <div className="pull-left" style={{ width: "180px" }}>
                <div
                  className="progress"
                  style={{ height: "9px", margin: "8px 0" }}
                >
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuenow={5}
                    aria-valuemin={0}
                    aria-valuemax={5}
                    style={{ width: `${showTwoStart}%` }}

                  >
                    <span className="sr-only">
                      80% Complete (danger)
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="pull-right"
                style={{ marginLeft: "10px" }}
              >
                {twoStart}
              </div>
            </div>
            <div className="pull-left">
              <div
                className="pull-left"
                style={{ width: "35px", lineHeight: 1 }}
              >
                <div style={{ height: "9px", margin: "5px 0" }}>
                  {" "}
                  <img
                    src="https://i.ibb.co/2KKnLBh/148839.png"
                    style={{ height: 15 }}
                    alt="not found"
                  />{" "}
                  1 <span className="glyphicon glyphicon-star" />
                </div>
              </div>
              <div className="pull-left" style={{ width: "180px" }}>
                <div
                  className="progress"
                  style={{ height: "9px", margin: "8px 0" }}
                >
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuenow={5}
                    aria-valuemin={0}
                    aria-valuemax={5}
                    style={{ width: `${showOneStart}%` }}

                  >
                    <span className="sr-only">
                      80% Complete (danger)
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="pull-right"
                style={{ marginLeft: "10px" }}
              >
                {oneStart}
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

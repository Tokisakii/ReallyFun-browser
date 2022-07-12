import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper";
import "swiper/swiper-bundle.min.css";

export default class ReactSwiper extends Component {
  render() {
    return (
      <div
        className="swiper-container"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ width: "100%", height: "100%" }}
      >
        <div className="swiper-wrapper">
          <div
            className="swiper-slide"
            style={{ backgroundColor: "green", justifyContent: "center", alignItems: "center" }}
          >
            Slide 1
          </div>
          <div
            className="swiper-slide"
            style={{ backgroundColor: "green", justifyContent: "center", alignItems: "center" }}
          >
            Slide 2
          </div>
          <div
            className="swiper-slide"
            style={{ backgroundColor: "green", justifyContent: "center", alignItems: "center" }}
          >
            Slide 3
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    /* eslint-disable */
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });
  }
}

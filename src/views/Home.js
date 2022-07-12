import React from "react";
import Container from "@mui/material/Container";
import ReactSwiper from "../components/ReactSwiper";

export default class Home extends React.Component {
  render() {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <div>
          {/* <ReactSwiper>
              <div className="swiper-slide">
                <img src="public\image\banner1.jpg" alt="" />
              </div>
              <div className="swiper-slide">
                <img src="public\image\banner2.jpg" alt="" />
              </div>
              <div className="swiper-slide">
                <img src="public\image\banner3.jpg" alt="" />
              </div>
            </ReactSwiper> */}
          <ReactSwiper />
          {/* <div className="swiper-slide">11111</div>
            <div className="swiper-slide">22222</div>
            <div className="swiper-slide">33333</div>
          </ReactSwiper> */}
        </div>
      </Container>
    );
  }
}

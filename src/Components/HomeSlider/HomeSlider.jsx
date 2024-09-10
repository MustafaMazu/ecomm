import React from "react";
import Slider from "react-slick";

import bag from "./../../assets/images/bag.jpg";
import baby from "./../../assets/images/baby.jpg";
import bags from "./../../assets/images/bags.jpg";
import guitar from "./../../assets/images/guitar.jpg";
import necklace from "./../../assets/images/necklace.jpg";

export default function HomeSlider() {
    
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <section className="pb-5">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-2/3 ">
          <Slider {...settings}>
            <div>
              <img src={bag} className=" m-auto h-[500px]  object-fill" alt="" />
            </div>
            <div>
              <img src={baby} className=" object-fill m-auto h-[500px] " alt="" />
            </div>
            <div>
              <img src={necklace} className="m-auto h-[500px] object-fill" alt="" />
            </div>
          </Slider>
        </div>

        <div className="w-1/3">
          <div>
            {" "}
            <img src={bags} className="object-cover w-full h-[250px]" alt="" />
          </div>

          <div>
            <img src={guitar} className="object-cover w-full h-[250px]"  alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

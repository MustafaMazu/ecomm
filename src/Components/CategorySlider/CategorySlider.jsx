import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {


   async function getAllCategory(){
       return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

   const {data} =  useQuery("CategorySlider", getAllCategory)

   console.log(data);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
  <section className="p-5"> 
    
    <Slider {...settings}>
    {data?.data.data.map(function(item, idx){
        return <div key={idx}>
            <img src={item.image} className="w-full h-[200px]" alt="" />
            <h2 className="text-green-400 text-2xl text-center font-bold">{item.name}</h2>
        </div>
    }
)}
    </Slider>
  </section>
  );
}
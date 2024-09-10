
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const Brand = () => {
  async function getAllBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data } = useQuery("CategorySlider", getAllBrands);

  console.log(data);

  return (
    <section className="p-8">
      <div className="w-full md:w-[90%] m-auto mt-12 ">
        <div className="flex flex-wrap justify-around items-center   ">
          {data?.data.data.map(function (item, idx) {
            return (
              <div
                className="w-full md:w-[24%]  border-solid border-2 hover:border-green-400  hover:shadow-2xl transition-all duration-500 mx-auto  p-2 mb-3"
                key={idx}
              >
                <div className="p-1 inner m-3" >
                  {" "}
                  <img src={item.image} className="w-full h-[200px]  mb-4" alt="" />
                 <p className=" text-1xl text-center ">
                   {item.name}
                   </p>
                </div>
              </div>
            );
           
          })}
          
        </div>
      </div>
    </section>
  );
};

export default Brand;
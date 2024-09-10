import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const Category = () => {
  const [subCategory, setSubCategory] = useState([]);
  async function getAllCategory() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  async function getSubCategory(id) {
    const data = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );

    setSubCategory(data.data.data);
  }

  const { data } = useQuery("Category", getAllCategory, {});

  return (
    <section className="p-10 ">
      <div className="w-full md:w-[90%] m-auto py-6 mt-5">
        <div className="flex flex-wrap justify-around items-center   ">
          {data?.data.data.map(function (item, idx) {
            return (
              <div
                key={idx}
                onClick={() => getSubCategory(item._id)}
                className="w-full md:w-[32%]   mx-auto space-x-2 p-4 mb-5"
              >
                <div className=" inner m-3">
                  {" "}
                  <img
                    src={item.image}
                    className="w-full h-[350px]  mb-4"
                    alt=""
                  />
                  <h2 className="text-green-400 text-2xl text-center font-bold">
                    {item.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full md:w-[90%] m-auto py-6 mt-5">
       
        <div className="flex flex-wrap justify-around items-center   ">
          {subCategory.length > 0 &&
            subCategory?.map(function (item, idx) {
              return (
               
                <div
                  key={idx}
                  className="w-full md:w-[32%] border  mx-auto space-x-2 p-4 mb-5"
                >
                
                  <div className=" inner m-3">
                    {" "}
                    <h2 className=" text-2xl text-center font-bold">
                      {item.name}
                    </h2>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Category;

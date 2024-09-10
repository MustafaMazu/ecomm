import axios from "axios";
import { useQuery } from "react-query";

const SubCategory = () => {
  async function getSubCategory() {
    return await axios.get(
      "https://ecommerce.routemisr.com/api/v1/subcategories"
    );
  }

  const { data } = useQuery("SubCategory", getSubCategory);

  console.log(data);
  return (
    <section className="py-10">
      <div className="w-full md:w-[90%] m-auto py-6 mt-5">
        <div className="flex flex-wrap justify-around items-center   ">
          {data?.data.data.map(function (item, idx) {
            return (
              <div
                key={idx}
                className="w-full md:w-[32%]   mx-auto space-x-2 p-4 mb-5"
              >
                <div className=" inner m-3">
                  {" "}
                 
                  <h2 className="text-green-400 text-2xl text-center font-bold">
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

export default SubCategory;

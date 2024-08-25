// import React, { useEffect, useState } from "react";
// import axiosClient from "../axiosClient";
// import nopic from "../assets/images/9264822.jpg";
// const AllItems = ({ filters }) => {
//   const [allItems, setAllItem] = useState(null);
//   const [isloading, setisloading] = useState(true);
//   useEffect(() => {
//     // Destructure filters object
//     const { gender, age, category, price, search } = filters;

//     // Construct the query params
//     const queryParams = new URLSearchParams();
//     if (gender) {
//       queryParams.append("gender", gender);
//     }
//     if (age) queryParams.append("age", age);
//     if (category) queryParams.append("category", category);
//     if (price) queryParams.append("price", price);
//     if (search) queryParams.append("search", search);

//     // Fetch filtered items
//     axiosClient
//       .get(`/viewAllProducts?${queryParams.toString()}`)
//       .then((res) => {
//         setAllItem(res.data.products);
//         setisloading(false);
//       });
//   }, [filters]);

//   return (
//     <div>
//       <div className="flex w-[100%] justify-center gap-3 flex-wrap  mr-[-200px]">
//         {!isloading &&
//           allItems &&
//           allItems.map((el) => (
//             <div key={el.id} className="h-[300px] bg-blue-200 w-[250px]">
//               <img
//                 src={`http://localhost:8000/storage/${el.thumbnail}`}
//                 className="h-[100%] w-[100%]"
//                 alt={el.name} // Added alt attribute for accessibility
//               />
//             </div>
//           ))}
//         {!isloading && allItems.length == 0 && (
//           <div>
//             <img src={nopic} alt="not found" className="h-[300px]" />
//             <h2> Not found</h2>
//           </div>
//         )}
//         {isloading && "loading.."}
//       </div>
//     </div>
//   );
// };

// export default AllItems;
import React, { useEffect, useState } from "react";
import axios from "axios";
import nopic from "../assets/images/9264822.jpg";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";

const AllItems = ({ filters }) => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosClient.get("/viewAllProducts", {
          params: {
            gender: filters.gender,
            age: filters.age,
            category: filters.category,
            price: filters.price,
          },
        });
        setAllItems(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [filters]);

  useEffect(() => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const results = allItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
      setFilteredItems(results);
    } else {
      setFilteredItems(allItems);
    }
  }, [allItems, filters.search]);

  return (
    <div className="relative z-0">
      {/* Container for items */}
      <div className="flex flex-wrap justify-center gap-3 overflow-auto min-w-full max-w-full">
        {!isLoading && filteredItems.length > 0 ? (
          filteredItems.map((el) => (
            <div key={el.id} className="h-[350px] w-[200px] overflow-hidden">
              <Link to={`/singleitem/${el.id}`}>
                <img
                  src={`http://localhost:8000/storage/${el.thumbnail}`}
                  className="h-[100%] w-[100%] object-contain "
                  alt={el.title}
                />
              </Link>
              <p>No elment was found</p>
            </div>
          ))
        ) : !isLoading && filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full overflow-hidden">
            <img
              src={nopic}
              alt="not found"
              className="h-[100px] md:h-[200px]"
            />
            <h2 className="mt-4 text-red-600 md:text-3xl">Not found</h2>
          </div>
        ) : (
          <div className="w-full text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default AllItems;

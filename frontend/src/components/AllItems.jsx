// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import nopic from "../assets/images/9264822.jpg";
// import axiosClient from "../axiosClient";
// import { Link } from "react-router-dom";

// const AllItems = ({ filters }) => {
//   const [allItems, setAllItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axiosClient.get("/viewAllProducts", {
//           params: {
//             gender: filters.gender,
//             age: filters.age,
//             category: filters.category,
//             price: filters.price,
//           },
//         });
//         setAllItems(response.data.products);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchItems();
//   }, [filters]);

//   useEffect(() => {
//     if (filters.search) {
//       const searchTerm = filters.search.toLowerCase();
//       const results = allItems.filter((item) =>
//         item.title.toLowerCase().includes(searchTerm)
//       );
//       setFilteredItems(results);
//     } else {
//       setFilteredItems(allItems);
//     }
//   }, [allItems, filters.search]);

//   return (
//     <div className="relative z-0">
//       {/* Container for items */}
//       <div className="flex flex-wrap justify-center gap-3 overflow-auto min-w-full max-w-full">
//         {!isLoading && filteredItems.length > 0 ? (
//           filteredItems.map((el) => (
//             <div key={el.id} className="h-[350px] w-[200px] overflow-hidden">
//               <Link to={`/singleitem/${el.id}`}>
//                 <img
//                   src={`http://localhost:8000/storage/${el.thumbnail}`}
//                   className="h-[100%] w-[100%] object-contain "
//                   alt={el.title}
//                 />
//               </Link>
//               <p>No elment was found</p>
//             </div>
//           ))
//         ) : !isLoading && filteredItems.length === 0 ? (
//           <div className="flex flex-col items-center justify-center w-full overflow-hidden">
//             <img
//               src={nopic}
//               alt="not found"
//               className="h-[100px] md:h-[200px]"
//             />
//             <h2 className="mt-4 text-red-600 md:text-3xl">Not found</h2>
//           </div>
//         ) : (
//           <div className="w-full text-center">Loading...</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllItems;
import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import nopic from "../assets/images/9264822.jpg";

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
      <div className="flex flex-wrap justify-center gap-6 overflow-auto min-w-full max-w-full p-4 overflow-hidden">
        {!isLoading && filteredItems.length > 0 ? (
          filteredItems.map((el) => (
            <motion.div
              key={el.id}
              className="h-[350px] w-[200px] overflow-hidden rounded-lg shadow-lg bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1 * (el.id % 10),
              }}
              whileHover={{
                y: -3,
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Link
                to={`/singleProduct/${el.id}`}
                className="h-full w-full block"
              >
                <img
                  src={`http://localhost:8000/storage/${el.thumbnail}`}
                  className="h-full w-full object-cover rounded-t-lg"
                  alt={el.title}
                />
              </Link>
              <p className="mt-2 text-center text-sm text-gray-700 font-semibold">
                {el.title}
              </p>
            </motion.div>
          ))
        ) : !isLoading && filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-10">
            <img
              src={nopic}
              alt="Not found"
              className="h-[100px] md:h-[200px] object-contain transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <h2 className="mt-6 text-gray-700 text-lg md:text-3xl font-semibold animate-pulse">
              Oops! No items found.
            </h2>
            <p className="mt-2 text-gray-500 text-center md:text-lg">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        ) : (
          <div className="w-full text-center text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default AllItems;

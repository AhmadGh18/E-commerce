import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../../axiosClient"; // Import your axios client
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditItems = () => {
  const [allItems, setAllItems] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(null); // Track which item's menu to show
  const menuRef = useRef(null); // Ref for the menu container
  const navigate = useNavigate(); // Correct usage of useNavigate

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get("/viewAllProducts");
        setAllItems(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  //   useEffect(() => {
  //     // Hide the menu if clicking outside of it
  //     const handleClickOutside = (event) => {
  //       if (menuRef.current && !menuRef.current.contains(event.target)) {
  //         setShowMenu(null);
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  const handleMenuToggle = (index) => {
    setShowMenu(showMenu === index ? null : index);
  };

  const handleEdit = (id) => {
    navigate(`/adminside/editsingleItem/${id}`); // Correct usage of navigate
  };

  const handleDelete = (id) => {
    console.log("Delete item with id:", id);
    // Add your delete functionality here
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ml-11">
        <div className="flex flex-wrap -mx-4">
          {allItems.map((item, index) => (
            <div
              key={item.id}
              className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 px-4 mb-8 relative"
            >
              <div
                ref={menuRef} // Attach ref to container to detect clicks outside
                className="bg-white rounded-lg shadow-md flex flex-col items-center h-full p-4"
              >
                <img
                  src={`http://localhost:8000/storage/${item.thumbnail}`}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold mb-2 truncate text-center text-xs">
                  {item.title}
                </h3>
                <div
                  className="absolute top-2 right-4 cursor-pointer"
                  onClick={() => handleMenuToggle(index)}
                >
                  <FaEllipsisV />
                </div>
                {showMenu === index && (
                  <div className="absolute top-12 right-2 bg-white shadow-lg rounded-md border border-gray-300">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      <FaEdit className="inline-block mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      <FaTrash className="inline-block mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditItems;

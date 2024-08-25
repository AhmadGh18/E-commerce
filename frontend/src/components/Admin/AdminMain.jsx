import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import TopInfo from "./TopInfo";
import axiosClient from "../../axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminMain = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };
  const notify = () => toast("Cannot delet this categoty !");

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/createCategory", { name: categoryName })
      .then((response) => {
        if (response.status === 201) {
          // Add the new category to the list
          setAllCategories((prevCategories) => [
            ...prevCategories,
            {
              ...response.data.category,
              products_count: response.data.products_count, // Add products_count from response
            },
          ]);
          setIsDialogOpen(false);
        }
      })
      .catch((error) => {
        console.error("There was an error creating the category!", error);
      });
  };

  useEffect(() => {
    axiosClient
      .get("/showAllCategories")
      .then((response) => {
        setAllCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching categories!", error);
      });
  }, []);
  const handleDelete = (id) => {
    axiosClient
      .delete(`/deleteCategory/${id}`)
      .then((response) => {
        setAllCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status == 400) {
          notify();
        } else {
          console.error("There was an error deleting the category!", error);
        }
      });
  };
  return (
    <div>
      <div className="flex justify-start align-top items-start top-0">
        <TopInfo />
      </div>
      <ToastContainer />

      <div className="flex ml-[300px] flex-col gap-4 mt-6">
        <div className="flex">
          <p className="text-2xl">Available Categories:</p>
          <button
            className="flex items-center h-10 w-10 justify-center p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
            onClick={openDialog}
          >
            <FaPlus size={20} />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-8">
          <table className="text-sm text-left rtl:text-right text-gray-800 mb-8">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Number Of Items
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allCategories.map((category) => (
                <tr
                  key={category.id}
                  className="bg-gray-100 border-b hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {category.name}
                  </th>
                  <td className="px-6 py-4">{category.products_count}</td>
                  <td
                    className="px-6 py-4 cursor-pointer text-red-600"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Category Title</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={categoryName}
                onChange={handleChange}
                placeholder="Type something..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMain;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { ToastContainer, toast } from "react-toastify";

const EditSingle = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: null,
    images: [],
    tags: [],
    category_id: null,
    gender: "",
    age: "",
  });
  const [allcategories, setAllCategory] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");

  useEffect(() => {
    axiosClient.get(`/singleitem/${id}`).then((res) => {
      const product = res.data.product;
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        tags: product.tags ? product.tags.split(",") : [],
        category_id: product.category_id,
        gender: product.gender,
        age: product.age,
      });
    });
  }, [id]);

  useEffect(() => {
    axiosClient.get("/showAllCategories").then((data) => {
      setAllCategory(data.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      tags: newTags,
    }));
  };

  const handleAddTag = () => {
    if (categoryInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, categoryInput],
      }));
      setCategoryInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      tags: formData.tags.join(","),
    };

    try {
      await axiosClient.put(`/UpdateProduct/${id}`, updatedFormData);
      toast.success("Item updated successfully!"); // Updated success message
    } catch (error) {
      toast.error("Failed to update item.");
      console.log(error.response.data); // Log error response for debugging
    }
  };

  return (
    <div className="ml-[300px]">
      <div className="w-100">
        <section className="bg-gray-100">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 sm:w-full">
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <h1 className="text-xl font-bold">Edit Item</h1>
                  <div>
                    <label className="sr-only" htmlFor="title">
                      Title
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                      placeholder="Title"
                      type="text"
                      name="title"
                      id="title"
                      onChange={handleChange}
                      required
                      value={formData.title}
                    />
                  </div>

                  <div className="sm:grid-cols-2 grid gap-4">
                    <div>
                      <label className="sr-only" htmlFor="price">
                        Price
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                        placeholder="Price"
                        type="number"
                        id="price"
                        name="price"
                        onChange={handleChange}
                        min="1"
                        required
                        value={formData.price}
                      />
                    </div>
                    <div>
                      <select
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                        name="category_id"
                        required
                        value={formData.category_id}
                        onChange={handleChange}
                      >
                        <option value="">Select category</option>
                        {allcategories.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:grid-cols-2 grid gap-4">
                    <div>
                      <label className="sr-only" htmlFor="gender">
                        Gender
                      </label>
                      <select
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                        id="gender"
                        name="gender"
                        onChange={handleChange}
                        value={formData.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unisex">Unisex</option>
                      </select>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="age">
                        Age
                      </label>
                      <select
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                        id="age"
                        name="age"
                        onChange={handleChange}
                        value={formData.age}
                      >
                        <option value="">Select Age Range</option>
                        <option value="kids">Kids</option>
                        <option value="Adults">Adults</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                      placeholder="Description"
                      rows="4"
                      id="description"
                      name="description"
                      onChange={handleChange}
                      value={formData.description}
                    ></textarea>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="tags">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      placeholder="Add tags"
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                    />
                    <button
                      type="button"
                      className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                      onClick={handleAddTag}
                    >
                      Add Tag
                    </button>
                    <div className="mt-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                        >
                          {tag}
                          <button
                            type="button"
                            className="ml-2 text-red-500"
                            onClick={() => handleDeleteTag(index)}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white p-3 rounded-lg"
                    >
                      Update Item
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditSingle;

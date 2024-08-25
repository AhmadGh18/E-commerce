import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageItems = () => {
  const { restaurant, User, token } = useStateContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [allcategories, setAllCategory] = useState(null);
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
  const nav = useNavigate();
  const notify = () => toast("Product Added succefuly !");

  useEffect(() => {
    if (User.has_restaurant == 0) {
      return nav("/newUser/login");
    }
  }, []);
  useEffect(() => {
    axiosClient.get("/showAllCategories").then((data) => {
      console.log(data.data);
      setAllCategory(data.data);
    });
  }, []);
  const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumbnail: file,
    }));

    const preview = URL.createObjectURL(file);
    setThumbnailPreview(preview);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...files],
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);

    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleCategoryInput = (event) => {
    setCategoryInput(event.target.value);
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() !== "") {
      setTags((prevCategories) => [...prevCategories, categoryInput]);
      setCategoryInput("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteCategory = (index) => {
    setTags((prevCategories) => prevCategories.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append("title", formData.title);
    formDataObject.append("price", formData.price);
    formDataObject.append("description", formData.description);
    formDataObject.append("category_id", formData.category_id);
    formDataObject.append("thumbnail", formData.thumbnail);
    formDataObject.append("gender", formData.gender);
    formDataObject.append("age", formData.age);

    selectedFiles.forEach((file, index) => {
      formDataObject.append(`images[${index}]`, file);
    });
    const joinedCategories = tags.join(",");
    formDataObject.append("tags", joinedCategories);
    console.log(formDataObject);
    axiosClient
      .post("/AddProduct", formDataObject)
      .then((response) => {
        notify();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ml-[300px] w-100">
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 sm:w-full">
              <form
                className="space-y-4"
                onSubmit={handleSubmit}
                encType="multiple/form-data"
              >
                <h1 className="text-xl font-bold">Add Item</h1>
                <div>
                  <label className="sr-only" htmlFor="name">
                    Title
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                    placeholder="Title"
                    type="text"
                    name="title"
                    id="name"
                    onChange={handleChange}
                    required
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
                    />
                  </div>
                  <div>
                    <select
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                      onChange={handleChange}
                      name="category_id"
                      required
                    >
                      <option value="">Select category</option>
                      {allcategories &&
                        allcategories.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
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
                  ></textarea>
                </div>

                <div>
                  <p className="mb-1 text-sm">Choose Thumbnail</p>
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleThumbnailSelect}
                    required
                  />
                </div>
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    className="w-32 h-32 object-cover rounded-lg mt-2"
                    alt="Thumbnail Preview"
                  />
                )}

                <div>
                  <label
                    className="bg-blue-500 p-2 rounded-lg border border-gray-500 text-white cursor-pointer"
                    htmlFor="filein"
                  >
                    Add More Images
                  </label>
                  <input
                    type="file"
                    id="filein"
                    style={{ display: "none" }}
                    multiple
                    onChange={handleFileSelect}
                  />
                  <div className="mt-2 flex flex-wrap">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-32 h-32 object-cover rounded-lg mr-2 mb-2"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          onClick={() => handleDeleteImage(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm mb-1">
                    Age
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                    onChange={handleChange}
                    name="age"
                    required
                  >
                    <option value="">Select Age</option>
                    {[{ name: "Adults" }, { name: "kids" }].map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm mb-1">
                    gender
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                    onChange={handleChange}
                    name="gender"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">female</option>
                    <option value="unisex">unisex</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm mb-1">
                    Tags
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="tags"
                      value={categoryInput}
                      onChange={handleCategoryInput}
                      className="flex-1 rounded-lg border border-gray-300 p-3 text-sm"
                      placeholder="Enter tag"
                    />
                    <button
                      type="button"
                      className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-lg"
                      onClick={handleAddCategory}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((category, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg flex items-center"
                    >
                      {category}
                      <button
                        type="button"
                        className="ml-2 text-blue-700"
                        onClick={() => handleDeleteCategory(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default ManageItems;

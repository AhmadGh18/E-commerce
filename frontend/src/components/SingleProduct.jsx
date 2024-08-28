import { useEffect, useState, useRef } from "react";
import axiosClient from "../axiosClient";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [shoppingCarr, setShoppingCart] = useState(
    window.localStorage.getItem("CartItems")
  );
  useEffect(() => {
    console.log(shoppingCarr);
  }, []);

  const { id } = useParams();
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    // Fetch product data
    axiosClient
      .get(`/singleitem/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Log cart items from localStorage
    const storedCart = localStorage.getItem("CartItems");
    if (storedCart) {
      console.log("Cart Items:", JSON.parse(storedCart));
    }
  }, []);

  const addToCart = () => {
    // Ensure product.id is available
    if (!product.id) {
      toast.error("Product information is not available.");
      return;
    }

    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size before adding to cart.");
      return;
    }

    const productToCart = {
      id: product.id,
      color: selectedColor,
      size: selectedSize,
    };

    // Retrieve existing cart items from localStorage (if any)
    const storedCart = localStorage.getItem("CartItems");
    const cartItems = storedCart ? JSON.parse(storedCart) : [];

    cartItems.push(productToCart);

    // Save the updated cart back to localStorage
    localStorage.setItem("CartItems", JSON.stringify(cartItems));

    // Show success notification
    toast.success("Product added to cart successfully!");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleMouseDown = (e) => {
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseLeave = () => {
    scrollRef.current.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseUp = () => {
    scrollRef.current.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (e) => {
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            {/* Carousel Container */}
            <div className="relative w-full h-[460px] rounded-lg overflow-hidden">
              {/* Images */}
              <motion.div
                className="flex"
                initial={{ x: 0 }}
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ duration: 0.5 }}
              >
                {product.images && product.images.length > 0 ? (
                  product.images.map((el, index) => (
                    <div
                      key={index}
                      className="w-[100%] h-[100%] flex-shrink-0 flex items-center justify-center"
                    >
                      <img
                        src={`http://localhost:8000/storage/${el.image_url}`}
                        alt={`Product Image ${index + 1}`}
                        className="md:h-[480px]"
                      />
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full flex-shrink-0 flex items-center justify-center">
                    <img
                      src={`http://localhost:8000/storage/${product.thumbnail}`}
                      alt="Product Thumbnail"
                      className="md:h-[480px]"
                    />
                  </div>
                )}
              </motion.div>
              {product.images.length > 0 && (
                <div>
                  <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                    aria-label="Previous Image"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                    aria-label="Next Image"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>

            <div className="flex -mx-2 mb-4 mt-3">
              <div className="w-1/2 px-2">
                <button
                  onClick={addToCart}
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-700 text-m mb-4">{product.title}</p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-800">Price:</span>
                <span className="text-gray-700">${product.price}</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Select Color:</span>
              <div className="flex items-center mt-2">
                {["gray", "red", "blue", "yellow"].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorClick(color)}
                    className={`w-6 h-6 rounded-full mr-2 ${
                      selectedColor === color
                        ? "border-2 border-gray-900"
                        : "opacity-70"
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Select Size:</span>
              <div className="flex items-center mt-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`py-2 px-4 rounded-full font-bold mr-2 ${
                      selectedSize === size
                        ? "bg-gray-800 text-white"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700">
                Product Description:
              </span>
              <p className="text-gray-800 text-sm mt-2">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {shoppingCarr && (
        <Link to="/checkout">
          <div className="fixed h-[60px] w-[60px] bg-black text-white right-10 bottom-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 cursor-pointer transition-all duration-300">
            <FaShoppingCart className="w-8 h-8" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default SingleProduct;

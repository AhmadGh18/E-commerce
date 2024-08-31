import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

const SingleOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/viewSingleOrder/${id}`)
      .then((response) => {
        setOrder(response.data.order);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the order!", error);
        setError("Failed to load order details");
        setLoading(false);
      });
  }, [id]);
  const changestate = (newState) => {
    axiosClient
      .post(`/changeState/${id}`, { state: newState })
      .then((response) => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          state: newState,
        }));
      })
      .catch((error) => {
        console.error("There was an error changing the order state!", error);
      });
  };

  if (loading)
    return <div className="p-4 max-w-screen-lg mx-auto">Loading...</div>;
  if (error) return <div className="p-4 max-w-screen-lg mx-auto">{error}</div>;

  return (
    <div className="p-4 max-w-screen-lg mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      {order ? (
        <div>
          {/* User Information */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-2xl font-semibold mb-4">User Information</h2>
            <p className="mb-2">
              <strong className="text-gray-700">Name:</strong> {order.user.name}
            </p>
            <p className="mb-4">
              <strong className="text-gray-700">Email:</strong>{" "}
              {order.user.email}
            </p>
          </div>

          {/* Order Information */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Order Information</h2>
            <p className="mb-2">
              <strong className="text-gray-700">Order ID:</strong> {order.id}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Total Price:</strong> $
              {Number(order.total_price).toFixed(2)}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Status:</strong> {order.state}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">City:</strong> {order.city}
            </p>
            {order.longitude && order.latitude && (
              <iframe
                className="w-full h-96 border border-gray-300 rounded-lg"
                src={`https://www.google.com/maps?q=${order.longitude},${order.latitude}&h1=es;z=14&output=embed`}
                title="Order Location"
              ></iframe>
            )}
          </div>

          {/* Ordered Items */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-semibold mb-4">Ordered Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Product ID
                    </th>
                    <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Quantity
                    </th>
                    <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Price
                    </th>
                    <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Color
                    </th>
                    <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Size
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.ordered_items && order.ordered_items.length > 0 ? (
                    order.ordered_items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border-b border-gray-200 px-4 py-2 text-sm text-gray-800">
                          {item.product_id}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-2 text-sm text-gray-800">
                          {item.quantity}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-2 text-sm text-gray-800">
                          ${Number(item.price_at_time).toFixed(2)}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-2 text-sm text-gray-800">
                          {item.color}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-2 text-sm text-gray-800">
                          {item.size}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="border-b border-gray-200 px-4 py-2 text-center text-sm text-gray-600"
                      >
                        No items available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}

          {order && order.state === "not set" ? (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => changestate("done")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-150"
              >
                Mark as Done
              </button>
              <button
                onClick={() => changestate("not done")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-150"
              >
                Mark as Not Done
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <strong>Order State:</strong> {order.state}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No order details available
        </div>
      )}
    </div>
  );
};

export default SingleOrder;

import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";

const ManageOrders = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/viewAllPayments")
      .then((response) => {
        setPayments(response.data.payments);
      })
      .catch((error) => {
        console.error("There was an error fetching the payments!", error);
      });
  }, []);

  return (
    <div className="p-6 max-w-screen-lg mx-auto bg-gray-50 rounded-lg shadow-lg ml-[400px]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Payments List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                User Name
              </th>
              <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Order
              </th>
              <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments && payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-100">
                  <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-800">
                    {payment.user.name}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-800">
                    {payment.user.email}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-800">
                    ${Number(payment.amount).toFixed(2)}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-4 text-sm">
                    <Link
                      to={`/adminside/singleorder/${payment.order_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Order
                    </Link>
                  </td>
                  <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-800">
                    {payment.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border-b border-gray-200 px-6 py-4 text-center text-sm text-gray-600"
                >
                  No payments available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;

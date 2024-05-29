import React, { useState, useContext } from "react";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import {
  FaArrowCircleRight,
  FaArrowLeft,
  FaArrowRight,
  FaEdit,
  FaTrashAlt,
  FaUsers,
} from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider"; // Ensure correct path
// import { toast } from 'react-toastify';

const ManageBookings = () => {
  // const [payment, setpayment] = useState("");
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/payments/all`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return res.json();
    },
  });

  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const items_Per_Page = 10;
  const indexOfLastItem = currentPage * items_Per_Page;
  const indexOfFirstItem = indexOfLastItem - items_Per_Page;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // const handleDeleteItem = (item) => {
  //   console.log(item._id);
  // };

  const handleSubmit = async (item) => {
    try {
      console.log("hello hiiii");
      console.log(item);
      console.log("hello" + user.displayName);
      console.log("hello" + item.email);
      const message = `Your order is confirmed.\nOrder ID: ${item._id}\nItems: ${item.itemsName.join(", ")}`;
      const { data } = await axios.post(`http://localhost:5000/api/contact/`, {
        name: user.displayName,
        email: item.email,
        msg: message,
      });
      // toast.success("Message sent successfully");
      console.log("Message sent successfully");
    } catch (err) {
      // toast.error("Failed to send message");
      console.error("Failed to send message");
    }
  };

  const confirmedOrder = async (item) => {
    console.log(item);
    await axiosSecure.patch(`/payments/${item._id}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Order Confirmed Now!`,
        showConfirmButton: false,
        timer: 1500,
      });
      // Call handleSubmit when order is confirmed
      refetch();
      handleSubmit(item);
    });
  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Bookings!</span>
      </h2>

      <div>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transaction Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
                {/* <th>Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item._id}</td>
                  <td>Rs.{item.price}</td>
                  <td>{item.status}</td>
                  <td className="text-center">
                    {item.status === "confirmed" ? (
                      "done"
                    ) : (
                      <button
                        className="btn bg-green text-white btn-xs text-center"
                        onClick={() => confirmedOrder(item)}
                      >
                        <GiConfirmed />
                      </button>
                    )}
                  </td>
                  <td>
                    {/* <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrashAlt className="text-red"></FaTrashAlt>
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm mr-2 btn-warning"
        >
          <FaArrowLeft /> Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= orders.length}
          className="btn btn-sm bg-green text-white"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ManageBookings;

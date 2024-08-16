"use client";

import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/Footer";

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getMyOrders = async () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (userStorage) {
        try {
          let response = await fetch(`http://localhost:3000/api/order?id=${userStorage._id}`);
          response = await response.json();
          if (response.success) {
            setMyOrders(response.result);
          }
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };

    getMyOrders();
  }, []);

  return (
    <div className="overflow-hidden">
      <CustomerHeader />
      <h1 className="mt-36 text-center text-3xl font-semibold">My Profile Page</h1>
      <div className="restaurant-wraper" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {myOrders.length > 0 ? (
          myOrders.map((item) => (
            <div key={item._id}>
              <h4>Name: {item.data.name}</h4>
              <div>Amount: {item.amount}</div>
              <div>Address: {item.data.address}</div>
              <div>Status: {item.status}</div>
            </div>
          ))
        ) : (
          <h3>No orders found</h3>
        )}
      </div>
      <div className="myprofile-footer-wraper">
        <RestaurantFooter />
      </div>
    </div>
  );
};

export default Page;

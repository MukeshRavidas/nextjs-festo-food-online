"use client"

import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/Footer"

const Page = ()=>{

    const [myOrders,setMyOrders] = useState([]);

    useEffect(()=>{
        getMyOrders();
    },[])
    const getMyOrders=async()=>{
        const userStorage = JSON.parse(localStorage.getItem('user'));
        let response = await fetch("http://localhost:3000/api/order?id="+userStorage._id);
        response = await response.json();
        console.log(response);
        if(response.success)
        {
            setMyOrders(response.result);
        }
    }
    return(
        <div className="overflow-hidden">
            <CustomerHeader/>
            <h1 className="mt-36 text-center text-3xl font-semibold">My Profile Page</h1>
            {
                myOrders.map((item)=>(
                    // eslint-disable-next-line react/jsx-key
                    <div className="restaurant-wraper" style={{maginLeft:'auto',marginRight:'auto'}}>
                        <h4>Name:{item.data.name}</h4>
                        <div>Amount:{item.amount}</div>
                        <div>Address:{item.data.address}</div>
                        <div>Status:{item.status}</div>
                    </div>
                ))
            }

            <div className="myprofile-footer-wraper">
            <RestaurantFooter/>
            </div>
        </div>
    )
}

export default Page;
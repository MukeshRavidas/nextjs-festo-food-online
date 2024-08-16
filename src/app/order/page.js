"use client";

import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [userStorage, setUserStorage] = useState(null);
    const [cartStorage, setCartStorage] = useState(null);
    const [total, setTotal] = useState(0);
    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const cart = JSON.parse(localStorage.getItem('cart'));

        if (user && cart) {
            setUserStorage(user);
            setCartStorage(cart);

            const calculatedTotal = cart.length === 1 
                ? cart[0].price 
                : cart.reduce((a, b) => a.price + b.price);
            setTotal(calculatedTotal);

            if (!calculatedTotal) {
                router.push("/");
            }
        } else {
            router.push("/");
        }
    }, []);

    const orderNow = async () => {
        if (!userStorage || !cartStorage) return;

        const user_id = userStorage._id;
        const city = userStorage.city;
        const foodItemIds = cartStorage.map((item) => item._id).toString();

        try {
            const deliveryBoyResponse = await fetch(`http://localhost:3000/api/deliverypartners/${city}`);
            const deliveryBoyData = await deliveryBoyResponse.json();
            const deliveryBoyIds = deliveryBoyData.result.map((item) => item._id);
            const deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

            if (!deliveryBoy_id) {
                alert("Delivery Partner not Available");
                return;
            }

            const festo_id = cartStorage[0].festo_id;
            const collection = {
                user_id,
                festo_id,
                foodItemIds,
                deliveryBoy_id,
                status: 'confirm',
                amount: total + DELIVERY_CHARGES + (total * TAX / 100),
            };

            const response = await fetch("http://localhost:3000/api/order", {
                method: "POST",
                body: JSON.stringify(collection),
            });

            const result = await response.json();
            if (result.success) {
                alert("Order confirmed");
                setRemoveCartData(true);
                router.push("/myprofile");
            } else {
                alert("Order failed");
            }
        } catch (error) {
            console.error("Failed to place order:", error);
        }
    };

    return (
        <div>
            <div className="overflow-hidden">
                <CustomerHeader removeCartData={removeCartData} />
            </div>
            <div>
                <h3 className="mt-36 text-center text-3xl font-bold">User Order Food Details</h3>
            </div>

            <div className="total-wraper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row">
                        <span>Name</span>
                        <span>{userStorage?.name}</span>
                    </div>
                    <div className="row">
                        <span>Address</span>
                        <span>{userStorage?.address}</span>
                    </div>
                    <div className="row">
                        <span>Mobile No.</span>
                        <span>{userStorage?.mobile}</span>
                    </div>
                    <h2>Amount Details</h2>
                    <div className="row">
                        <span>Tax: </span>
                        <span>{total * TAX / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges: </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount: </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                    <h2>Payment Methods</h2>
                    <div className="row">
                        <span>Cash On Delivery: </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Place your Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Page;

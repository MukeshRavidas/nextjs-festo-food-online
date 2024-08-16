"use client";

import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart && storedCart.length > 0) {
            setCartStorage(storedCart);
            setTotal(storedCart.length === 1 
                ? storedCart[0].price 
                : storedCart.reduce((a, b) => a.price + b.price));
        }
    }, []);

    const orderNow = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            router.push("/order");
        } else {
            router.push("/user-auth?order=true");
        }
    };

    const removeFromCart = (id) => {
        const updatedCart = cartStorage.filter(item => item._id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartStorage(updatedCart);
        setTotal(updatedCart.length === 1 
            ? updatedCart[0].price 
            : updatedCart.reduce((a, b) => a.price + b.price, 0));
    };

    return (
        <div>
            <div className="overflow-hidden">
                <CustomerHeader />
            </div>
            <div>
                <h3 className="mt-36 text-center text-3xl font-bold">Cart Page</h3>
            </div>
            <div className="food-item-wraper">
                {cartStorage.length > 0 ? cartStorage.map((item) => (
                    <div key={item._id} className="list-item">
                        <div className="list-item-block1">
                            <Image src={item.img_path} width={100} height={100} alt={item.name} />
                        </div>
                        <div className="list-item-block2">
                            <div>{item.name}</div>
                            <div className="description">{item.description}</div>
                            <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                        </div>
                        <div className="list-item-block3">Price: {item.price}</div>
                    </div>
                )) : <h1 className="text-3xl font-bold">No Food Item Added for Now</h1>}
            </div>
            <div className="total-wraper">
                <div className="block-1">
                    <div className="row">
                        <span>Food Charges: </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax: </span>
                        <span>{(total * TAX) / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges: </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount: </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Order Now</button>
                </div>
            </div>
        </div>
    );
};
export default Page;
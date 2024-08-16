"use client"
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {

    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [total] = useState(() => cartStorage.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {
        return a.price + b.price;
    }))
    const router = useRouter();

    const orderNow=()=>{
        if(JSON.parse(localStorage.getItem('user')))
        {
            router.push("/order")
        }
        else{
            router.push("/user-auth?order==true")
        }
        
    }
    return (
        <div>
            <div className="overflow-hidden">
                <CustomerHeader />
            </div>
            <div>
                <h3 className="mt-36 text-center text-3xl font-bold">Cart Page</h3>
            </div>
            <div className="food-item-wraper">
                {
                    cartStorage.length>0 ? cartStorage.map((item) => (
                        <>
                            <div className="list-item">
                                
                                <div className="list-item-block1"><Image src={item.img_path} width={100} alt=""/></div>
                                <div className="list-item-block2">
                                    <div>{item.name}</div>
                                    <div className="description">{item.description}</div>
                                    {
                                        <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                                    }
                                </div>
                                <div className="list-item-block3">Price:{item.price}</div>
                            </div>
                        </>

                    ))
                        : <h1 className="text-3xl font-bold">No Food Item Added for Now</h1>
                }
            </div>
            <div className="total-wraper">
                <div className="block-1">
                    <div className="row">
                        <span>Food Charges : </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax : </span>
                        <span>{total * TAX / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges : </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amounts : </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                </div>
                <div className="block-2">
                <button onClick={orderNow}>Order Now</button>
            </div>
            </div>
            
        </div>
    )
}

export default Page;
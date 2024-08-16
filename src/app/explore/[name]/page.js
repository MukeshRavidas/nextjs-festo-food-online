"use client"

import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState } from "react";
import Image from "next/image";

const Page = (props) => {
    const name = props.params.name

    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([]);
    const [cartData,setCartData] = useState();
    const [cartStorage,setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [cartIds,setCartIds] = useState(cartStorage?()=>cartStorage.map((item)=>{
        return item._id;
    }):[]);

    const [removeCartData,setRemoveCartData] = useState();

    useEffect(() => {
        loadRestaurantDetails();
    }, [])

 
    
    const loadRestaurantDetails = async () => {

        const id = props.searchParams.id;
        let response = await fetch("http://localhost:3000/api/customer/" + id);
        response = await response.json();
        if (response.success) {
            setRestaurantDetails(response.details);
            setFoodItems(response.foodItems);
        }
    }

    const AddToCart=(item)=>{
        setCartData(item);
        let localCartIds = cartIds;
        localCartIds.push(item._id);
        setCartIds(localCartIds);
        setRemoveCartData();
    }

    const removeFromCart=(id)=>{
        setRemoveCartData(id);
        var localIds = cartIds.filter(item=>item != id);
        setCartData();
        setCartIds(localIds)
    }

    return (
        <div>
            <div className="overflow-hidden">
                <CustomerHeader cartData={cartData} removeCartData={removeCartData}/>
            </div>

            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="detail-wraper">
                <h3>Contact:{restaurantDetails?.contact}</h3>
                <h3>City:{restaurantDetails?.city}</h3>
                <h3>Address:{restaurantDetails?.address}</h3>
                <h3>Email:{restaurantDetails?.email}</h3>
            </div>
            <div className="food-item-wraper">
                {
                    foodItems.length>0? foodItems.map((item) => (

                        <>
                            <div className="list-item">
                                <Image src={item.img_path} width={100} alt=""/>
                                <div>
                                    <div>{item.name}</div>
                                    <div>{item.price}</div>
                                    <div className="description">{item.description}</div>
                                    {
                                        cartIds.includes(item._id) ?
                                        <button onClick={()=>removeFromCart(item._id)}>Remove From Cart</button>
                                        :<button onClick={()=>AddToCart(item)}>Add to cart</button>
                                    }
                                    
                                </div>
                            </div>
                        </>

                    ))
                    :<h1 className="text-3xl font-bold">No Food Item Added for Now</h1>
                }
            </div>
        </div>
    )
}
export default Page;
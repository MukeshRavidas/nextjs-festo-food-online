"use client"
import AddFoodItem from "@/app/_components/AddFoodItem";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import FoodItemList from "@/app/_components/FoodItemList";
import { useState } from "react";

const DashBoard = () => {
    const [addItem,setAddItem] = useState(false);

    return (
        <main>
            <div className="overflow-hidden">
                <RestaurantHeader />
                <div className="">
                    <button onClick={()=>setAddItem(true)} className="mt-40 bg-blue-500 text-white rounded-xl w-40 ml-10 h-9 font-serif hover:bg-blue-700 cursor-pointer focus:bg-yellow-600">Add Food</button>
                    <button onClick={()=>setAddItem(false)} className="bg-blue-500 text-white ml-4 w-40 h-9 rounded-xl font-serif hover:bg-blue-700 cursor-pointer focus:bg-yellow-600">DashBoard</button>
                    {
                        addItem?<AddFoodItem setAddItem={setAddItem}/>:<FoodItemList/>
                    }
                    
                </div>
                
            </div>
        </main>
    )
};
export default DashBoard;
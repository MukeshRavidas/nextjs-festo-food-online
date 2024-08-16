import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState();
    const router = useRouter();
    useEffect(() => {
        loadFoodItems();
    },[]);

    const loadFoodItems = async() => {
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        const festo_id = restaurantData._id;
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+festo_id);
        response = await response.json();
        console.log(response);
        if (response.success) {
            setFoodItems(response.result);
        } else {
            alert("Food items not loading");
        }
    }

    const deleteFoodItem=async(id)=>{
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+id,{
            method:"delete"

        });
        response = await response.json();
        if(response.success)
        {
            loadFoodItems();
        }else{
            alert("food item not deleted");
        }
    }
    return (
        <div>
            <h1 className="mt-9 text-3xl text-center">Food Items</h1>
            <div className="flex justify-center mt-5">
                <table className="border-collapse border-2 border-gray-500">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800">S.N</th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800">Name</th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800">Price</th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800">Description</th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800">image</th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        foodItems && foodItems.map((item,key)=>(
                        <tr key={key}>
                            <td className="border border-gray-400 px-4 py-2">{key+1}</td>
                            <td className="border border-gray-400 px-4 py-2">{item.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{item.price}</td>
                            <td className="border border-gray-400 px-4 py-2">{item.description}</td>
                            <td className="border border-gray-400 px-4 py-2"><Image src={item.img_path} alt="" width={80} height={80}/></td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button onClick={()=>deleteFoodItem(item._id)} className="bg-blue-500 text-white cursor-pointer rounded-2xl hover:bg-blue-700 w-20 h-10 focus:bg-black">Delete</button>
                                <button onClick={()=>router.push("dashboard/"+item._id)} className="bg-blue-500 text-white cursor-pointer rounded-2xl hover:bg-blue-700 ml-3 w-20 h-10 focus:bg-black">Edit</button>
                            </td>
                        </tr>
                        
                        
                    ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default FoodItemList;
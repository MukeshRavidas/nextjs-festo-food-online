"use client"
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItem=(props)=>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [path,setPath] = useState("");
    const [description,setDescripton] = useState("");
    const [error,setError] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        handleLoadFoodItem();
    },[])

    
    const handleLoadFoodItem=async()=>{
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+props.params.id);
        response = await response.json();
        if(response.success)
        {
            setName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.img_path);
            setDescripton(response.result.description);
        }
    }
    const handleEditFoodItem=async()=>{
        // console.log(name,price,path,description);
        if(!name || !price || !path || !description)
        {
            setError(true);
            return false
        }else{
            setError(false)
        }
        
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+props.params.id,{
            method:"PUT",
            body:JSON.stringify({name,price,img_path:path,description})
        });
        response = await response.json();
        if(response.success)
        {
            router.push("../dashboard");
        }else{
            alert("Data is not updated please try again");
        }

    }
    return(
        <div className="">
            <h1 className="mt-9 text-3xl text-center">Update Food Item</h1>
            <div className="max-w-lg mx-auto p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                {
                    error && !name && <span className="auto-rows-max text-red-600 text-1xl">please enter valid name</span>
                }
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter food price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                {
                    error && !price && <span className="auto-rows-max text-red-600 text-1xl">please enter valid price</span>
                }
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter image path"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                {
                    error && !path && <span className="auto-rows-max text-red-600 text-1xl">please enter valid path</span>
                }
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescripton(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                {
                    error && !description && <span className="auto-rows-max text-red-600 text-1xl">please enter valid description</span>
                }
            </div>
            <div>
                <button onClick={handleEditFoodItem} className="bg-blue-500 text-white text-center w-full p-2 border rounded-2xl cursor-pointer hover:bg-blue-700">Update Food Item</button>
            </div>
            <div>
                <button onClick={()=>router.push("../dashboard")} className="bg-blue-500 text-white text-center w-full p-2 border rounded-2xl cursor-pointer hover:bg-blue-700 mt-5">Back to Food Item Lists</button>
            </div>
        </div>
        </div>
    )
};

export default EditFoodItem;
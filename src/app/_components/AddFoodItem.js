import { useState } from "react";

const AddFoodItem=(props)=>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [path,setPath] = useState("");
    const [description,setDescripton] = useState("");
    const [error,setError] = useState(false);

    const handleAddFoodItem=async()=>{
        console.log(name,price,path,description);
        if(!name || !price || !path || !description)
        {
            setError(true);
            return false
        }else{
            setError(false)
        }
        let festo_id;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if(restaurantData)
        {
            festo_id = restaurantData._id;
        }
        let response = await fetch("http://localhost:3000/api/restaurant/foods",{
            method:"POST",
            body:JSON.stringify({name,price,img_path:path,description,festo_id})
        });
        response = await response.json();
        if(response.success)
        {
            alert("Food Item Added");
            props.setAddItem(false);
        }else{
            alert("Food item not added");
        }
    }
    return(
        <div className="">
            <h1 className="mt-9 text-3xl text-center">Add New Food Item</h1>
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
                <button onClick={handleAddFoodItem} className="bg-blue-500 text-white text-center w-full p-2 border rounded-2xl cursor-pointer hover:bg-blue-700">Add Food Item</button>
            </div>
        </div>
        </div>
    )
};

export default AddFoodItem;
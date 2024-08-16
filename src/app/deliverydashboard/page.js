"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DeliveryHeader from "../deliveryHeader";


const Page = () => {

    const router = useRouter();
    const [myOrders,setMyOrders] = useState([]);

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (!delivery) {
            router.push("/deliverypartner");
        }
    },[])
    
    useEffect(()=>{
        getMyOrders();
    },[])
    const getMyOrders=async()=>{
        const deliveryData = JSON.parse(localStorage.getItem('delivery'));
        let response = await fetch("http://localhost:3000/api/deliverypartners/orders/"+deliveryData._id);
        response = await response.json();
        if(response.success)
        {
            setMyOrders(response.result);
        }
    }

    return (
        <div className="overflow-hidden">
            <DeliveryHeader/>
            <div className="mt-36">
                <h1>My Order Lists</h1>
                {
                myOrders.map((item)=>(
                    // eslint-disable-next-line react/jsx-key
                    <div className="restaurant-wraper">
                        <h4>Name:{item.data.name}</h4>
                        <div>Amount:{item.amount}</div>
                        <div>Address:{item.data.address}</div>
                        <div>Status:{item.status}</div>
                        <div>Update Status:
                            <select>
                                <option>Confirm</option>
                                <option>On the Way</option>
                                <option>Delivered</option>
                                <option>Failed to Delivery</option>
                            </select>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Page;
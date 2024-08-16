/* eslint-disable react/jsx-no-duplicate-props */
"use client"
import Link from "next/link";
import { useRouter,usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

export default function RestaurantHeader() {
    const [isSideMenuOpen, setMenu] = useState(false);

    const [details,setDetails] = useState();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(()=>{
        let data = localStorage.getItem("restaurantUser");
        if(!data && pathName !=="/restaurant/dashboard")
        {
            router.push("/restaurant");

        }
        else if(data && pathName=="/restaurant")
        {
            router.push("/restaurant/dashboard");
        }
        else{
            setDetails(JSON.parse(data));
        }
    },[])
    const logout=()=>{
        localStorage.removeItem("restaurantUser");
        router.push("/restaurant");
    }
    return (
        <div className="fixed w-full z-[1000] bg-gray-800">
            <div className="flex items-center h-[12vh] justify-between w-[80%] mx-auto">
                <div className="font-logo text-white text-[18px]">
                    <span className="text-[30px] md:text-[40px] text-yellow-400">
                        Ff
                    </span>
                    Festo-Food
                </div>
                <IoCloseSharp 
                    onClick={() => setMenu(false)}
                    className={`mt-0 mb-8 text-3xl md:hidden text-white cursor-pointer ${isSideMenuOpen ? 'block' : 'hidden'}`}
                />
                <ul className="md:flex hidden items-center space-x-10">
                    <li><Link href="/" className="nav_link">Home</Link></li>
                    {   details && details.name?

                        <><li><button className="nav_link" onClick={logout}>Logout</button></li>
                        <li><Link href="/" className="nav_link">Profile</Link></li></>
                        :<li><Link href="/restaurant" className="nav_link">Login/SignUp</Link></li>
                    }
                       
                </ul>
                <FiMenu 
                    onClick={() => setMenu(true)}
                    className={`md:hidden text-3xl text-white ${isSideMenuOpen ? 'hidden' : 'block'}`}
                />
            </div>
            {/* Side menu for mobile view */}
            <div className={`fixed top-0 left-0 h-full w-full bg-gray-900 bg-opacity-90 z-50 transform ${isSideMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <IoCloseSharp 
                    onClick={() => setMenu(false)}
                    className="absolute top-4 right-4 text-3xl text-white cursor-pointer"
                />
                <ul className="flex flex-col items-center justify-center space-y-6 h-full text-white">
                    <li><Link href="/" className="nav_link" onClick={() => setMenu(false)}>Home</Link></li>
                    {   details && details.name?
                        
                        
                        <>
                        
                        <li><Link className="nav_link" onClick={() => setMenu(false)}>
                                <button onClick={logout} >Logout</button>
                        </Link></li>
                        <li><Link href="/" className="nav_link" onClick={() => setMenu(false)}>Profile</Link></li></>
                        :<li><Link href="/" className="nav_link" onClick={() => setMenu(false)}>Login/SignUp</Link></li>    
                    }
                </ul>
            </div>
            </div>
    );
}

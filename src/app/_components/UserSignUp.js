"use client"

import { useRouter } from "next/navigation";

const { useState } = require("react")

const UserSignUp=(props)=>{

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [c_password,setC_Password] = useState('');
    const [city,setCity] = useState('');
    const [address,setAddress] = useState('');
    const [mobile,setMobile] = useState('');
    const router = useRouter();
    const handleSignUp=async()=>{
        
        let response = await fetch("http://localhost:3000/api/user",{
            method:"POST",
            body:JSON.stringify({name,email,password,city,address,mobile})
        });
        response = await response.json();
        if(response.success)
        {
            const {result} = response;
            delete response.password;
            localStorage.setItem('user',JSON.stringify(result));
            if(props?.redirect?.order)
                {
                    router.push("/order")
                }
                else{
                    router.push("/")
                }
        }
        else{
            alert("failed")
        }
    }

     return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">User SignUp</h1>
            <div className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter Name"
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter Email"
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter Password"
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={c_password}
                        onChange={(event) => setC_Password(event.target.value)}
                        placeholder="Enter Confirm Password"
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        placeholder="Enter City"
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="Enter Address"
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                        placeholder="Enter Mobile No."
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <button
                        onClick={handleSignUp}
                        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    </div>
    )

}

export default UserSignUp;
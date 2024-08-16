"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const loginHandle = async() => {
        let response = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            body: JSON.stringify({email, password})
        });
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete response.password;
            localStorage.setItem('user', JSON.stringify(result));
            if(props?.redirect?.order)
            {
                router.push("/order")
            }
            else{
                router.push("/")
            }  
        }
        else {
            alert("failed to login.please try again with valid email and password")
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">User Login</h1>
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="w-full p-2 border rounded-md"
                            value={email} onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Password"
                            className="w-full p-2 border rounded-md"
                            value={password} onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={loginHandle}
                            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin;
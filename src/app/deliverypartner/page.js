"use client"

import { useRouter } from "next/navigation";
import DeliveryHeader from "../deliveryHeader";
import Footer from "../_components/Footer";

const { useState, useEffect } = require("react")

const Page = () => {

    const [loginMobile, setLoginMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setC_Password] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const router = useRouter();

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (delivery) {
            router.push("/deliverydashboard");
        }
    },[])

    const handleSignUp = async () => {

        let response = await fetch("http://localhost:3000/api/deliverypartners/signup", {
            method: "POST",
            body: JSON.stringify({ name, mobile, password, city, address })
        });
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete response.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push("deliverydashboard")
        }
        else {
            alert("failed")
        }
    }

    const loginHandle = async () => {
        let response = await fetch("http://localhost:3000/api/deliverypartners/login", {
            method: "post",
            body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
        });
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete response.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push("deliverydashboard")
        }
        else {
            alert("failed to login.please try again with valid mobile No. and password")
        }
    }

    return (
        <main>
        <div className="overflow-hidden">
            <DeliveryHeader />
            <h1 className="text-center mt-36 max-sm:text-center text-2xl">Delivery Partner</h1>
            <div className="auth-container">
                <div className="login-wraper">
                    <div className="flex flex-col items-center justify-center h-80 py-12 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md space-y-8">
                            <h1 className="mt-3 text-center text-3xl font-extrabold text-gray-900">User Login</h1>
                            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter mobile"
                                        className="w-full p-2 border rounded-md"
                                        value={loginMobile} onChange={(event) => setLoginMobile(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Enter Password"
                                        className="w-full p-2 border rounded-md"
                                        value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)}
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
                </div>
                <div className="signup-wraper">
                    <div className="flex flex-col items-center justify-center h-80  py-12 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md space-y-8">
                            <h1 className="mt-52 text-center text-3xl font-extrabold text-gray-900">User SignUp</h1>
                            <div className="mt-10 space-y-6 bg-white p-2 rounded-lg shadow-md">
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
                                        value={mobile}
                                        onChange={(event) => setMobile(event.target.value)}
                                        placeholder="Enter Mobile No."
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
                </div>
            </div>
        </div>
        <Footer/>
        </main>
    )
}

export default Page;
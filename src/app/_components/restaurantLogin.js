// components/RestaurantLogin.js
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RestaurantLogin = () => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [error,setError] = useState(false);
  const router = useRouter();
  const handleLogin=async()=>{
    if(!email || !password)
    {
      setError(true)
      return false
    }else{
      setError(false)
    }
    // console.log(email,password);
    let response = await fetch("http://localhost:3000/api/restaurant",{
      method:"POST",
      body:JSON.stringify({email,password,login:true})
    });
    response = await response.json();
    if(response.success)
    {
      const {result} = response;
      delete result.password;
      localStorage.setItem("restaurantUser",JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }else{
      alert("Login failed");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center">RestaurantLogin Page</h1>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Email id"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={email} onChange={(event)=>setEmail(event.target.value)}
            />
            {
               error && !email && <span className="auto-rows-max text-red-600 text-1xl">please enter valid email</span>
            }
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={password} onChange={(event)=>setPassword(event.target.value)}
            />
            {
               error && !password && <span className="auto-rows-max text-red-600 text-1xl">please enter valid password</span>
            }
          </div>
          <div>
            <button onClick={handleLogin} className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;

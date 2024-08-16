// components/RestaurantSignup.js
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RestaurantSignup = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [c_password,setC_Password] = useState('');
  const [name,setName] = useState('');
  const [city,setCity] = useState('');
  const [address,setAddress] = useState('');
  const [contact,setContact] = useState('');

  const router = useRouter();
  const [error,setError] = useState(false);
  const [passwordError,setPasswordError] = useState(false);

  const handleSignup=async()=>{
    if(password !== c_password)
    {
      setPasswordError(true)
      return false
    }else{
      setPasswordError(false)
    }

    if(!email || !password || !c_password || !name || !city || !address || !contact)
    {
      setError(true)
      return false
    }else{
      setError(false)
    }
    let response = await fetch("http://localhost:3000/api/restaurant",{
      method:"POST",
      body:JSON.stringify({email,password,name,city,address,contact})
    })
    response = await response.json();
    console.log(response);
    if(response.success)
    {
      console.log(response);
      const {result} = response;
      delete result.password;
      localStorage.setItem("restaurantUser",JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center">RestaurantSignup Page</h1>
        <div className="space-y-4">
          <div>
            <input
              type="email"
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
              passwordError && <span className="auto-rows-max text-red-600 text-1xl">Password and Confirm Password not match</span>
            }
            {
              error && !password && <span className="auto-rows-max text-red-600 text-1xl">please enter valid password</span>
            }
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={c_password} onChange={(event)=>setC_Password(event.target.value)}
            />
            {
              passwordError && <span className=" text-red-600 text-1xl auto-rows-max">Password and Confirm Password not match</span>
            }
            {
              error && !c_password && <span className="auto-rows-max text-red-600 text-1xl">please enter confirm password</span>
            }
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Restaurant Name"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={name} onChange={(event)=>setName(event.target.value)}
            />
            {
              error && !name && <span className="auto-rows-max text-red-600 text-1xl">please enter valid restaurant name</span>
            }
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter City Name"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={city} onChange={(event)=>setCity(event.target.value)}
            />
            {
              error && !city && <span className="auto-rows-max text-red-600 text-1xl">please enter valid city</span>
            }
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter full address"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={address} onChange={(event)=>setAddress(event.target.value)}
            />
            {
              error && !address && <span className="auto-rows-max text-red-600 text-1xl">please enter valid address</span>
            }
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter contact No."
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={contact} onChange={(event)=>setContact(event.target.value)}
            />
            {
              error && !contact && <span className="auto-rows-max text-red-600 text-1xl">please enter valid number</span>
            }
          </div>
          <div>
            <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignup;

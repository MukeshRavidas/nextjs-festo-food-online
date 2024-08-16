"use client"
import { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignup from "../_components/restaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/Footer";
const Restaurant = () => {
  const [login, setLogin] = useState(true);

  return (
    <main>
      <div>
        <RestaurantHeader />
          <div>
            <h1>Restaurant Login/Signup Page</h1>
            {login ? <RestaurantLogin /> : <RestaurantSignup />}
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-100">
            <button
              onClick={() => setLogin(!login)}
              className="px-4 mb-10 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {login ? "Do not have an account? Signup" : "Already have an account? Login"}
            </button>
          </div>
          <div>
            <RestaurantFooter/>
          </div>
      </div>
    </main>
  );
};

export default Restaurant;
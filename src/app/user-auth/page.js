"use client"; // Ensure this component is client-side only

import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/Footer";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";

const UserAuth = (props) => {
    const [login, setLogin] = useState(true);

    return (
        <div className="overflow-hidden">
            <CustomerHeader />
            <div>
                <h1>{login ? 'User Login' : 'User SignUp'}</h1>
                {
                    login ? <UserLogin redirect={props.searchParams} /> : <UserSignUp redirect={props.searchParams} />
                }
            </div>
            <div className="text-center text-2xl font-semibold mb-10">
                <button onClick={() => setLogin(!login)} className="text-center">
                    {login ? 'Do not have an account? Sign Up' : 'Already have an account? Login'}
                </button>
            </div>
            <div>
                <RestaurantFooter />
            </div>
        </div>
    );
};

export default UserAuth;

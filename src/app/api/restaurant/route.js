import { connectionStr } from "../../lib/db";
import { restaurantSchema } from "../../lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET()
{
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const data = await restaurantSchema.find();
    console.log(data);
    return NextResponse.json({result:data});
}

export async function POST(request)
{
    let payload = await request.json();
    await mongoose.connect(connectionStr,{useNewUrlParser:true})

    let result;
    let success=false;
    if(payload.login)
    {
        // use for login page conditionaly 
        result = await restaurantSchema.findOne({email:payload.email,password:payload.password});
        if(result)
        {
            success=true;
        }
    }
    else{
        // use for signup page conditionaly
        const restaurant = new restaurantSchema(payload)
        result = await restaurant.save();
        if(result)
        {
            success=true
        }
    }
    
    return NextResponse.json({result,success});
}
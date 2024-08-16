import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "../../../lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request,content)
{
    
    const id = content.params.id
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const details = await restaurantSchema.findOne({_id:id});
    const foodItems = await foodSchema.find({festo_id:id});
    return NextResponse.json({success:true,details,foodItems});
}
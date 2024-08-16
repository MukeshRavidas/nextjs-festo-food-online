import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "../../lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request)
{
    const payload = await request.json();
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let success = false;
    const orderObj = new orderSchema(payload);
    const result = await orderObj.save();
    if(result)
    {
        success = true;
    }

    return NextResponse.json({result,success});
}

export async function GET(request)
{   
    const userId = request.nextUrl.searchParams.get('id');
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let success = false;
    let result = await orderSchema.find({user_id:userId});
    if(result)
    {
        let festoData = await Promise.all(
            result.map(async(item)=>{
                let festoInfo = {};
                festoInfo.data = await restaurantSchema.findOne({_id:item.festo_id});
                festoInfo.amount = item.amount;
                festoInfo.status = item.status;
                return festoInfo;
            })
        )
        result = festoData;
        success = true;
    }

    return NextResponse.json({result,success})
}
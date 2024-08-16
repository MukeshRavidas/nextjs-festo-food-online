import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/RestaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content)
{   
    const id = content.params.id;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let success = false;
    let result = await orderSchema.find({deliveryBoy_id:id});
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

const { default: mongoose } = require("mongoose");


const orderModel = new mongoose.Schema({

    user_Id:mongoose.Schema.Types.ObjectId,
    foodItemIds:String,
    festo_id:mongoose.Schema.Types.ObjectId,
    deliveryBoy_id:mongoose.Schema.Types.ObjectId,
    status:String,
    amount:String
})

export const orderSchema = mongoose.models.orders || mongoose.model('orders',orderModel);
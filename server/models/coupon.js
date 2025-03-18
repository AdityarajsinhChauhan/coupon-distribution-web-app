import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {type:String , required: true},
    isClaimed: {type:Boolean , required: true , default:false},
    createdAt: {type:Date , default:Date.now} ,

})

const couponModel = mongoose.model('coupons', couponSchema);
export default couponModel;

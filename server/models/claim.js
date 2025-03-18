import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
    claimedBy: {type:String , required:true} ,
    code: {type:String , required:true},
    claimedAt : {type:Date, default:Date.now}
});

const claimModel = mongoose.model('claims',claimSchema);

export default claimModel;
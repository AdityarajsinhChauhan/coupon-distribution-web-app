import axios from "axios";
import { useState } from "react";


export const fetchCoupons = async () => {
    try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/getcoupons`, { withCredentials: true });
        if(result)return { success: true, message: result.data.message, data: result.data.coupons };
    } catch (error) {
        console.log(error.status)
        return {message:"Error while fetching coupons"}
    }
};

export const fetchClaims = async() => {
    try{
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/getclaims`,{withCredentials:true});
    return {message:result.data.message, data:result.data.claims}
    }
    catch(error){
        console.log(error);
        return {message:"Error while fetching claims"}
        
    }

}

export const addCoupon = async(code) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/addcoupon`,{
            code: code
        },{withCredentials:true});
        return {success:true,message:response.data.message}
        

    }
    catch(error){
        console.log(error);
        return { success: false,
            message: error.response?.data?.message || `something went wrong`
        }
    }

}

export const deleteCoupon = async(id) => {

    try{
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/admin/deleteCoupon/${id}`);
        return response.data.message

    }
    catch(error){
        console.log(error);
        return response.data.message || `something went wrong`
    }

}

export const updateCoupon = async(id,isClaimed) => {
    try{
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/admin/change/${id}`,{ isClaimed:isClaimed } , {withCredentials:true})
        return response.data.message
    }
    catch(error){
        return response.data.message || `something went wrong`
        
}

}
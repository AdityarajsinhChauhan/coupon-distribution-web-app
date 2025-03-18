import axios from "axios";

export const checkCoupon = async() => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/claim/check`);
        console.log(response);
        return { message: response.data.message , available: response.data.available , allowed: response.data.allowed}

    }
    catch(error){
        console.error(error);
        return {message : "Error checking coupon"}

    }
}

export const claimCoupon = async() => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/coupon/claim`);
        console.log(response)
        return { message: response.data.message , available: response.data.available , allowed: response.data.allowed}
    }
    catch(error){
        console.log(error);
        return {message: "Error claiming coupon"};
        
    }
}
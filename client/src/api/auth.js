import axios from "axios";

export const login = async(email,password) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/login`,{
            email: email,
            password: password
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

export const logout = async() => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/logout`,{withCredentials:true});
        return {success:true,message:response.data.message}

    }
    catch(error){
        console.log(error);
        return { success: false,
            message: error.response?.data?.message || `something went wrong`
        }
    }
}

export const checkAuth = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/auth`, 
        { withCredentials: true });

        return { success: true, access: true, message: "You are logged in" };
    } catch (error) {
        console.log(error);
        return { success: false, access: false , message: "something went wrong"};
    }
};
import React, { useState } from "react";
import { login } from '../api/auth';
import { Eye, EyeOff } from "lucide-react";

const Login = ({ setshowLogin , setisLoggedIn , setresponseMessage }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async(e) => {
    alert("please wait for response");
    e.preventDefault();
    setloading(true);
    const response = await login(email,password);
    if(response.success){
        setresponseMessage(response.message);
        setisLoggedIn(true);
        setshowLogin(false);
        setTimeout(() => {
          setresponseMessage("");
        }, 3000);
    }
    else{
      setresponseMessage(response.message);
      setTimeout(() => {
        setresponseMessage("");
      }, 3000);
    }
    setloading(false)

    
  };

  return (
    <div className="fixed bg-white w-[25rem] h-[25rem] border-2 border-purple-700 top-32 md:left-20 left-1 lg:left-[30rem] z-40">
      <form onSubmit={handleSubmit}>
      <h1 className="text-xl ml-5 my-3">Admin Login</h1>
      <div className="mx-5 h-1 bg-purple-700"></div>
        <div className="mx-5">
            
          <input
            type="text"
            value={email}
            placeholder="email"
            required
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="w-[100%] text-lg pl-3 py-1 mt-14 bg-purple-100"
          />
        </div>
        <div className="mx-5 relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="password"
            required
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="w-[100%] text-lg pl-3 py-1 mt-10 bg-orange-100"
          />
          <button
            type="button"
            className="absolute right-3 top-12 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="mx-5 mt-14">
          <button type="submit" 
          className="bg-purple-700 text-white text-lg font-medium px-14 py-1 border border-transparent hover:bg-white hover:text-purple-700 hover:border-purple-700 ">login</button>
          <button
          onClick={()=>{setshowLogin(false)}} 
          type="button"
          className="bg-orange-300 text-white text-lg font-medium px-16 ml-5 py-1 border border-transparent hover:bg-white hover:text-orange-300 hover:border-orange-300">close</button>
        </div>
        
        
      </form>
    </div>
  );
};

export default Login;

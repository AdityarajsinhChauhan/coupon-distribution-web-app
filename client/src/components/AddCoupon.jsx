import React, { useState } from "react";
import { addCoupon } from "../api/coupon";
import { Eye, EyeOff } from "lucide-react";

const AddCoupon = () => {
  const [responseMessage, setresponseMessage] = useState("");
  const [code, setcode] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCoupon(code);
      if (response) {
        setresponseMessage(response.message);
        setTimeout(() => {
          setresponseMessage("");
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Unauthorized! Please log in to add a coupon.");
      } else {
        console.error(error);
      }
    }
    setcode("");
  };
  return (
    <div className="w-[100%]">
      <form onSubmit={handleSubmit}>
        <input
          className="bg-purple-100 w-96 ml-10 mt-10 h-10 px-3"
          type="text"
          value={code}
          onChange={(e) => {
            setcode(e.target.value);
          }}
          placeholder="code"
        />
        <button
          type="submit"
          className="bg-purple-700 h-10 ml-3 px-3 font-medium text-white border border-purple-700 hover:bg-white hover:text-purple-700"
        >
          add coupon
        </button>
      </form>
      {responseMessage && (
        <div className="mt-5  font-medium text-lg ml-12">{responseMessage}</div>
      )}
    </div>
  );
};

export default AddCoupon;

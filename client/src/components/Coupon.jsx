import React, { useEffect, useState } from "react";
import { fetchCoupons } from "../api/coupon";
import axios from "axios";
import { deleteCoupon } from "../api/coupon";
import { updateCoupon } from "../api/coupon";

const Coupon = ({ isLoading, setisLoading }) => {
  const [coupons, setcouopns] = useState([]);
  const [responseMessage, setresponseMessage] = useState("no");

  const getData = async () => {
    setisLoading(true);

    try {
      const response = await fetchCoupons();
      if (response) {
        setcouopns(response.data);
        setresponseMessage(response.message);
        setTimeout(() => {
          setresponseMessage("no");
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Unauthorized! Please log in to access this page.");
      } else {
        console.log(error);
      }
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" w-[100%] overflow-scroll ">
      <div className={`text-lg font-medium ml-10 mt-5 `}>
        <span
          className={responseMessage === "no" ? "opacity-0" : "opacity-100"}
        >
          {responseMessage}
        </span>
        {isLoading && <span>Please wait</span>}
      </div>
      <table className=" mb-10 mt-3 overflow-scroll w-[100vw] lg:mx-10 lg:w-[60rem]">
        <thead>
          <tr className="bg-purple-100 overflow-x-scroll">
            <td className="font-bold text-lg pl-3 py-2">code</td>
            <td className="font-bold text-lg pl-3 py-2">is claimed</td>
            <td className="font-bold text-lg pl-3 py-2">created At</td>
            <td className="font-bold text-lg pl-3 py-2">change status</td>
            <td className="font-bold text-lg pl-3 py-2">delete</td>
          </tr>
        </thead>
        <tbody>
          {coupons.map((item) => (
            <tr key={item._id} className="overflow-scroll">
              <td className=" pl-3 py-2">{item.code}</td>
              <td className=" pl-3 py-2">{item.isClaimed ? "Yes" : "No"}</td>
              <td className=" pl-3 py-2">{item.createdAt}</td>
              <td className=" pl-3 py-2">
                <button
                  onClick={async () => {
                    setisLoading(true);
                    try {
                      const response = await updateCoupon(
                        item._id,
                        !item.isClaimed
                      );
                      if (response) {
                        setresponseMessage(response);
                        setcouopns((prevCoupons) =>
                          prevCoupons.map((coupon) =>
                            coupon._id === item._id
                              ? { ...coupon, isClaimed: !coupon.isClaimed }
                              : coupon
                          )
                        );
                      }
                    } catch (error) {
                      if (error.response && error.response.status === 401) {
                        alert(
                          "🔒 Unauthorized! Please log in to access this page."
                        );
                      } else {
                        console.error(error);
                      }
                    }

                    setisLoading(false);
                  }}
                  className="bg-purple-700 border border-purple-700 hover:bg-white hover:text-purple-700 text-white px-3 py-1 font-medium"
                >
                  change
                </button>
              </td>
              <td className=" pl-3 py-2">
                <button
                  onClick={async () => {
                    setisLoading(true);
                    try {
                      const response = await deleteCoupon(item._id);
                      if (response) {
                        setresponseMessage(response);
                        setTimeout(() => {
                          setresponseMessage("no");
                        }, 3000);
                        setcouopns((prevCoupons) =>
                          prevCoupons.filter(
                            (coupon) => coupon._id !== item._id
                          )
                        );
                      }
                    } catch (error) {
                      if (error.response && error.response.status === 401) {
                        alert(
                          "🔒 Unauthorized! Please log in to access this page."
                        );
                      } else {
                        console.error(error);
                      }
                    }
                    setisLoading(false);
                  }}
                  className="bg-purple-700 border border-purple-700 hover:bg-white hover:text-purple-700 text-white px-3 py-1 font-medium"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>{" "}
    </div>
  );
};

export default Coupon;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { ReactTyped } from "react-typed";
import Dialogue from "../components/Dialogue";
import { checkCoupon } from "../api/claim";
import { claimCoupon } from "../api/claim";

const Home = () => {
  const [showCheck, setShowCheck] = useState(true);
  const [showClaim, setShowClaim] = useState(false);
  const [expand, setexpand] = useState(false);
  const [delayedShow, setDelayedShow] = useState(false);
  const [showDialogue, setshowDialogue] = useState(false);
  const [message, setmessage] = useState("Your coupon code will appear here");
  const [responseMessage, setresponseMessage] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (showClaim) {
      const timeout = setTimeout(() => {
        setDelayedShow(true);
      }, 300); // Apply delay when showing
      return () => clearTimeout(timeout);
    } else {
      setDelayedShow(false); // Hide instantly
    }
  }, [showClaim]);

  return (
    <div>
      <Navbar />

      <Dialogue showDialogue={showDialogue} setshowDialogue={setshowDialogue} />

      {showCheck && (
        <div className="fixed text-2xl left-10 top-32 md:left-[15rem] lg:left-[27rem] md:top-[12rem] lg:top-[12rem] font-bold">
          <ReactTyped
            strings={[
              "Check for Available Coupons",
              "See If You Qualify for a Coupon",
              "Tap to Reveal Your Coupon",
              "Check Now, Do You Have a Reward?",
            ]}
            typeSpeed={40}
            backSpeed={10}
            loop
          />
        </div>
      )}

      {/* coupon cheking container */}

      <div
        className={`lg:left-[27rem] left-3 md:left-[15rem] top-[15rem] border-2 border-black w-96 h-[10rem]  
            ${showCheck ? "fixed z-20" : "hidden z-0"}`}
      >
        <button
          onClick={async () => {
            setloading(true)
            const response = await checkCoupon();
            if (response) {
              setresponseMessage(response.message);
              if (response.allowed && response.available) {
                setexpand(true);
                setShowClaim(true);
                setShowCheck(false);
              }
            }
            setloading(false);
          }}
          className=" bg-orange-400 text-white border-2 border-orange-400 font-medium mx-20 my-14 hover:border-purple-700 hover:text-purple-700 text-2xl py-1 px-5"
        >
          Check Coupon
        </button>
        {loading && <div className="absolute bottom-3 left-0 w-[100%]">
          <span className="flex justify-center text-lg font-medium">please wait</span>
        </div>}
      </div>

      {/* coupon claiming container */}

      <div
        className={`transition-all fixed z-40 w-[26rem] md:w-[31.7rem] h-[17rem] border-2 bg-white border-orange-400 top-[11.5rem] md:left-[10.5rem] lg:left-[22.6rem]  ${
          delayedShow ? "" : "hidden"
        }`}
      >
        <span
        onClick={()=>{
          setShowClaim(false);
          setShowCheck(true);
          setexpand(false);
        }}
        className="p-2 hover:bg-purple-200 cursor-pointer rounded-full right-4 top-4 absolute">
        <img src="/close.jpg" className="w-3 h-3" alt="" onClick={()=>{
          setShowClaim(false);
          setmessage("Your coupon code will appear here");}}/>
        </span>
        <div className="font-medium mx-24 mt-3 text-lg">
          <ReactTyped
            strings={[
              "Your Coupon is Ready, Claim Now",
              "Grab Your Coupon Before It’s Gone",
            ]}
            typeSpeed={40}
            backSpeed={10}
            loop
          />
        </div>
        <button
          onClick={async() => {
            // setShowClaim(false);
            // setShowCheck(true);
            // setexpand(false);
            setloading(true);
            const response = await claimCoupon();
            if(response){
              setmessage(response.message)
            }
            setloading(false)
          }}
          className="bg-purple-700 border-2 border-purple-700 hover:bg-orange-400 hover:text-purple-700 text-white text-xl font-bold mx-40 mt-5 px-14 py-2 mt"
        >
          claim
        </button>
        <div className="flex px-5 py-5 items-center justify-center text-xl font-medium w-[29rem] h-[7rem] mt-4  mx-4 bg-orange-400 border border-purple-700">
          {message}
        </div>
        {loading && <div className="absolute bottom-1 left-0 w-[100%]">
          <span className="flex justify-center text-lg font-medium">please wait</span>
        </div>}
      </div>

      {/* expanding container */}

      <div
        onClick={() => {}}
        className={`fixed transition-all duration-300 top-[18.6rem] left-20 md:left-[20rem] lg:left-[32.1rem]   w-[12.7rem] h-[2.8rem] bg-orange-400 
         ${expand ? "scale-x-[250%] scale-y-[600%] z-30" : "z-0"} `}
      ></div>

      {responseMessage && (
        <div className=" fixed font-medium top-[26rem] md:left-[15rem] lg:left-[24rem] md:w-[30rem] left-3 md:h-14 h-32 w-[24rem] border-2 border-black">
          <div className="flex items-center justify-center py-3">
            {responseMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

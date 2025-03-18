import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { login } from "../api/auth";
import Login from "../components/Login";
import Coupon from "../components/Coupon";
import AddCoupon from "../components/AddCoupon";
import Claim from "../components/Claim";
import { logout } from "../api/auth";
import { checkAuth } from "../api/auth";
import Dialogue from "../components/Dialogue";

const Admin = () => {
  const [showDialogue, setshowDialogue] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [responseMessage, setresponseMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setshowDialogue(true);
  }, [responseMessage]);

  const LogOut = async () => {
    const response = await logout();
    if (response) {
      setresponseMessage(response.message);
      setisLoggedIn(false);
      setTimeout(() => {
        setresponseMessage("");
      }, 3000);
    }
  };

  const [activeSection, setactiveSection] = useState("coupons");
  const [showLogin, setshowLogin] = useState(false);

  useEffect(() => {
    const isAuth = async () => {
      const response = await checkAuth();
      if (response.success === true) {
        setisLoggedIn(true);
      } else if (response.success === false) {
        setisLoggedIn(false);
      }
      isAuth();
    };
  }, [showLogin]);

  useEffect(() => {
    const storedSection = localStorage.getItem("activeSection");
    if (storedSection) {
      setactiveSection(storedSection);
    }
  }, []);

  const changeSection = (section) => {
    setactiveSection(section);
    localStorage.setItem("activeSection", section);
  };

  return (
    <div>
      <Dialogue
        showDialogue={showDialogue}
        setshowDialogue={setshowDialogue}
        text={responseMessage}
      />
      <Navbar setshowLogin={setshowLogin}
          setisLoggedIn={setisLoggedIn}
          setresponseMessage={setresponseMessage}/>
      {showLogin && (
        <Login
          setshowLogin={setshowLogin}
          setisLoggedIn={setisLoggedIn}
          setresponseMessage={setresponseMessage}
        />
      )}
      <button
        onClick={() => {
          setshowLogin(true);
        }}
        className="absolute top-4 right-0 lg:right-4 px-5 py-1 font-medium bg-white border border-transparent hover:border-white hover:bg-purple-700 hover:text-white"
      >
        login
      </button>
      {isLoggedIn && (
        <button
          onClick={LogOut}
          className="absolute top-4 right-24 lg:right-28 px-5 py-1 font-medium hover:bg-white border hover:border-transparent border-white bg-purple-700 text-white hover:text-black"
        >
          logout
        </button>
      )}

      <div className="flex flex-col lg:flex-row">
        <div className=" bg-purple-100 lg:h-[89vh] lg:w-56 lg:block flex w-[100vw]">
          <div className="flex items-center font-medium text-lg pl-3 mx-3 py-1">
            {isLoggedIn ? "Welcom Admin" : "Login required!"}
          </div>

          <div
            className={`font-medium mt-3 text-lg mx-3 px-1 lg:pl-3 py-1  cursor-pointer
            ${
              activeSection === "coupons"
                ? "bg-purple-700 text-white"
                : "hover:bg-purple-200"
            }`}
            onClick={() => {
              changeSection("coupons");
            }}
          >
            {" "}
            coupons
          </div>

          <div
            className={`font-medium mt-3 text-lg mx-3 px-1 lg:pl-3 py-1  cursor-pointer
            ${
              activeSection === "claims"
                ? "bg-purple-700 text-white"
                : "hover:bg-purple-200"
            }`}
            onClick={() => {
              changeSection("claims");
            }}
          >
            claims
          </div>

          <div
            className={`font-medium mt-3 text-lg mx-3 px-1 lg:pl-3 py-1  cursor-pointer
            ${
              activeSection === "addcoupon"
                ? "bg-purple-700 text-white"
                : "hover:bg-purple-200"
            }`}
            onClick={() => {
              changeSection("addcoupon");
            }}
          >
            add coupon
          </div>
        </div>

        <div className=" bg-white h-[89vh] w-[100vw] lg:w-[66rem]">
          {isLoggedIn ? (
            <>
              {activeSection === "coupons" && (
                <Coupon isLoading={isLoading} setisLoading={setisLoading} />
              )}
              {activeSection === "claims" && (
                <Claim isLoading={isLoading} setisLoading={setisLoading} />
              )}
              {activeSection === "addcoupon" && (
                <AddCoupon isLoading={isLoading} setisLoading={setisLoading} />
              )}
            </>
          ) : (
            <div className="w-[100%] h-[100%] flex items-center justify-center font-bold text-2xl text-gray-400">
              Login to access admin panel
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

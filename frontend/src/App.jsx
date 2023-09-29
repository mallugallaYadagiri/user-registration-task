import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    if (!username || !password || !phoneNumber) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/send-otp",
        { username, password, phoneNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setOtpSent(true);
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Internal server error.");
    }
  };

  const handleValidateOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/validate-otp",
        { phoneNumber, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setOtp("");
      } else {
        toast.warn(response.data.message);
        setOtpSent(false);
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      toast.error("Internal server error.");
    }
  };

  return (
    <div className="bg-green-700 flex flex-col h-screen justify-center items-center 2xl:w-full">
      <div className="flex flex-col border p-8 bg-green-500 rounded-xl 2xl:w-2/6 xl:w-2/5 lg:w-3/5 md:w-3/5">
        <h1 className="text-3xl mb-5 font-bold text-black underline text-center tracking-wide	">
          User Registration
        </h1>
        <div className="flex justify-between border px-3 my-3 h-10 items-center bg-green-300 rounded-md">
          <label className=" font-xl font-bold">Username:</label>
          <input
            placeholder="Enter Username"
            className="h-8 rounded-md pl-2 font-bold"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex justify-between border px-3 my-3 h-10 items-center bg-green-300 rounded-md">
          <label className=" font-xl font-bold">Password:</label>
          <input
            placeholder="Enter password"
            className="h-8 rounded-md pl-2 font-bold "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between border px-3 my-3 h-10 items-center bg-green-300 rounded-md">
          <label className=" font-xl font-bold">Phone Number:</label>
          <input
            placeholder="Enter number with +91"
            className="h-8 rounded-md pl-2 font-bold"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex m-auto my-3">
          <button
            className=" py-2 px-6 m-auto bg-white font-bold rounded-lg hover:bg-green-600 hover:border hover:text-white"
            onClick={handleSendOTP}
          >
            Send OTP
          </button>
        </div>

        {otpSent && (
          <div className="mt-8 flex flex-col">
            <div className="flex justify-between border px-3 my-3 h-10 items-center bg-green-300 rounded-md">
              <label className=" font-xl font-bold">OTP:</label>
              <input
                placeholder=""
                className="h-8 rounded-md pl-2 font-bold"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="flex m-auto my-3">
              <button
                className=" py-2 px-6 m-auto bg-white font-bold rounded-lg hover:bg-green-600 hover:border hover:text-white"
                onClick={handleValidateOTP}
              >
                Validate OTP
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

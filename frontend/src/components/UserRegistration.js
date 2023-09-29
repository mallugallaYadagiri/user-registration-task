import React, { useState } from "react";
import axios from "axios";

function UserRegistration() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/send-otp",
        { phoneNumber }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleRegistration}>Register</button>
      <p>{message}</p>
    </div>
  );
}

export default UserRegistration;

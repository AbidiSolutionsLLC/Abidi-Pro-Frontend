import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../axios";
import { toast } from "react-toastify";
 
const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
 
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
 
  const inputRefs = useRef([]);
 
  useEffect(() => {
    if (!email) {
      setErrorMsg("Session expired. Please login again.");
    }
  }, [email]);
 
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);
      if (value && index < otpValues.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
 
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
 
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtpValues(newOtp);
      inputRefs.current[otpValues.length - 1].focus();
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpValues.join("");
    if (otp.length !== otpValues.length) {
      setErrorMsg("Please enter all 6 digits of the OTP.");
      return;
    }
 
    try {
      setLoading(true);
      setErrorMsg("");
      const response = await api.post("/auth/verify-otp", { email, otp });
      toast.success("OTP verified successfully!");
      navigate("/people");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="flex items-center justify-center h-screen bg-[#274744]">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl w-96"
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="user"
            className="w-16 h-16 rounded-full bg-white p-1"
          />
        </div>
 
        <h2 className="text-white text-xl text-center mb-1">Verify OTP</h2>
        <p className="text-sm text-center text-gray-100 mb-5">
          Enter the 6-digit code sent to your email
        </p>
 
        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
        )}
 
        <div className="flex justify-between mb-6">
          {otpValues.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            />
          ))}
        </div>
 
        <button
          type="submit"
          className="w-full bg-orange-400 py-2 rounded text-black"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};
 
export default VerifyOtp;
 
 
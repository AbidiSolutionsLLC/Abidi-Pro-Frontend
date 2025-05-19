import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../axios";
 
const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const onSubmit = async ({ email }) => {
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Reset email sent! Check your inbox.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send email.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="flex items-center justify-center h-screen bg-[#274744]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl w-96"
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="user"
            className="w-16 h-16 rounded-full bg-white p-1"
          />
        </div>
        <h2 className="text-white text-xl text-center pb-1">Forgot Password</h2>
        <hr className="w-16 mx-auto pt-5 border-orange-500" />
        <p className="text-gray-100 text-sm text-center mb-4 pt-1">
          Enter your Gmail to receive a reset link
        </p>
 
        {/* Email Field */}
        <label className="block text-white mb-1">Email:</label>
        <input
          type="email"
          className="w-full p-2 mb-2 rounded bg-gray-300"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: "Only Gmail addresses allowed",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}
 
        <button
          type="submit"
          className="w-full bg-orange-400 py-2 rounded text-black"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
 
        <p className="text-sm text-white mt-4 text-center">
          <a href="/auth/login" className="text-blue-300">
            Back to Login
          </a>
        </p>
      </form>
    </div>
  );
};
 
export default ForgotPasswordPage;
 
 
 
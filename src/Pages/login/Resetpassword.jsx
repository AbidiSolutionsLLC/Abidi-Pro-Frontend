import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../axios"; // Adjust path as needed
 
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
 
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`/auth/verify-reset-token/${token}`);
        setIsValidToken(true);
      } catch (err) {
        toast.error("Invalid or expired reset link.");
        navigate("/auth/login");
      }
    };
    verifyToken();
  }, [token, navigate]);
 
  const onSubmit = async ({ password }) => {
    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      toast.success("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/auth/login"), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed.");
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
 
        <h2 className="text-white text-xl text-center pb-1">Reset Password</h2>
        <hr className="w-20 mx-auto pt-5 border-orange-500 mb-4" />
 
        {/* Password Field */}
        <div className="relative w-full mb-4">
          <label htmlFor="password" className="block text-white mb-1">
            New Password:
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: passwordRegex,
                message:
                  "Must be 8+ chars, 1 uppercase, 1 number & 1 special char.",
              },
            })}
            className="w-full p-2 pr-10 rounded bg-gray-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-3">
              {errors.password.message}
            </p>
          )}
        </div>
 
        {/* Confirm Password Field */}
        <div className="relative w-full mb-4">
          <label htmlFor="confirmPassword" className="block text-white mb-1">
            Confirm Password:
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full p-2 pr-10 rounded bg-gray-300"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mb-3">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
 
        <button
          type="submit"
          className="w-full bg-orange-400 py-2 rounded text-black"
          disabled={!isValidToken}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};
 
export default ResetPassword;
 
 
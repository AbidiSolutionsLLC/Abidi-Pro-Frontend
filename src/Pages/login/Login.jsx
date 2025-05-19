import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import api from "../../axios";
 
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
 
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMsg("");
 
      const response = await api.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/auth/verify-otp", { state: { email: data.email } });
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Login failed ");
    } finally {
      setLoading(false);
    }
  };
 
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
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
        <h2 className="text-white text-xl text-center pb-1">Login</h2>
        <hr className="w-12 mx-auto pt-5 border-orange-500" />
        <p className="text-gray-100 text-sm text-center mb-4 pt-1">
          Enter your credentials to log in
        </p>
 
        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
 
        {/* Email Field */}
        <label className="block text-white mb-1">Email:</label>
        <input
          type="email"
          className="w-full p-2 mb-1 rounded bg-gray-300"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}
 
        {/* Password Field */}
        <div className="relative w-full mb-4">
          <label className="block text-white mb-1">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 pr-10 rounded bg-gray-300"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: passwordRegex,
                message:
                  "Password must be at least 8 chars, 1 uppercase, 1 number, 1 special.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}
          <div
            className="absolute right-3 top-10 text-gray-600 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </div>
        </div>
 
        <div className="flex items-center justify-between text-sm text-white mb-4">
          <label>
            <input type="checkbox" className="mr-1" /> Remember me
          </label>
          <a
            href="/auth/forgot-password"
            className="text-blue-300 cursor-pointer"
          >
            Forgot Password?
          </a>
        </div>
 
        <button
          type="submit"
          className="w-full bg-orange-400 py-2 rounded text-black"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
 
export default Login;
 
 
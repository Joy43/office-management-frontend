/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";
import { useResetPasswordMutation } from "@/redux/api/auth/authApi";
import { Eye, EyeOff, Lock, KeyRound, ShieldCheck } from "lucide-react";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email") || "";

  const handleReset = async (e: any) => {
    e.preventDefault();
    const data = {
      email,
      otp: e.target.otp.value,
      newPassword: e.target.newPassword.value,
    };

    try {
      const res = await resetPassword(data).unwrap();
      toast.success(res.message || "Password reset successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP or something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-[0px_20px_50px_rgba(138,43,226,0.1)] border border-gray-50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#8A2BE2]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-[#8A2BE2] w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Set New Password
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            We've sent an OTP to{" "}
            <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          {/* OTP Field */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Verification Code
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="otp"
                type="text"
                required
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent outline-none transition-all tracking-widest font-bold text-gray-700"
              />
            </div>
          </div>

          {/* New Password Field */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="newPassword"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8A2BE2] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            className="w-full bg-[#8A2BE2] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#7a26c9] transform hover:scale-[1.01] transition-all active:scale-[0.99] shadow-lg shadow-[#8A2BE2]/20 disabled:bg-gray-300 disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Didn't receive the code?{" "}
          <button
            type="button"
            className="text-[#8A2BE2] font-bold hover:underline ml-1"
            onClick={() => navigate(-1)}
          >
            Try again
          </button>
        </p>
      </div>
    </div>
  );
};

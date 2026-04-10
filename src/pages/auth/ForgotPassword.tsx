/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForgotPasswordMutation } from "@/redux/api/auth/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Mail, ArrowLeft } from "lucide-react";

export const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || "OTP Sent!");
      navigate(`/reset-password?email=${email}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 mb-6 hover:text-[#8A2BE2]"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Login
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
        <p className="text-gray-500 mb-6 italic">Don't worry, it happens!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#8A2BE2] outline-none"
            />
          </div>
          <button
            disabled={isLoading}
            className="w-full bg-[#8A2BE2] text-white py-3 rounded-xl font-bold transition hover:bg-[#7a26c9] disabled:bg-gray-300"
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

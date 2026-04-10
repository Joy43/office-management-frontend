/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/redux/api/auth/authApi";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // কন্ট্রোল করবে কখন কোড ইনপুট দেখাবে

  // API Hooks
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: isSending }] = useResendOtpMutation();

  // ১. প্রথমে ইমেইলে OTP পাঠাবে
  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter your email first");

    try {
      const res = await sendOtp({ email }).unwrap();
      if (res.success) {
        toast.success(res.message || "OTP sent successfully to your email!");
        setIsOtpSent(true); // ইমেইল পাঠানোর পর OTP ইনপুট সেকশন খুলবে
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send OTP. Try again.");
    }
  };

  // ২. OTP পাওয়ার পর সেটা ভেরিফাই করবে
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return toast.error("Please provide the OTP code");

    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      if (res.success) {
        toast.success("Account verified successfully! Please login.");
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 text-[#8A2BE2] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Account Verification
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            {isOtpSent
              ? "We've sent a code to your email. Please enter it below."
              : "Enter your email address to receive a verification code."}
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Section */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="email"
                value={email}
                disabled={isOtpSent} // OTP পাঠানোর পর ইমেইল লক হয়ে যাবে
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@gmail.com"
                className={`pl-10 h-12 ${isOtpSent ? "bg-slate-50 opacity-70" : ""}`}
                required
              />
            </div>
          </div>

          {!isOtpSent ? (
            // Step 1: Send OTP Button
            <Button
              onClick={handleSendOtp}
              disabled={isSending}
              className="w-full bg-[#8A2BE2] hover:bg-[#7a26c9] h-12 text-lg font-semibold gap-2"
            >
              {isSending ? "Sending..." : "Send Verification Code"}
              {!isSending && <ArrowRight size={18} />}
            </Button>
          ) : (
            // Step 2: OTP Input and Verify Form
            <form
              onSubmit={handleVerify}
              className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500"
            >
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  OTP Code
                </label>
                <Input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="0 0 0 0"
                  className="text-center tracking-[10px] text-2xl h-14 font-bold border-2 border-purple-200 focus:border-[#8A2BE2]"
                  required
                />
              </div>

              <Button
                disabled={isVerifying}
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg font-semibold"
              >
                {isVerifying ? "Verifying..." : "Verify & Continue"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)} // ইমেইল ভুল হলে যাতে আবার চেঞ্জ করা যায়
                  className="text-gray-400 text-xs hover:text-[#8A2BE2] transition-colors"
                >
                  Change Email?
                </button>
              </div>
            </form>
          )}
        </div>

        {isOtpSent && (
          <div className="mt-8 text-center pt-6 border-t border-gray-50">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              Didn't receive a code?{" "}
              <button
                onClick={handleSendOtp}
                disabled={isSending}
                className="text-[#8A2BE2] font-bold hover:underline inline-flex items-center gap-1 disabled:text-gray-400"
              >
                <RefreshCw
                  size={14}
                  className={isSending ? "animate-spin" : ""}
                />
                {isSending ? "Sending..." : "Resend"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyOtpPage;

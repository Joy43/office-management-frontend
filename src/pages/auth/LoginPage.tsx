/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { useLoginMutation } from "@/redux/api/auth/authApi";
import { useAppDispatch } from "@/redux/ReduxStore";
import { setUser } from "@/redux/features/auth/authSlice";
import { Eye, EyeOff, Lock, Mail } from "lucide-react"; // Fancy Icons

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Role based redirection logic
  const redirectUser = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        navigate("/super-admin/dashboard");
        break;
      case "CLIENT_ADMIN":
        navigate("/client-admin/dashboard");
        break;
      case "MANAGER":
        navigate("/Manager/dashboard");
        break;
      case "TAINER":
        navigate("/coach/dashboard");
        break;
      case "STAFF":
        navigate("/frontLine/dashboard");
        break;
      case "EXECUTIVE":
        navigate("/Executive/Dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await login(data).unwrap();
      if (res.success) {
        // Redux state update (state.token e accessToken thakbe)
        dispatch(setUser({ user: res.data.user, token: res.data.token }));

        // LocalStorage e manually rakhte chaile accessToken tai rakho
        localStorage.setItem("token", res.data.token.accessToken);

        toast.success(res.message || "Welcome Back!");
        redirectUser(res.data.user.role);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid credentials");
    }
  };
  return (
    <div className="min-h-screen flex bg-[#f3f4f6]">
      {/* LEFT SIDE (Image / Branding) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            Manage your business smarter
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            A modern platform to handle operations, analytics, and team
            workflows — all in one place.
          </p>

          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692"
            alt="Login Visual"
            className="rounded-2xl shadow-xl"
          />
        </div>
      </div>

      {/* RIGHT SIDE (LOGIN FORM) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-[0px_10px_30px_rgba(138,43,226,0.1)] border border-gray-100">
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#8A2BE2] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#8A2BE2]/30">
              <Lock className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">
              your test{" "}
              <span className="font-semibold text-[#8A2BE2] px-2 py-1 rounded animate-pulse">
                <a href="https://docs.google.com/document/d/1cGTSltTxQoF-ynoI-Wq0ZAnIH4eI67U6QeQOGS356oQ/edit?tab=t.0">
                  Credentials Link
                </a>
              </span>
            </p>
          </div>

          {/* FORM (UNCHANGED) */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent outline-none transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
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

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-500 cursor-pointer">
                <input type="checkbox" className="mr-2 accent-[#8A2BE2]" />
                Remember me
              </label>
              <div className="flex flex-col items-end gap-1">
                <Link
                  to="/forgot-password"
                  className="text-[#8A2BE2] font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
                <Link
                  to="/verify-otp"
                  className="text-emerald-600 text-xs font-medium hover:underline"
                >
                  Verify Account?
                </Link>
              </div>
            </div>

            {/* BUTTON */}
            <button
              disabled={isLoading}
              className="w-full bg-[#8A2BE2] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#7a26c9] transform hover:scale-[1.02] transition-all active:scale-[0.98] shadow-lg shadow-[#8A2BE2]/20 disabled:bg-gray-400"
            >
              {isLoading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

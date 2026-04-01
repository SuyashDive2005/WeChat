import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, User, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import styles from "./SignUpPage.module.css";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const SignUpPage = () => {
  const hasGoogleOauth = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, googleAuth, isSigningUp, isGoogleAuthing } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Full Name Is Required !");
    if (!formData.email.trim()) return toast.error("Email Is Required !");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid Email Format !");
    if (!formData.password.trim()) return toast.error("Password Is Required !");
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters !");
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (credentialResponse?.credential) {
      await googleAuth(credentialResponse.credential);
    }
  };
  return (
    <div
      className="min-h-screen grid lg:grid-cols-2 relative"
      style={{
        backgroundImage: 'url("/cloud-texture.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-400/40 via-primary-300/30 to-cyan-200/40 lg:col-span-1"></div>
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white/60 backdrop-blur-md relative z-10">
        <div className="w-full max-w-md space-y-8 ">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <img
                src="/WeChat-Logo.png"
                alt="WeChat Logo"
                className="size-12 rounded-lg group-hover:scale-110 transition-transform shadow-sm"
              />
              <h1 className="text-2xl font-bold mt-2 text-text-dark">
                Create Account
              </h1>
              <p className="text-text-light">
                Join now and unlock your free account!
              </p>
            </div>
          </div>

          {/* Google OAuth - Moved to Top */}
          {hasGoogleOauth && (
            <div className="space-y-3">
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-text-medium">
                  Sign Up with Google
                </p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {}}
                  text="signup_with"
                  shape="pill"
                  size="large"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-primary-200" />
                <span className="text-sm text-text-light">
                  or continue with email
                </span>
                <div className="h-px flex-1 bg-primary-200" />
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-primary-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-primary-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-white/70 transition-all"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-primary-400" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-primary-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-white/70 transition-all"
                  placeholder="you@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-primary-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-2.5 border-2 border-primary-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-white/70 transition-all"
                  placeholder="●●●●●●●●●"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  style={styles}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-primary-400" />
                  ) : (
                    <Eye className="size-5 text-primary-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSigningUp || isGoogleAuthing}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-text-medium">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 hover:underline font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join Our Community"
        subtitle="Create memories with friends, share your joy, and never miss a moment with the ones you love."
      />
    </div>
  );
};

export default SignUpPage;

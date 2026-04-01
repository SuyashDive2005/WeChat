import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, MessageCircle, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import styles from "./SignUpPage.module.css";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const hasGoogleOauth = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, googleAuth, isLoggingIn, isGoogleAuthing } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
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
              <div className="size-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all shadow-sm">
                <MessageCircle className="size-6 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-text-dark">
                Sign In
              </h1>
              <p className="text-text-light">
                Join Now and Elevate Your Experience. Your Free Account is Just
                a Click Away!
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={isLoggingIn || isGoogleAuthing}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-text-medium">
              Don&apos;t have an account ?{" "}
              <Link
                to="/signup"
                className="text-primary-600 hover:text-primary-700 hover:underline font-semibold transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>

          {hasGoogleOauth && (
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-primary-200" />
                <span className="text-sm text-text-light">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-primary-200" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-text-medium">Google</p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {}}
                  text="signin_with"
                  shape="pill"
                  size="large"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Welcomne Back!"
        subtitle="Sign in to continue conversations and catch up with your messages"
      />
    </div>
  );
};

export default LoginPage;

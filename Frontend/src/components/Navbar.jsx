import { useAuthStore } from "../store/useAuthStore";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1400px]">
      <div className="backdrop-blur-md rounded-full border border-white/20 shadow-lg px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-90 transition-all"
          >
            <img src="/WeChat-Logo.png" alt="WeChat" className="w-14 h-14" />
            <h1 className="text-xl font-bold text-white">WeChat</h1>
          </Link>

          {/* Right Section - Profile and Logout */}
          <div className="flex items-center gap-4">
            {authUser && (
              <>
                {/* User Name */}
                <Link
                  to="/profile"
                  className="text-white font-medium hover:opacity-80 transition-all hidden sm:inline"
                >
                  {authUser?.fullName || "Profile"}
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium transition-all border border-white/30 text-sm"
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

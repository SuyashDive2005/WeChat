import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const getErrorMessage = (error, fallbackMessage) => {
  return error?.response?.data?.message || fallbackMessage;
};

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isGoogleAuthing: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      console.log("Error in checkauth : ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to sign up. Please check if backend is running.",
        ),
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Unable to log in. Please try again."),
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  googleAuth: async (credential) => {
    set({ isGoogleAuthing: true });
    try {
      const res = await axiosInstance.post("/auth/google", { credential });
      set({ authUser: res.data });
      toast.success("Logged in with Google");
      get().connectSocket();
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Google login failed. Please try again."),
      );
    } finally {
      set({ isGoogleAuthing: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Unable to log out. Please try again."),
      );
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile");
      toast.error(
        getErrorMessage(error, "Unable to update profile. Please try again."),
      );
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) {
      return;
    }
    // connecting to socket io
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));

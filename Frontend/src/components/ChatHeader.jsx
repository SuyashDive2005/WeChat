import { X, CircleX } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="p-2.5 border-b border-white/20 bg-white/30 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-10 rounded-full object-cover"
              onError={(e) => {
                console.log(
                  "❌ Chat Avatar Load Error - Current src:",
                  e.target.src,
                );
                console.log(
                  "📊 Selected User profilePic:",
                  selectedUser?.profilePic,
                );
                e.target.src = "/avatar.png";
              }}
              onLoad={() => {
                if (selectedUser.profilePic) {
                  console.log(
                    "✅ Chat Avatar Loaded:",
                    selectedUser.profilePic,
                  );
                }
              }}
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-2.5 bg-accent-mint rounded-full ring-2 ring-white"></span>
            )}
          </div>
          {/* User Info */}
          <div>
            <h3 className="font-medium text-text-dark">
              {selectedUser.fullName}
            </h3>
            <p className="text-sm text-text-light">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        {/* Close btn */}
        <button
          onClick={() => setSelectedUser(null)}
          className="hover:bg-primary-100 p-2 rounded-lg transition-colors"
        >
          <X className="text-text-medium" />
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { User, Users, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setshowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = (
    showOnlineOnly
      ? users.filter((user) => onlineUsers.includes(user._id))
      : users
  ).filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-16 sm:w-20 lg:w-72 border-r border-white/20 bg-white/40 backdrop-blur-md flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-white/20 w-full p-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Users className="size-5" />
          <span className="font-semibold hidden lg:block">Chats</span>
        </div>

        {/* Search Box - Only visible on larger screens */}
        <div className="mt-3 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/60 border border-white/30 text-sm focus:outline-none focus:border-white/50 focus:bg-white/80 transition-all"
            />
          </div>
        </div>

        {/* Online Filter */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setshowOnlineOnly(e.target.checked)}
              className="w-4 h-4 accent-primary-500 rounded"
            />
            <span className="text-sm text-gray-600">Show Online Only</span>
          </label>
          <span className="text-xs text-gray-500 ml-auto">
            {onlineUsers.length - 1}
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-2 flex-1">
        {filteredUsers.map((user) => {
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 transition-all hover:bg-white/30 ${selectedUser?._id === user._id ? "bg-white/50 border-l-4 border-primary-500" : ""}`}
            >
              <div className="relative mx-auto lg:mx-0 flex-shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-10 lg:size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 lg:size-3.5 bg-green-500 rounded-full ring-2 ring-white" />
                )}
              </div>
              {/* User Info */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium truncate text-gray-800">
                  {user.fullName}
                </div>
                <div className="text-xs text-gray-500">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}
        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-8 text-sm">
            {searchQuery ? "No users found" : "No users online"}
          </div>
        )}
      </div>
    </aside>
  );
}

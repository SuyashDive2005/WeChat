import { Users } from "lucide-react";
export default function SidebarSkeleton() {
  const skeletonArray = Array(8).fill(null);
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-primary-200 bg-white flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-primary-200 w-full p-5">
        <div className="flex items-center gap-2 text-text-dark">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Chats</span>
        </div>
      </div>

      {/* Skeleton Chats */}
      <div
        className="overflow-y-auto w-full py-3"
        style={{ scrollbarWidth: "none" }}
      >
        {skeletonArray.map((_, idx) => {
          return (
            <div key={idx} className="w-full p-3 flex items-center gap-3">
              {/* Avatar skeleton */}
              <div className="relative mx-auto lg:mx-0">
                <div className="size-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-100 animate-pulse" />
              </div>
              {/* User info skeleton -only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="h-4 w-32 mb-2 bg-gradient-to-r from-primary-200 to-transparent rounded animate-pulse" />
                <div className="h-3 w-16 bg-gradient-to-r from-primary-100 to-transparent rounded animate-pulse" />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

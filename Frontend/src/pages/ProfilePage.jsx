import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div
      className="h-full min-h-screen pt-20 relative"
      style={{
        backgroundImage: 'url("/cloud-texture.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-400/40 via-primary-300/30 to-cyan-200/40"></div>
      <div className="max-w-2xl mx-auto p-4 py-8 relative z-10">
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white/20 p-6 space-y-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-700">
              {authUser?.fullName || "Profile"}
            </h1>
            <p className="mt-2 text-gray-600">Your Profile Information</p>
          </div>

          {/* Picture Upload Section */}
          <div className="flex flex-col items-center gap-4">
            {/* profile pic update section */}
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-36 rounded-full object-cover border-4 border-white/40 shadow-md"
                onError={(e) => {
                  console.log(
                    "❌ Image Load Error - Current src:",
                    e.target.src,
                  );
                  console.log("📊 Auth User profilePic:", authUser?.profilePic);
                  e.target.src = "/avatar.png";
                }}
                onLoad={() => {
                  console.log(
                    "✅ Image Loaded Successfully:",
                    selectedImg || authUser.profilePic,
                  );
                }}
              />
              <label
                htmlFor="avatar-upload"
                className={`
                                    absolute 
                                    bottom-0
                                    right-0 
                                    bg-gradient-to-r
                                    from-primary-500
                                    to-primary-600
                                    hover:from-primary-600
                                    hover:to-primary-700
                                    hover:scale-110
                                    p-2 
                                    rounded-full
                                    cursor-pointer 
                                    transition-all 
                                    duration-200
                                    shadow-md
                                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                    `}
              >
                <Camera className="size-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-600">
              {isUpdatingProfile
                ? "Uploading........"
                : "Click the Camera icon to update photo"}
            </p>
          </div>
          {/* user info section  */}

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-primary-600 font-semibold flex items-center gap-2">
                <User className="size-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 text-gray-700">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-primary-600 font-semibold flex items-center gap-2">
                <Mail className="size-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 text-gray-700">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Account Information
            </h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between py-2 border-b border-white/20">
                <span>Member Since</span>
                <span className="text-primary-600 font-semibold">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-accent-mint font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

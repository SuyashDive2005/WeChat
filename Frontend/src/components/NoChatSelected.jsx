export default function NoChatSelected() {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-teal-300/20 via-cyan-300/30 to-blue-400/20 backdrop-blur-md relative">
      {/* Background overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-white mix-blend-overlay"></div>
      </div>

      <div className="max-w-md text-center space-y-6 relative z-10">
        {/* Logo Display */}
        <div className="flex justify-center mb-6">
          <img
            src="/WeChat-Logo.png"
            alt="WeChat"
            className="w-28 h-28 lg:w-32 lg:h-32 drop-shadow-xl opacity-90"
          />
        </div>
        {/* Welcome Text */}
        <div className="space-y-3">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-700">
            Welcome to WeChat
          </h2>
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
            Select a Conversation from the sidebar to start chatting.
          </p>
        </div>
      </div>
    </div>
  );
}

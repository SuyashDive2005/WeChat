import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div
      className="h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url("/cloud-texture.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-400/40 via-primary-300/30 to-cyan-200/40"></div>

      <div className="flex items-center justify-center pt-20 px-4 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 w-full max-w-6xl h-[calc(100vh-8rem)] overflow-hidden">
          <div className="flex h-full rounded-2xl overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

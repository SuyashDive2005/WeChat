import { Send } from "lucide-react";

const Preview_Messages = [
  { id: 1, content: "Hey! How's it going ?", isSent: false },
  {
    id: 2,
    content: " I'm doing great! just working on something special.",
    isSent: true,
  },
];

const SettingsPage = () => {
  return (
    <div
      className="h-full min-h-screen container mx-auto px-4 pt-20 max-w-5xl relative"
      style={{
        backgroundImage: 'url("/cloud-texture.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-400/40 via-primary-300/30 to-cyan-200/40"></div>
      <div className="relative z-10">
        <div className="space-y-6 ">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-700">Style</h2>
            <p className="text-sm text-gray-600">
              Theme switching has been removed. The app now uses a clean white
              and primary teal accent style.
            </p>
          </div>

          {/* preview section */}
          <h3 className="text-lg font-semibold mb-3 text-gray-700"> Preview</h3>
          <div className="rounded-xl border border-white/20 overflow-hidden bg-white/40 backdrop-blur-lg shadow-lg">
            <div className="p-4 bg-white/30">
              <div className="max-w-lg mx-auto">
                {/* Mock chat UI */}
                <div className="bg-white/40 backdrop-blur-md rounded-xl shadow-sm overflow-hidden border border-white/20">
                  {/* chat header */}
                  <div className="px-4 py-3 border-b border-white/20 bg-white/30">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-medium">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-gray-700">
                          User Name
                        </h3>
                        <p className="text-xs text-gray-600 ">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* chat message */}

                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-gradient-to-b from-white/30 to-cyan-200/20 backdrop-blur-sm">
                    {Preview_Messages.map((message) => {
                      return (
                        <div
                          key={message.id}
                          className={`chat ${message.isSent ? "chat-end " : " chat-start"} `}
                        >
                          <div
                            className={`rounded-xl p-3 shadow-sm chat-bubble
                                                        
                                                        ${message.isSent ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white" : "bg-white/50 backdrop-blur-sm text-gray-700 "}
                                                        `}
                          >
                            <p className="text-sm ">{message.content}</p>
                            <p
                              className={`text-[10px] mt-1.5 
                                                        ${message.isSent ? "text-white/70" : "text-gray-500"}
                                                        `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-white/20 bg-white/30 backdrop-blur-sm">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 text-sm h-10 px-4 rounded-lg bg-white/40 border-b-2 border-white/30 focus:outline-none focus:border-white/50 focus:bg-white/50 transition-all"
                        placeholder="Type a message..."
                        value={"this is a preview"}
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 border-none">
                        <Send size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

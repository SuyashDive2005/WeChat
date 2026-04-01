import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import formatMessageTime from "../lib/Utils";

export default function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-teal-200/20 via-cyan-200/30 to-blue-300/20 backdrop-blur-lg"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#00bcb4" }}
      >
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              ref={messagesEndRef}
            >
              {!isOwnMessage && (
                <div className="mr-2">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="profile"
                    className="size-8 rounded-full object-cover"
                  />
                </div>
              )}
              <div
                className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}
              >
                <time className="text-xs text-gray-500 mb-1">
                  {formatMessageTime(message.createdAt)}
                </time>
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${isOwnMessage ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-none shadow-sm" : "bg-primary-100 text-text-dark rounded-bl-none"}`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
              {isOwnMessage && (
                <div className="ml-2">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="profile"
                    className="size-8 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
        <div />
      </div>
      <MessageInput />
    </div>
  );
}

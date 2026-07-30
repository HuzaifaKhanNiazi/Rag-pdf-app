import { useContext, useRef, useEffect } from "react";
import ChatCard from "./ChatCard";
import { AppContext } from "../App";

export const ChatsContainer = () => {
  const { chat, activeChatId, loadingmsg } = useContext(AppContext);
  const currChat = chat.find((c) => c.id === activeChatId);
  if (!currChat) return null;
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [currChat?.message, loadingmsg]);
  return (
    <div className="chats-area">
      {currChat.card && <ChatCard />}
      {currChat.message.map(function (msg) {
        return (
          <div
            key={msg.id}
            className={msg.role === "user" ? "user-msg" : "bot-msg"}
          >
            {msg.text}
          </div>
        );
      })}
      {loadingmsg && (
        <div className="loading-msg">
          <div className="dot" style={{ animationDelay: "0.2s" }}></div>
          <div className="dot" style={{ animationDelay: "0.3s" }}></div>
          <div className="dot" style={{ animationDelay: "0.4s" }}></div>
        </div>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};
export default ChatsContainer;

import { useContext } from "react";
import { AppContext } from "../App";
import SidebarHistoryFeature from "./SidebarHistoryFeature.jsx";

export const SidebarHistory = () => {
  const { chat, activeChatId, setActiveChatId, setHistoryChatOpen, search } =
    useContext(AppContext);
  const filteredChats = chat
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  return (
    <div className="recent-history-div">
      <p>Recents</p>

      <div className="chats-history">
        {filteredChats.map((msg) => {
          const activeId = msg.id === activeChatId;
          return (
            <div
              key={msg.id}
              className="subchats"
              onClick={() => {
                setHistoryChatOpen(true);
                setActiveChatId(msg.id);
              }}
            >
              <p>{msg.title}</p>
              <SidebarHistoryFeature chatId={msg.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarHistory;

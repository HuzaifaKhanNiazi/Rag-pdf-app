import { useContext } from "react";
import { AppContext } from "../App";
import { RiCloseFill } from "react-icons/ri";

export const SearchHistory = () => {
  const {
    search,
    setSearch,
    chat,
    activeChatId,
    setHistoryChatOpen,
    setActiveChatId,
    setIsSearchOpen,
  } = useContext(AppContext);

  const filteredChats = chat.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="search-chats-div">
      <div className="search-input-div">
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <RiCloseFill
          size={20}
          color="purple"
          cursor={"pointer"}
          onClick={() => {
            setIsSearchOpen(false);
          }}
        />
      </div>
      <div className="search-input-history">
        <p>Recent chats</p>
        {filteredChats.map((msg) => {
          const activeId = msg.id === activeChatId;

          return (
            <div
              key={msg.id}
              className={`subchats-history ${activeId ? "active-chat" : ""}`}
              onClick={() => {
                setHistoryChatOpen(true);
                setActiveChatId(msg.id);
              }}
            >
              <p>{msg.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

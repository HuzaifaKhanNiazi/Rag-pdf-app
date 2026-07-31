import { RiDeleteBinLine, RiEditBoxLine, RiPushpinLine } from "react-icons/ri";
import { useContext } from "react";
import { AppContext } from "../App";
export const SidebarHistoryFeature = ({ chatId }) => {
  const { chat, pinChat, deleteChat, renameChat } = useContext(AppContext);
  const currentChat = chat.find((item) => item.id === chatId);

  const handleRename = () => {
    const newTitle = prompt("Enter new chat name:", currentChat.title);

    if (newTitle && newTitle.trim()) {
      renameChat(chatId, newTitle.trim());
    }
  };
  return (
    <div
      style={{
        width: "40%",
        display: "flex",
        justifyContent: "space-between",
        padding: "0.188rem 0.625rem 0.188rem 0.625rem",
        cursor: "pointer",
        color: "gray",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <RiPushpinLine
        color={currentChat?.pinned ? "orange" : "gray"}
        onClick={() => pinChat(chatId)}
      />
      <RiEditBoxLine onClick={handleRename} />
      <RiDeleteBinLine
        onClick={() => {
          deleteChat(chatId);
        }}
      />
    </div>
  );
};
export default SidebarHistoryFeature;

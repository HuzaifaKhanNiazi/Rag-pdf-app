import { RiEdit2Fill, RiSearch2Line } from "react-icons/ri";
import SidebarHistory from "./SidebarHistory";
import { useContext } from "react";
import { AppContext } from "../App";

export const SidebarFeatures = () => {
  const {
    handleFileChange,
    loading,
    uploadMessage,
    functionHandler,
    handleNewChat,
    isSearchOpen,
    setIsSearchOpen,
    search,
    setSearch,
  } = useContext(AppContext);
  return (
    <div className="sidebar-history-options">
      <div className="options-div">
        <div className="newchat-div" onClick={handleNewChat}>
          <RiEdit2Fill />
          <p>New Chat</p>
        </div>
        <div
          className="searchchats-div"
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
          }}
        >
          <RiSearch2Line />
          <p>Search Chats</p>
        </div>
      </div>

      <div className="uploaddocs-input">
        <p>Upload Document</p>

        <input
          type="file"
          accept=".pdf ,.txt, .docx"
          onChange={handleFileChange}
        />
        <p className="upload-msg">
          {uploadMessage && <p className="message"> {uploadMessage}</p>}
        </p>
        <button onClick={functionHandler} disabled={loading}>
          {loading ? "Processing..." : "Upload"}
        </button>
      </div>
      <SidebarHistory />
    </div>
  );
};
export default SidebarFeatures;

import { createContext, useState, useEffect } from "react";
import Container from "./components/Container";
import Sidebar from "./components/Sidebar";
import { SearchHistory } from "./components/SearchHistory";
const API = import.meta.env.VITE_API_URL;
export const AppContext = createContext();

export const App = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loadingmsg, setLoadingmsg] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [historyChatOpen, setHistoryChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const functionHandler = async () => {
    if (!file) {
      setUploadMessage("Please upload a file first");
      return;
    }
    setIsUpload(true);
    if (!isOnline) {
      setUploadMessage("No internet connection");
      return;
    }
    await apiCall();
  };

  const messagesHandler = async () => {
    if (!isUpload) {
      setUploadMessage("Please upload a file first");
      return;
    }
    if (!value.trim()) return;
    const currprompt = value;
    setChat((prev) =>
      prev.map((c) => (c.id === activeChatId ? { ...c, card: false } : c)),
    );
    setValue("");
    setDisable(true);
    setLoadingmsg(true);
    if (!isOnline) {
      setUploadMessage("No internet connection");
      return;
    }
    await chatsHandler(currprompt);
    setLoadingmsg(false);
    setDisable(false);
  };

  const handleFileChange = (e) => {
    const selectedfile = e.target.files[0];
    setFile(selectedfile);
    setUploadMessage("");
  };

  const apiCall = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await fetch(API, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "upload Failed");
      }
      setUploadMessage(`${data.filename} uploaded successfully`);
    } catch (error) {
      setUploadMessage(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const chatsHandler = async (prompt) => {
    const usermessage = {
      id: Date.now() + Math.random(),
      role: "user",
      text: prompt,
    };
    setChat((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              title: c.message.some((m) => m.role === "user")
                ? c.title
                : prompt.slice(0, 30),
              message: [...c.message, usermessage],
            }
          : c,
      ),
    );
    let data;
    try {
      const response = await fetch("http://127.0.0.1:8000/usermessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: prompt,
        }),
      });
      if (!response.ok) {
        throw new Error("Can't fetch data");
      }
      data = await response.json();
    } catch (error) {
      console.log(error);
      data = { response: "Sorry, something went wrong. Please try again." };
    }
    const botmessage = {
      id: Date.now() + Math.random(),
      role: "bot",
      text: data.response,
    };
    setChat((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              title: c.title === "New Chat" ? prompt.slice(0, 30) : c.title,
              message: [...c.message, botmessage],
            }
          : c,
      ),
    );
  };
  function createNewchat(title = "New Chat") {
    return {
      id: Date.now() + Math.random(),
      title,
      message: [],
      card: true,
      pinned: false,
    };
  }

  const pinChat = (chatId) => {
    setChat((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat,
      ),
    );

    // setMenuOpenForId(null);
  };

  const deleteChat = (chatId) => {
    setChat((prev) => {
      const updatedChats = prev.filter((chat) => chat.id !== chatId);

      // Agar saari chats delete ho gayi
      if (updatedChats.length === 0) {
        const newChat = createNewchat();

        setActiveChatId(newChat.id);

        return [newChat];
      }

      // Agar active chat delete ho rahi hai
      if (chatId === activeChatId) {
        setActiveChatId(updatedChats[0].id);
      }

      return updatedChats;
    });
  };
  const renameChat = (chatId, newTitle) => {
    setChat((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat,
      ),
    );
  };

  const handleNewChat = () => {
    const Newchat = createNewchat();
    setChat((prev) => {
      const updated = [Newchat, ...prev];
      return updated;
    });
    setActiveChatId(Newchat.id);
  };
  useEffect(() => {
    const initialChat = createNewchat();
    setChat([initialChat]);
    setActiveChatId(initialChat.id);
    setHistoryChatOpen(true);
  }, []);

  const handlekey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (value.trim() && !disable) {
        messagesHandler();
      }
    }
  };

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1025) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <AppContext.Provider
      value={{
        value,
        setValue,
        functionHandler,
        handleFileChange,
        loading,
        uploadMessage,
        chatsHandler,
        chat,
        activeChatId,
        setActiveChatId,
        loadingmsg,
        disable,
        setDisable,
        handlekey,
        messagesHandler,
        handleNewChat,
        isMenuOpen,
        setIsMenuOpen,
        setHistoryChatOpen,
        pinChat,
        deleteChat,
        renameChat,
        isSidebarOpen,
        setIsSidebarOpen,
        search,
        setSearch,
        isSearchOpen,
        setIsSearchOpen,
        isOnline,
        setIsOnline,
      }}
    >
      <div className="parent">
        <Sidebar />
        {historyChatOpen && <Container />}
        {isSearchOpen && <SearchHistory />}
        {!isOnline && (
          <div className="offline-banner">⚠️ No internet connection</div>
        )}
      </div>
    </AppContext.Provider>
  );
};
export default App;

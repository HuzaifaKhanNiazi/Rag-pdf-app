import logoimg from "../assets/logoimg.png";
export const ChatCard = () => {
  return (
    <div className="chatbot-card">
      <img
        src={logoimg}
        alt=""
        style={{
          height: "5rem",
          width: "5rem",
          objectFit: "cover",
          background: "none",
        }}
      />
      <span style={{ display: "flex", gap: "0.188rem", margin: "0.625rem" }}>
        <h1 style={{ color: "orange" }}>Ask</h1>
        <h1 style={{ color: "blue" }}>PDF</h1>
      </span>
      <p style={{ textAlign: "center" }}>Ask anything about your documents</p>
    </div>
  );
};
export default ChatCard;

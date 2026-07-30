import logoimg from "../assets/logoimg.png";
export const ChatCard = () => {
  return (
    <div className="chatbot-card">
      <img
        src={logoimg}
        alt=""
        style={{
          height: "80px",
          width: "80px",
          objectFit: "cover",
          background: "none",
        }}
      />
      <span style={{ display: "flex", gap: "3px", margin: "10px" }}>
        <h1 style={{ color: "orange" }}>Ask</h1>
        <h1 style={{ color: "blue" }}>PDF</h1>
      </span>
      <p>Ask anything about your documents</p>
      {/* <p
        style={{
          margin: "10px",
          color: "lightgrey",
          fontSize: "13px",
          textAlign: "center",
        }}
      >
        Upload your document using sidebar and then <br />
        start question answering
      </p> */}
    </div>
  );
};
export default ChatCard;

import { useContext } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { AppContext } from "../App";
export const Containerinput = () => {
  const { value, setValue, disable, setDisable, handlekey, messagesHandler } =
    useContext(AppContext);

  return (
    <div className="input-div">
      <input
        type="text"
        placeholder="Ask me about your documents"
        onKeyDown={(e) => {
          handlekey(e);
        }}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value == "") {
            setDisable(true);
          } else {
            setDisable(false);
          }
        }}
        value={value}
      />
      <div className="sendmsg-div">
        <button
          onClick={messagesHandler}
          disabled={disable}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <RiSendPlaneFill color={disable ? "lightgrey" : "purple"} size={36} />
        </button>
      </div>
    </div>
  );
};
export default Containerinput;

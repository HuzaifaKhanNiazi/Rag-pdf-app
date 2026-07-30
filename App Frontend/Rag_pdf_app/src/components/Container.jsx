import ChatsContainer from "./ChatsContainer";
import Containerinput from "./Containerinput";

export const Container = () => {
  return (
    <div className="main-container">
      <div className="container2">
        <ChatsContainer />
        <Containerinput />
      </div>
    </div>
  );
};
export default Container;

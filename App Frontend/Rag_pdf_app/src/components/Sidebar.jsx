import { RiLayoutLeftLine } from "react-icons/ri";
import logonav from "../assets/logonav.png";
import { SidebarFeatures } from "./SidebarFeatures";
import { useContext } from "react";
import { AppContext } from "../App";
export const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  return (
    <div className={isSidebarOpen ? "sidebar-div" : "sidebar-div active"}>
      <div className="sidebar-nav">
        <div className="logo">
          <img
            src={logonav}
            alt="app-logo"
            style={{
              height: "45px",
              width: "45px",
              objectFit: "contain",
              background: "none",
            }}
          />
          <span style={{ display: "flex", gap: "3px" }}>
            <h3 style={{ color: "orange" }}>Ask</h3>
            <h3 style={{ color: "blue" }}>PDF</h3>
          </span>
        </div>
        <RiLayoutLeftLine
          className="sidebar-openclose-div"
          color="lightgrey"
          size={30}
          style={{ cursor: "pointer", padding: "5px", borderRadius: "5px" }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
      <SidebarFeatures />
    </div>
  );
};
export default Sidebar;

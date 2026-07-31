import { RiMenuFill } from "react-icons/ri";

export const Containernav = () => {
  return (
    <div className="navbar">
      <span style={{ display: "flex", gap: "0.188rem", margin: "0.625rem" }}>
        <h3 style={{ color: "orange" }}>Ask</h3>
        <h3 style={{ color: "blue" }}>PDF</h3>
      </span>
      <RiMenuFill />
    </div>
  );
};
export default Containernav;

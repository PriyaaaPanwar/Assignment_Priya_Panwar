import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { BsList } from "react-icons/bs";

const defaultNodeLabels = {
  input: "Start",
  filterdata: "Filter Data",
  wait: "Wait",
  "convert-format": "Convert Format",
  "send-post-request": "Send POST Request",
  output: "End",
};

const DraggableNode = ({ type }) => (
  <div
    className="draggable-node"
    onDragStart={(event) => {
      event.dataTransfer.setData("application/reactflow", type);
      event.dataTransfer.effectAllowed = "move";
    }}
    draggable
  >
    {defaultNodeLabels[type]}
  </div>
);

const Sidebar = ({ onSidebarToggle }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    onSidebarToggle(); // Notify parent component about the toggle
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="toggle-btn">
          {collapsed ? <BsList /> : <BsList />}
        </button>
      </div>
      <div className={`sidebar-content ${collapsed ? "hidden" : ""}`}>
        <div className="text-center text-lg my-3">WorkFlow Nodes</div>
        {Object.keys(defaultNodeLabels).map((type) => (
          <DraggableNode key={type} type={type} />
        ))}
        <Link className="execute-btn" to={"/execute"}>
          Execute WorkFlow
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

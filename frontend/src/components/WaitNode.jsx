// src/nodes/WaitNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";
import { AiOutlineHourglass } from "react-icons/ai";
import "./style.css";
const WaitNode = ({ id }) => {
  return (
    <>
      <div className="node wait-node">
        <AiOutlineHourglass size={24} />
        <div className="node-header">Wait</div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default WaitNode;

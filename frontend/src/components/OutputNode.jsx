// src/nodes/OutputNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";
import { AiFillStop } from "react-icons/ai";

const OutputNode = ({ id }) => {
  return (
    <>
      <div className="node output-node">
        <AiFillStop size={24} />
        <div className="node-header">End</div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
};

export default OutputNode;

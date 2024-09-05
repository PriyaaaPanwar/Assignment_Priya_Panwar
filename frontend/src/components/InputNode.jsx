// src/nodes/InputNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";
import { AiFillPlayCircle } from "react-icons/ai";

const InputNode = ({ id }) => {
  return (
    <>
      <div className="node input-node">
        <AiFillPlayCircle size={24} />
        <div className="node-header">Start</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default InputNode;

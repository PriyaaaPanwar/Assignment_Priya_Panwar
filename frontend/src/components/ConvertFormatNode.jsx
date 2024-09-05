// src/nodes/ConvertFormatNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";
import { BiTransferAlt } from "react-icons/bi";
import "./style.css";
const ConvertFormatNode = ({ id }) => {
  return (
    <>
      <div className="node convert-format-node">
        <BiTransferAlt size={24} />
        <div className="node-header">Convert Format</div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default ConvertFormatNode;

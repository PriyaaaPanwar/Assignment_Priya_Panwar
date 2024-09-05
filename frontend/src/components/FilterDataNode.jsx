// src/nodes/FilterDataNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";
import { FaFilter } from "react-icons/fa";

const FilterDataNode = ({ id }) => {
  return (
    <>
      <div className="node filterdata-node">
        <FaFilter size={24} />
        <div className="node-header">Filter Data</div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default FilterDataNode;

import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Navbar from "./Navbar";
import InputNode from "./InputNode";
import FilterDataNode from "./FilterDataNode";
import WaitNode from "./WaitNode";
import ConvertFormatNode from "./ConvertFormatNode";
import TextNode from "./TextNode";
import OutputNode from "./OutputNode";

// Define custom node types
const nodeTypes = {
  input: InputNode,
  filterdata: FilterDataNode,
  wait: WaitNode,
  "convert-format": ConvertFormatNode,
  "send-post-request": TextNode,
  output: OutputNode,
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
  // Add more initial nodes if needed
];

const getId = () => uuidv4(); // Use UUID for unique node IDs

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [workflowId, setWorkflowId] = useState("");
  const [workflowIds, setWorkflowIds] = useState([]); // Store list of workflow IDs

  useEffect(() => {
    // Fetch workflow IDs or other initialization tasks
    fetchWorkflowIds();
  }, []);

  useEffect(() => {
    if (!workflowId) {
      setWorkflowId(generateUniqueId()); // Generate workflow ID if not set
    }
  }, [workflowId]);

  const fetchWorkflowIds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/workflows/ids"
      );
      setWorkflowIds(response.data); // Update the list of workflow IDs
    } catch (error) {
      console.error("Error fetching workflow IDs:", error);
    }
  };

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowInstance) return; // Ensure the instance is initialized

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const label = getLabelByType(type);

      console.log("Dropped node type:", type); // Debugging

      setNodes((nds) =>
        nds.concat({
          id: getId(),
          type,
          data: { label },
          position,
        })
      );
    },
    [reactFlowInstance]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const getLabelByType = (type) => {
    switch (type) {
      case "input":
        return "Start";
      case "filterdata":
        return "Filter Data";
      case "wait":
        return "Wait";
      case "convert-format":
        return "Convert Format";
      case "send-post-request":
        return "Send POST Request";
      case "output":
        return "End";
      default:
        return type;
    }
  };

  const generateUniqueId = () => {
    return uuidv4();
  };

  const saveWorkflow = async () => {
    try {
      console.log("edges: ", edges);
      const response = await axios.post(
        "http://localhost:5000/api/workflows/save",
        {
          workflowId: workflowId,
          nodes,
          edges,
        }
      );
      setWorkflowId(response.data.workflowId); // Only set the response workflow ID
      console.log(response.data);
    } catch (error) {
      console.error("Error saving workflow:", error);
    }
  };

  const loadWorkflow = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/workflows/load/${workflowId}`
      );
      const nodes = response.data.nodes || []; // Fallback to empty array if null
      const edges = response.data.edges || []; // Fallback to empty array if null
      console.log("Loaded edges: ", edges);
      setNodes(nodes);
      setEdges(edges);
    } catch (error) {
      console.error("Error loading workflow:", error);
    }
  };

  return (
    <>
      <Navbar
        workflowId={workflowId}
        saveWorkflow={saveWorkflow}
        loadWorkflow={loadWorkflow}
        setWorkflowId={setWorkflowId}
      />
      <div
        ref={reactFlowWrapper}
        style={{ height: "100vh" }}
        onDragOver={onDragOver} // Add this
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          fitView
          nodeTypes={nodeTypes} // Register custom node types
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};

export default Flow;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = ({ saveWorkflow, loadWorkflow, workflowId, setWorkflowId }) => {
  const [workflowIds, setWorkflowIds] = useState([]); // State to hold the list of workflow IDs

  useEffect(() => {
    // Fetch all saved workflow IDs from the backend when the component mounts
    fetchWorkflowIds();
  }, []);

  const fetchWorkflowIds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/workflows/ids"
      );
      console.log(response.data);
      setWorkflowIds(response.data); // Update the list of workflow IDs
    } catch (error) {
      console.error("Error fetching workflow IDs:", error);
    }
  };

  const handleSaveWorkflow = async () => {
    try {
      // Perform save workflow functionality here
      saveWorkflow();
    } catch (error) {
      console.error("Error saving workflow:", error);
    }
  };

  const handleLoadWorkflow = async () => {
    try {
      // Perform load workflow functionality here
      loadWorkflow();
    } catch (error) {
      console.error("Error loading workflow:", error);
    }
  };

  const handleWorkflowIdChange = (e) => {
    setWorkflowId(e.target.value);
  };

  return (
    <>
      <div className="navbar">
        <h1 className="navbar-title">WorkFlow Builder</h1>

        <div className="navbar-content">
          <div className="workflow-info">
            <h3>Workflow ID: {workflowId}</h3>
            <button onClick={handleSaveWorkflow} className="button-primary">
              Save Workflow
            </button>
          </div>

          <div className="workflow-actions">
            <select
              id="workflowIdDropdown"
              className="workflow-dropdown"
              onChange={handleWorkflowIdChange}
            >
              <option value="">Select a Workflow ID</option>
              {workflowIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
            <button onClick={handleLoadWorkflow} className="button-primary">
              Load Workflow
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

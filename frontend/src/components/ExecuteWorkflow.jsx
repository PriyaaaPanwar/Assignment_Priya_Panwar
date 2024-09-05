import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = ({ onFileChange }) => (
  <div className="my-7">
    <label
      className="block mb-2 text-sm font-medium text-gray-900"
      htmlFor="file_input"
    >
      Upload file
    </label>
    <input
      className="block w-full text-md border border-black rounded-lg cursor-pointer"
      id="file_input"
      type="file"
      onChange={onFileChange}
    />
  </div>
);

const WorkflowSelector = ({ workflowIds, onWorkflowIdChange }) => (
  <div className="flex justify-center items-center">
    <label htmlFor="workflowIdDropdown" className="text-xl mr-2">
      Select Workflow ID:
    </label>
    <select
      id="workflowIdDropdown"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-2/5 p-2.5 mr-3"
      onChange={onWorkflowIdChange}
    >
      <option value="">Select an ID</option>
      {workflowIds.map((id) => (
        <option key={id} value={id}>
          {id}
        </option>
      ))}
    </select>
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="w-96 h-4 mb-4 bg-gray-200 rounded-full">
    <div
      className="h-4 bg-blue-600 rounded-full"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const App = () => {
  const [file, setFile] = useState(null);
  const [outputData, setOutputData] = useState([]);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [progress, setProgress] = useState(0);
  const [workflowIds, setWorkflowIds] = useState([]);
  const [workflowId, setWorkflowId] = useState("");

  useEffect(() => {
    fetchWorkflowIds();
  }, []);

  const fetchWorkflowIds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/workflows/ids"
      );
      setWorkflowIds(response.data);
    } catch (error) {
      console.error("Error fetching workflow IDs:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("workflowId", workflowId);

      const response = await axios.post(
        "http://localhost:5000/api/workflows/execute",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progressPercent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 50
            );
            setProgress(progressPercent);
          },
        }
      );

      setOutputData(response.data.data);
      console.log(response.data.data);
      console.log("Workflow execution successful");

      await convertToJSONBackend();
    } catch (error) {
      console.error("Error executing workflow:", error);
      alert("Failed to execute workflow");
    }
  };

  const convertToJSONBackend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/convert-to-json",
        { outputData }
      );

      setJsonOutput(response.data.jsonOutput);
      console.log(response.data.jsonOutput);
      setProgress(100);
      console.log("Conversion to JSON successful");
    } catch (error) {
      console.error("Error converting to JSON:", error);
    }
  };

  const handleExecute = () => {
    if (!file) {
      alert("Please upload a file");
      return;
    }

    if (!workflowId) {
      alert("Please select a workflow ID");
      return;
    }

    handleSubmit();
  };

  return (
    <div className="w-3/5 mx-auto my-4">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold">Workflow Execution</h2>

        <FileUpload onFileChange={handleFileChange} />
        <WorkflowSelector
          workflowIds={workflowIds}
          onWorkflowIdChange={(e) => setWorkflowId(e.target.value)}
        />
        <button
          type="button"
          onClick={handleExecute}
          className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Run Workflow
        </button>
        <ProgressBar progress={progress} />
        {progress === 100 && (
          <p className="text-md font-bold text-green-700">
            Workflow Execution completed
          </p>
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useState, memo } from "react";
import { Handle, Position } from "reactflow";
import axios from "axios";
import "./style.css";

const SendPostRequestNode = memo(({ id }) => {
  const [url, setUrl] = useState(""); // User input URL
  const [payload, setPayload] = useState("{}"); // User input JSON payload
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSendRequest = async () => {
    try {
      const result = await axios.post(url, JSON.parse(payload));
      setResponse(result.data);
      setError(null); // Clear previous errors
    } catch (error) {
      console.error("Error sending POST request:", error);
      setResponse(null); // Clear previous responses
      setError("Error sending request");
    }
  };

  return (
    <>
      <div className="wrapper gradient p-4">
        <div className="inner">
          <div>
            <label>URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-field"
              placeholder="Enter URL here"
            />
          </div>
          <div>
            <label>Payload (JSON):</label>
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="text-area"
              placeholder='{"key": "value"}'
            />
          </div>
          <button onClick={handleSendRequest} className="btn-send">
            Send Request
          </button>
          {response && (
            <div className="response">
              <h4>Response:</h4>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
          {error && (
            <div className="error">
              <h4>Error:</h4>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});

export default SendPostRequestNode;

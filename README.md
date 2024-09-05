# ReactFlow Workflow Application

This is a web application that allows users to create, manage, and execute workflows using a visual node-based interface. It consists of two main parts:
- **Frontend**: Built with React and ReactFlow.
- **Backend**: Built with Node.js and Express for handling API requests and managing workflow data.

## Table of Contents
1. [Features](#features)
2. [API Endpoints](#api-endpoints)
3. [Frontend Setup](#frontend-setup)
4. [Backend Setup](#backend-setup)
5. [Running the Project](#running-the-project)
6. [Tech Stack](#tech-stack)
7. [License](#license)

## Features
- Drag and drop interface for creating workflows.
- Nodes include input, filter data, wait, convert format, send POST request, and output nodes.
- Save workflows to a backend server.
- Load previously saved workflows.
- Visual representation of workflows with flow charts.

## API Endpoints

### 1. **Fetch Workflow IDs**
- **Endpoint**: `/api/workflows/ids`
- **Method**: `GET`
- **Description**: Retrieves a list of available workflow IDs.
- **Response**: Returns a list of workflow IDs stored on the server.

### 2. **Save Workflow**
- **Endpoint**: `/api/workflows/save`
- **Method**: `POST`
- **Description**: Saves a workflow with its nodes and edges.
- **Request Body**:
  ```json
  {
    "workflowId": "string",
    "nodes": [/* array of nodes */],
    "edges": [/* array of edges */]
  }
- **Response**:
  ```json
  {
    "workflowId": "string",
  }
### 3. **Load Workflow**
- **Endpoint**: `/api/workflows/load/:id`
- **Method**: `GET`
- **Description**: Loads a specific workflow by its `workflowId`.
- **Response**:
  ```json
  {
    "nodes": [/* array of nodes */],
    "edges": [/* array of edges */]
  }
## Frontend Setup

### Prerequisites
- Node.js (version 14 or above)
- npm (version 6 or above)

### Steps to Run
1. Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React application:
    ```bash
    npm start
    ```
   Open the application in your browser at [http://localhost:3000](http://localhost:3000).

### Directory Structure (Frontend)
```plaintext
frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   │   ├── Navbar.js
  │   │   ├── InputNode.js
  │   │   ├── FilterDataNode.js
  │   │   ├── WaitNode.js
  │   │   ├── ConvertFormatNode.js
  │   │   ├── TextNode.js
  │   │   └── OutputNode.js
  │   ├── App.js
  │   └── Flow.js
  ├── package.json
  └── README.md
```
## Backend Setup

### Prerequisites
- Node.js (version 14 or above)
- MongoDB (for workflow persistence)

### Steps to Run
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables:
   - Create a `.env` file in the backend folder.
   - Add the following environment variables:
     ```makefile
     PORT=5000
     MONGO_URI=<your-mongodb-connection-string>
     ```
4. Start the backend server:
    ```bash
    npm run dev
    ```
   The backend server will run at [http://localhost:5000](http://localhost:5000).

### Directory Structure (Backend)
```plaintext
backend/
  ├── controllers/
  │   └── workflowController.js
  ├── models/
  │   └── Workflow.js
  ├── routes/
  │   └── workflowRoutes.js
  ├── server.js
  ├── package.json
  └── README.md
```
## Running the Project

### Step-by-Step Instructions

1. **Start the Backend:**
    ```bash
    cd backend
    npm run dev
    ```
   This will start the backend API server on [http://localhost:5000](http://localhost:5000).

2. **Start the Frontend:**
   - Open another terminal and navigate to the frontend directory:
     ```bash
     cd frontend
     npm start
     ```
   This will start the React application on [http://localhost:3000](http://localhost:3000).

3. **Use the Application:**
   - Go to [http://localhost:3000](http://localhost:3000) in your browser.
   - Use the drag-and-drop interface to create your workflow.
   - Save the workflow using the "Save Workflow" button in the navbar.
   - Load saved workflows by entering the workflow ID.

### Tech Stack

**Frontend**
- React.js
- ReactFlow for node-based UI
- Axios for API requests
- Bootstrap for UI components

**Backend**
- Node.js
- Express.js for the server
- MongoDB for database
- Mongoose for data modeling


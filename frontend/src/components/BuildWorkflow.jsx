import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Flow from "./Flow";

const BuildWorkflow = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="h-full w-full flex">
      <div
        className={`${
          isSidebarCollapsed ? "collapsed" : ""
        } fixed inset-y-0 z-[80] bg-gray-900`}
      >
        <Sidebar onSidebarToggle={handleSidebarToggle} />
      </div>

      {/* Main Content Area */}
      <main
        className={` w-full main-content ${isSidebarCollapsed ? "full" : ""}`}
      >
        <div style={{ width: "100%", height: "90vh" }}>
          <Flow />
        </div>
      </main>
    </div>
  );
};

export default BuildWorkflow;

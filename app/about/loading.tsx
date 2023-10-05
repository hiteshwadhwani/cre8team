import React from "react";

function loading() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-opacity-50"></div>
      </div>
    </div>
  );
}

export default loading;

// components/ui/Loading.jsx
import React from "react";

const Loading = ({ message = "Loading...", fullScreen = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "fixed inset-0 bg-white bg-opacity-75 z-50" : ""
      }`}
    >
      <img src="/loaader.gif" alt="Loading..." className="w-24 h-24 mb-4" />
      <p className="text-emerald-600 text-lg">{message}</p>
    </div>
  );
};

export default Loading;

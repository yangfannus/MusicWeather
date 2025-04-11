import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
      <div className="flex flex-col items-center animate-pulse-slow">
        <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin mb-4"></div>
        <div className="text-xl text-white font-medium">加载中...</div>
      </div>
    </div>
  );
};

export default Loading; 
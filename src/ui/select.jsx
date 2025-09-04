import React from 'react';

const Select = ({ children, ...props }) => {
  return (
    <select className="border border-gray-300 p-2 rounded" {...props}>
      {children}
    </select>
  );
};

const SelectTrigger = ({ children, ...props }) => {
  return (
    <div className="border border-gray-300 p-2 rounded flex items-center justify-between" {...props}>
      {children}
      <span className="ml-2">▼</span>
    </div>
  );
};

const SelectValue = ({ placeholder, ...props }) => {
  return (
    <span className="text-gray-700" {...props}>
      {placeholder}
    </span>
  );
};

const SelectContent = ({ children, ...props }) => {
  return (
    <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg mt-1 w-full" {...props}>
      {children}
    </div>
  );
};

const SelectItem = ({ children, ...props }) => {
  return (
    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" {...props}>
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };



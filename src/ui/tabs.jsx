import React from 'react';

const Tabs = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

const TabsList = ({ children, ...props }) => {
  return (
    <div className="flex border-b" {...props}>
      {children}
    </div>
  );
};

const TabsTrigger = ({ children, ...props }) => {
  return (
    <button className="px-4 py-2 -mb-px border-b-2 border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500" {...props}>
      {children}
    </button>
  );
};

const TabsContent = ({ children, ...props }) => {
  return (
    <div className="py-4" {...props}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };



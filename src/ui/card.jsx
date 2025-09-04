import React from 'react';

const Card = ({ children, ...props }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4" {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, ...props }) => {
  return (
    <div className="p-6 pt-0" {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, ...props }) => {
  return (
    <div className="flex flex-col space-y-1.5 p-6" {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, ...props }) => {
  return (
    <h3 className="text-2xl font-semibold leading-none tracking-tight" {...props}>
      {children}
    </h3>
  );
};

export { Card, CardContent, CardHeader, CardTitle };



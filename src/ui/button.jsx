import React from 'react';

const Button = ({ children, ...props }) => {
  return (
    <button className="bg-green-500 text-white px-4 py-2 rounded" {...props}>
      {children}
    </button>
  );
};

export { Button };



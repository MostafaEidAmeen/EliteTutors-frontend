import React from 'react';

const Input = ({ ...props }) => {
  return (
    <input className="border border-gray-300 p-2 rounded" {...props} />
  );
};

export { Input };



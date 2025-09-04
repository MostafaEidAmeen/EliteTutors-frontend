import React from 'react';

const Checkbox = ({ id, label, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        {...props}
      />
      {label && (
        <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
          {label}
        </label>
      )}
    </div>
  );
};

export { Checkbox };



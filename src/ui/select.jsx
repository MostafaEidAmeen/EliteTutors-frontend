import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const SelectContext = createContext();

const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (newValue) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <SelectContext.Provider value={{ selectedValue, handleSelect, toggleOpen, isOpen }}>
      <div className="relative" ref={ref}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ children, placeholder, className, ...props }) => {
  const { toggleOpen, selectedValue, isOpen } = useContext(SelectContext);
  return (
    <div
      className={`border border-gray-300 p-2 rounded flex items-center justify-between cursor-pointer ${className}`}
      onClick={toggleOpen}
      {...props}
    >
      {selectedValue ? children : <span className="text-gray-500">{placeholder}</span>}
      <span className={`ml-2 transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
    </div>
  );
};

const SelectValue = ({ children }) => {
  const { selectedValue } = useContext(SelectContext);
  return <>{children}</>;
};

const SelectContent = ({ children, className, ...props }) => {
  const { isOpen } = useContext(SelectContext);
  return isOpen ? (
    <div
      className={`absolute z-10 bg-white border border-gray-300 rounded shadow-lg mt-1 w-full max-h-60 overflow-y-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  ) : null;
};

const SelectItem = ({ value, children, className, ...props }) => {
  const { selectedValue, handleSelect } = useContext(SelectContext);
  const isSelected = selectedValue === value;
  return (
    <div
      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${isSelected ? 'bg-blue-100' : ''} ${className}`}
      onClick={() => handleSelect(value)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };



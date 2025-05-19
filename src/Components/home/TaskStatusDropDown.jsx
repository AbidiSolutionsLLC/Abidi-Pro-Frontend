import React, { useState, useRef, useEffect } from 'react';

const TaskStatusDropDown = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const statuses = ['InProgress', 'Hold', 'UnderReview', 'Completed'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStatusChange = (newStatus) => {
    onChange(newStatus);
    setIsOpen(false);
  };

  const statusColor = {
    Completed: 'bg-green-100 text-green-800',
    InProgress: 'bg-slate-500 text-white',
    Hold: 'bg-red-500 text-white',
    UnderReview: 'bg-yellow-500 text-white',
  };

  // Optional: close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full h-full text-left z-50">
      {/* Status Button */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
        className={`w-full h-full flex items-center justify-center cursor-pointer px-3 py-1 rounded-sm ${statusColor[status] || 'bg-slate-500 text-white'}`}
      >
        {status}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-50">
          {statuses.map((s) => (
            <div
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(s);
              }}
              className="w-full px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskStatusDropDown;

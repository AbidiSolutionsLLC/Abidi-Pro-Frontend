import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const AddTaskDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="w-full sm:w-1/2 bg-white h-full shadow-lg flex flex-col p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Add Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">&times;</button>
        </div>

        {/* Form */}
        <form className="space-y-4 overflow-y-auto flex-1">
          <input
            type="text"
            placeholder="Task Name"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="date"
                placeholder="Start Date"
                className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="date"
                placeholder="End Date"
                className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
            </div>
          </div>

          <textarea
            placeholder="Description"
            rows="3"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Assigned To"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Assigned By"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Priority"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200">
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskDrawer;

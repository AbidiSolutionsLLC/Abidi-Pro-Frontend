import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarNavigator = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrev = () => {
    setSelectedDate(prev => new Date(prev.setDate(prev.getDate() - 1)));
  };

  const handleNext = () => {
    setSelectedDate(prev => new Date(prev.setDate(prev.getDate() + 1)));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-white rounded-md shadow px-2 py-1">
        <button onClick={handlePrev} className="p-2 hover:bg-gray-100 rounded">
          <FiChevronLeft />
        </button>

        {/* This input works: calendar opens on click */}
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          customInput={
            <button className="p-2 hover:bg-gray-100 rounded">
              <FiCalendar />
            </button>
          }
          popperPlacement="bottom-start"
  popperClassName="z-50"
  portalId="root-portal"
        />

        <button onClick={handleNext} className="p-2 hover:bg-gray-100 rounded">
          <FiChevronRight />
        </button>
      </div>

      <span className="text-gray-800 font-medium">
        {selectedDate.toDateString()}
      </span>
    </div>
  );
};

export default CalendarNavigator;

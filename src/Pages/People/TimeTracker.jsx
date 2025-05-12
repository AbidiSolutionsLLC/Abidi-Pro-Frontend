import React, { useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimeTracker = () => {
  const timeSheets = [
    {
      id: "current",
      data: [
        { date: "10-02-2024", checkinTime: "3:00 PM", checkoutTime: "10:00 PM", totalHours: "7", status: "Approved" },
        { date: "11-02-2024", checkinTime: "2:00 PM", checkoutTime: "10:00 PM", totalHours: "8", status: "Approved" },
        { date: "12-02-2024", checkinTime: "4:00 PM", checkoutTime: "10:00 PM", totalHours: "6", status: "Denied" },
        { date: "11-02-2024", checkinTime: "2:00 PM", checkoutTime: "10:00 PM", totalHours: "8", status: "Approved" },
        { date: "11-02-2024", checkinTime: "2:00 PM", checkoutTime: "10:00 PM", totalHours: "8", status: "Approved" },
        { date: "12-02-2024", checkinTime: "4:00 PM", checkoutTime: "10:00 PM", totalHours: "6", status: "Denied" },
      ]
    },
    {
      id: "previous",
      data: [
        { date: "02-01-2025", checkinTime: "2:00 PM", checkoutTime: "10:00 PM", totalHours: "8", status: "Approved" },
        { date: "05-01-2025", checkinTime: "4:00 PM", checkoutTime: "10:00 PM", totalHours: "6", status: "Denied" },
        { date: "02-01-2025", checkinTime: "2:00 PM", checkoutTime: "10:00 PM", totalHours: "8", status: "Approved" },
        { date: "02-01-2025", checkinTime: "2:00 PM", checkoutTime: "10:00 PM", totalHours: "8", status: "Approved" },
        { date: "05-01-2025", checkinTime: "4:00 PM", checkoutTime: "10:00 PM", totalHours: "6", status: "Denied" },
        { date: "02-01-2025", checkinTime: "2:00 PM", checkoutTime: "10:00 PM", totalHours: "8", status: "Approved" },
      ]
    }
  ];

  const [activeSheet, setActiveSheet] = useState("current");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showCalendar, setShowCalendar] = useState(false);

  const handleNavigation = (direction) => {
    setActiveSheet(direction === "previous" ? "previous" : "current");
  };

  const currentData = timeSheets.find(sheet => sheet.id === activeSheet)?.data || [];

  // Convert dd-mm-yyyy to JS Date
  const parseDate = (dateStr) => {
    const [dd, mm, yyyy] = dateStr.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`);
  };

  // Filter data within range
  const filteredData = currentData.filter((item) => {
    const itemDate = parseDate(item.date);
    if (startDate && endDate) {
      return itemDate >= startDate && itemDate <= endDate;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#dce3f0] p-4 m-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-primary p-4 rounded-md m-6">
        <div className="mx-4">
          <h2 className="text-lg font-semibold text-white">Time Tracker</h2>
        </div>

        <div className="flex items-center gap-4 mx-4">
          {/* Previous Button */}
          <button 
            className={`px-2 py-1 rounded ${activeSheet === "previous" ? "bg-background text-heading" : "bg-gray-200"}`}
            onClick={() => handleNavigation("previous")}
          >
            {'<'}
          </button>

          {/* Calendar Button */}
          <div className="relative">
            <button 
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <IoCalendarNumberOutline size={20} />
            </button>

            {showCalendar && (
              <div className="absolute z-50 mt-2 bg-white shadow-lg rounded">
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                    if (update[1]) setShowCalendar(false);
                  }}
                  inline
                />
              </div>
            )}
          </div>

          {/* Next Button */}
          <button 
            className={`px-2 py-1 rounded ${activeSheet === "current" ? "bg-background text-heading" : "bg-gray-200"}`}
            onClick={() => handleNavigation("current")}
          >
            {'>'}
          </button>
        </div>

        <div className="mx-4">
          <span className="text-sm text-white">Submitted Hours | 00:00</span>
        </div>
      </div>

      {/* Table */}
      <div className="relative m-6 overflow-hidden rounded-md bg-gray-100 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSheet + JSON.stringify(dateRange)}
            initial={{ x: activeSheet === "current" ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: activeSheet === "current" ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full"
          >
            <table className="w-full text-center text-sm bg-background">
              <thead className=" text-center text-heading">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Checkin Time</th>
                  <th className="px-4 py-2">Checkout Time</th>
                  <th className="px-4 py-2">Total Hours</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} 
                
                  className={index % 2 === 0 ? "bg-primary text-white  " : "bg-background"}>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.checkinTime}</td>
                    <td className="p-3">{item.checkoutTime}</td>
                    <td className="p-3">{item.totalHours}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full ${
                        item.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimeTracker;
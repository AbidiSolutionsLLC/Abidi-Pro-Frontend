import React from "react";
import CardWrapper from "./CardWrapper";

const AttendanceCard = ({ onDelete }) => {
  const hours = 26;
  const chartBars = [3, 4, 2, 6, 7, 1, 3]; // Mocked weekly hours

  return (
    <CardWrapper title="Weekly Attendance" icon="📊" onDelete={onDelete}>
      <p className="text-sm text-gray-600 mb-2">{hours} hours</p>
      <div className="flex gap-1 items-end h-24">
        {chartBars.map((val, i) => (
          <div
            key={i}
            className="w-3 bg-green-400 rounded"
            style={{ height: `${val * 15}px` }}
          />
        ))}
      </div>
    </CardWrapper>
  );
};

export default AttendanceCard;

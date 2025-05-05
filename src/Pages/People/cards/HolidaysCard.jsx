import React from "react";
import CardWrapper from "./CardWrapper";

const HolidaysCard = ({ onDelete }) => {
  const holidays = [
    { title: "All Saints Day", date: "Nov 1, 2025" },
    { title: "Christmas Day", date: "Dec 25, 2025" },
    { title: "New Year's Eve", date: "Dec 31, 2025" },
  ];

  return (
    <CardWrapper title="Holidays" icon="🎉" onDelete={onDelete}>
      <ul className="text-sm text-gray-700 space-y-2">
        {holidays.map((item, i) => (
          <li key={i} className="bg-orange-50 p-2 rounded shadow-sm">
            <div className="font-medium">{item.title}</div>
            <div className="text-xs text-gray-500">{item.date}</div>
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
};

export default HolidaysCard;

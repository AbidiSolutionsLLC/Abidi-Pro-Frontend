import React from "react";
import CardWrapper from "./CardWrapper";

const FeedsCard = ({ onDelete }) => {
  const feeds = [
    "Your request was approved by admin",
    "You have a message from the manager",
    "You haven't checked in today",
    "Your log request was approved",
  ];

  return (
    <CardWrapper title="Feeds" icon="💬" onDelete={onDelete}>
      <ul className="space-y-2 text-sm">
        {feeds.map((msg, i) => (
          <li key={i} className="bg-gray-100 p-2 rounded text-gray-800 shadow-sm">
            {msg}
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
};

export default FeedsCard;

import React from "react";

interface TitleCardProps {
  title: string;
  description: string;
}

const TitleCard: React.FC<TitleCardProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="title is-1">{title}</h2>
      <div className="subtitle">{description}</div>
    </div>
  );
};

export default TitleCard;

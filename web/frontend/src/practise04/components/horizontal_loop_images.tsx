import React from "react";
import "../assets/css/components/horizontal_loop_images.css";
import { task } from "../types/types";
import { Link } from "react-router-dom";

interface HorizontalLoopImagesProps {
  tasks: task[];
}

const HorizontalLoopImages: React.FC<HorizontalLoopImagesProps> = ({
  tasks,
}) => {
  var list = tasks.map(function (task) {
    return (
      <li key={task.id}>
        <Link to={`/task/${task.category_id}/${task.id}`}>
          <img src={task.image_source} alt="img" />
          {task.title}
        </Link>
      </li>
    );
  });
  return (
    <div>
      <div className="loop_slide">
        <ul>{list}</ul>
        <ul>{list}</ul>
      </div>
    </div>
  );
};

export default HorizontalLoopImages;

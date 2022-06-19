import React from "react";
import "../assets/css/components/small_horizontal_loop_images.css";
import { task } from "../types/types";
import { Link } from "react-router-dom";
import ImageWithAltDefault from "../atoms/image_with_alt_default";

interface SmallHorizontalLoopImagesProps {
  scroll_tasks: task[];
}

const SmallHorizontalLoopImages: React.FC<SmallHorizontalLoopImagesProps> = ({
  scroll_tasks,
}) => {
  var list = scroll_tasks.map(function (task) {
    return (
      <li key={task.id} style={{ width: "20%" }}>
        <Link to={`/task/${task.category_id}/${task.id}`}>
          <ImageWithAltDefault image={task.image_source} />
          {task.title}
        </Link>
      </li>
    );
  });
  return (
    <div>
      <div className="slider_wrapper">
        <ul>
          {list}
          {list}
        </ul>
        <ul>
          {list}
          {list}
        </ul>
      </div>
    </div>
  );
};

export default SmallHorizontalLoopImages;

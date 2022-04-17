import React, { useState } from "react";
import "../assets/css/components/small_horizontal_loop_images.css";
import { task } from "../types/types";

interface SmallHorizontalLoopImagesProps {
  scroll_tasks: task[];
}

const SmallHorizontalLoopImages: React.FC<SmallHorizontalLoopImagesProps> = ({
  scroll_tasks,
}) => {
  var list = scroll_tasks.map(function (task) {
    return (
      <li>
        <a href="#">
          <img src={task.image_source} />
          {task.title}
        </a>
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

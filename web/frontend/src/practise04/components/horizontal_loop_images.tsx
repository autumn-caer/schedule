import React, { useState } from "react";
import "../assets/css/components/horizontal_loop_images.css";
import { task } from "../types/types";

interface HorizontalLoopImagesProps {
  tasks: task[];
}

const HorizontalLoopImages: React.FC<HorizontalLoopImagesProps> = ({
  tasks,
}) => {
  var list = tasks.map(function (task) {
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
      <div className="loop_slide">
        <ul>{list}</ul>
        <ul>{list}</ul>
      </div>
    </div>
  );
};

export default HorizontalLoopImages;

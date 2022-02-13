import React, { useState } from "react";
import "../assets/css/components/small_horizontal_loop_images.css";
import { imageTag } from "../types/types";

interface SmallHorizontalLoopImagesProps {
  image_tags: imageTag[];
}

const SmallHorizontalLoopImages: React.FC<SmallHorizontalLoopImagesProps> = ({
  image_tags,
}) => {
  var list = image_tags.map(function (image_source) {
    return (
      <li>
        <a href="#">
          <img src={image_source.source} />
          {image_source.name}
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

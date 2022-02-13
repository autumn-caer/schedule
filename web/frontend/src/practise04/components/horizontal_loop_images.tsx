import React, { useState } from "react";
import "../assets/css/components/horizontal_loop_images.css";
import { imageTag } from "../types/types";

interface HorizontalLoopImagesProps {
  sources: imageTag[];
}

const HorizontalLoopImages: React.FC<HorizontalLoopImagesProps> = ({
  sources,
}) => {
  var list = sources.map(function (image_source) {
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
      <div className="loop_slide">
        <ul>{list}</ul>
        <ul>{list}</ul>
      </div>
    </div>
  );
};

export default HorizontalLoopImages;

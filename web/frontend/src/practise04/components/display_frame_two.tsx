import React, { Fragment } from "react";
import "../assets/css/components/display_frame_one.css";
import { imageTag } from "../types/types";

interface DisplayFrameTwoProps {
  main_image: imageTag;
  image_tags: imageTag[];
}

const DisplayFrameTwo: React.FC<DisplayFrameTwoProps> = ({
  main_image,
  image_tags,
}) => {
  var image_list = image_tags.map(function (image_source) {
    return (
      <li>
        <img src={image_source.source} />
      </li>
    );
  });
  return (
    <div className="position_relative">
      <div className="columns">
        <div className="column frame_color_light_orange prev">
          <div style={{ borderBottomColor: "rgb(150, 105, 73);" }}>prev</div>
        </div>
        <div className="column is-three-quarters frame_color_light_gray">
          <div className="is-parent">
            <div className="columns">
              <div className="column"></div>
              <div className="column is-three-quarters">
                <div className="title is-1">{main_image.name}</div>
                <div className="card-image">
                  <figure className="image is-3by3">
                    <img src={main_image.source} alt="Image" />
                  </figure>
                </div>

                <div className="image_row_wrapper">
                  <ul>{image_list}</ul>
                </div>
              </div>
              <div className="column"></div>
            </div>
          </div>
        </div>
        <div className="column frame_color_light_pink next">
          <div style={{ borderBottomColor: "rgb(150, 105, 73);" }}>next</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayFrameTwo;

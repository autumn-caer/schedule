import React, { Fragment } from "react";
import "../assets/css/components/display_frame_one.css";
import main_image from "../assets/images/movie_ph0.jpeg";
import SmallHorizontalLoopImages from "./small_horizontal_loop_images";
import scroll_images_01 from "../assets/images/mv1_2.jpeg";
import scroll_images_02 from "../assets/images/mv1_0.jpeg";
import scroll_images_03 from "../assets/images/mv0_2.jpeg";
import scroll_images_04 from "../assets/images/mv0_1.jpeg";
import { imageTag } from "../types/types";

const DisplayFrameOne: React.FC = () => {
  const images: imageTag[] = [
    { source: scroll_images_01, name: "01" },
    { source: scroll_images_02, name: "02" },
  ];
  return (
    <div className="position_relative">
      <div className="frame_color_light_blue"></div>
      <div className="columns" style={{ position: "absolute", top: "100px" }}>
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-3by3">
                <img src={main_image} alt="Image" />
              </figure>
            </div>
          </div>
        </div>
        <div className="column padding_3_percent">
          <div className="is-ancestor">
            <div className="has-text-left">
              <div className="is-parent is-vertical">
                <article className="is-child mb_7_percent">
                  <p className="subtitle">ふと足元を見つめたら、</p>
                </article>
                <article className="is-child mb_7_percent">
                  <p className="is-size-5">ありきたりなものじゃ伝わらない。</p>
                </article>
                <article className="is-child mb_7_percent">
                  <p className="is-size-5">ありきたりなものじゃ伝わらない。</p>
                </article>
                <article className="is-child mb_7_percent">
                  <SmallHorizontalLoopImages image_tags={images} />
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayFrameOne;

import React, { useRef, useState, useEffect } from "react";
import AutoScrollImages from "./auto_scroll_images";
import HorizontalLoopImages from "./horizontal_loop_images";
import DisplayFrameOne from "./display_frame_one";
import DisplayFrameTwo from "./display_frame_two";
import TaskRegister from "./task_register";
import TaskList from "./task_list";
import TitleCard from "../atoms/title_card";
import SmallHorizontalLoopImages from "./small_horizontal_loop_images";
import scroll_images_01 from "../assets/images/mv1_2.jpeg";
import scroll_images_02 from "../assets/images/mv1_0.jpeg";
import scroll_images_03 from "../assets/images/mv0_2.jpeg";
import scroll_images_04 from "../assets/images/mv0_1.jpeg";
import ext_main from "../assets/images/product_img0.png";
import ext_img2_0 from "../assets/images/ext_img2_0.png";
import ext_img2_1 from "../assets/images/ext_img2_1.png";
import ext_img2_2 from "../assets/images/ext_img2_2.png";
import ext_img2_3 from "../assets/images/ext_img2_3.png";

import Image from "../assets/images/mv0.jpeg";
import { imageTag } from "../types/types";

const TopDisplay: React.FC = () => {
  const images: imageTag[] = [
    { source: scroll_images_01, name: "01" },
    { source: scroll_images_02, name: "02" },
    { source: scroll_images_03, name: "03" },
    { source: scroll_images_04, name: "04" },
  ];

  const ext_main_image: imageTag = {
    source: ext_main,
    name: "NATURAL_GRAY",
  };
  const ext_imaages: imageTag[] = [
    { source: ext_img2_0, name: "01" },
    { source: ext_img2_1, name: "02" },
    { source: ext_img2_2, name: "03" },
    { source: ext_img2_3, name: "04" },
  ];

  return (
    <div className="container has-text-centered">
      <section className="hero is-medium">
        <div className="columns is-vcentered">
          <div className="column">
            <div className="tile is-ancestor">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child">
                    <p className="subtitle">ふと足元を見つめたら、</p>
                    <p className="subtitle">大切なものがたくさんあった</p>
                  </article>
                  <article className="tile is-child">
                    <p className="subtitle">ありきたりなものじゃ伝わらない。</p>
                  </article>
                  <article className="tile is-child">
                    <AutoScrollImages />
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-three-fifths">
            <div className="card">
              <div className="card-image">
                <figure className="image is-3by3">
                  <img src={Image} alt="Image" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <h1 className="title">Title</h1>
      <h2 className="subtitle">Subtitle</h2>
      <section className="hero is-medium">
        <HorizontalLoopImages sources={images} />
        <SmallHorizontalLoopImages image_tags={images} />
      </section>
      <TitleCard title={"test"} description={"description"} />
      <DisplayFrameOne />
      <DisplayFrameTwo main_image={ext_main_image} image_tags={ext_imaages} />
      <TaskRegister title={"register"} image_tags={ext_imaages} />
      <TaskList title={"task_list"} image_tags={ext_imaages} />
    </div>
  );
};

export default TopDisplay;

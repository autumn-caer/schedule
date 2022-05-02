import React from "react";
import AutoScrollImages from "./auto_scroll_images";
import HorizontalLoopImages from "./horizontal_loop_images";
import DisplayFrameOne from "./display_frame_one";
import CategoryList from "./category_list";
import TitleCard from "../atoms/title_card";
import SmallHorizontalLoopImages from "./small_horizontal_loop_images";
import ext_img2_0 from "../assets/images/ext_img2_0.png";
import ext_img2_1 from "../assets/images/ext_img2_1.png";
import ext_img2_2 from "../assets/images/ext_img2_2.png";
import ext_img2_3 from "../assets/images/ext_img2_3.png";

import Image from "../assets/images/mv0.jpeg";
import { imageTag } from "../types/types";
import { useTypedSelector } from "../hooks/use-typed-selector";
import * as COMMON_FUNC from "../utils/common_function";

const TopDisplay: React.FC = () => {
  const ext_imaages: imageTag[] = [
    { source: ext_img2_0, name: "01" },
    { source: ext_img2_1, name: "02" },
    { source: ext_img2_2, name: "03" },
    { source: ext_img2_3, name: "04" },
  ];

  const { name, login } = useTypedSelector((state) => state.login);
  const { categories } = useTypedSelector((state) => state.categories);

  const all_tasks = categories
    .map(function (category, _) {
      return category.scroll_tasks;
    })
    .flat();

  const random_tasks = COMMON_FUNC.arrayShuffle(all_tasks).slice(0, 6);
  const tasks = COMMON_FUNC.arrayShuffle(all_tasks).slice(0, 4);

  var categories_list = categories.map(function (category) {
    return <DisplayFrameOne category={category} />;
  });

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
      <CategoryList />
      <section className="hero is-medium">
        <HorizontalLoopImages tasks={random_tasks} />
        <SmallHorizontalLoopImages scroll_tasks={tasks} />
      </section>
      <TitleCard title={"Category_1"} description={"description"} />
      {categories_list}
    </div>
  );
};

export default TopDisplay;

import React, { useEffect } from "react";
import AutoScrollImages from "../components/auto_scroll_images";
import HorizontalLoopImages from "../components/horizontal_loop_images";
import DisplayFrameOne from "../components/display_frame_one";
import CategoryList from "../components/category_list";
import TitleCard from "../atoms/title_card";
import SmallHorizontalLoopImages from "../components/small_horizontal_loop_images";
import { useActions } from "../hooks/use-actions";

import Image from "../assets/images/mv0.jpeg";
import { useTypedSelector } from "../hooks/use-typed-selector";
import * as COMMON_FUNC from "../utils/common_function";
import { task } from "../types/types";

import {
  collection,
  getDocs,
  onSnapshot,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { CategoryConverter, TaskConverter } from "../converters/converters";

const TopDisplay: React.FC = () => {
  const { categories } = useTypedSelector((state) => state.categories);

  const all_tasks = categories
    .map(function (category, _) {
      return category.scroll_tasks;
    })
    .flat();

  const random_medium_tasks = COMMON_FUNC.arrayShuffle(all_tasks).slice(0, 6);
  const random_small_tasks = COMMON_FUNC.arrayShuffle(all_tasks).slice(0, 4);

  var categories_list = categories.map(function (category) {
    return <DisplayFrameOne key={category.category_id} category={category} />;
  });

  const { registerCategory, clearCategoriesAndTasks } = useActions();

  useEffect(() => {
    const fetch_data = async () => {
      clearCategoriesAndTasks();
      const categories_snapshot = await getDocs(
        collection(db, "category").withConverter(CategoryConverter)
      );

      categories_snapshot.forEach(async (doc) => {
        const q = query(
          collection(db, "task"),
          where("category_id", "==", doc.data().category_id)
        ).withConverter(TaskConverter);
        const tasks_snapshot = await getDocs(q);

        registerCategory({
          ...doc.data(),
          scroll_tasks: tasks_snapshot.docs.map((doc) => {
            return doc.data();
          }),
        });
      });
    };

    fetch_data();
    console.log(categories);
  }, []);

  return (
    <div className="container has-text-centered">
      <section className="hero is-medium">
        <div className="columns is-vcentered">
          <div className="column">
            <div className="tile is-ancestor">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child">
                    <p className="subtitle">ffふと足元を見つめたら、</p>
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
                  <img src={Image} alt="img" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TitleCard title={"Category一覧"} description={"description"} />
      <CategoryList />
      <section className="hero is-medium">
        <HorizontalLoopImages tasks={random_medium_tasks} />
        <SmallHorizontalLoopImages scroll_tasks={random_small_tasks} />
      </section>
      <TitleCard title={"Category_1"} description={"description"} />
      {categories_list}
    </div>
  );
};

export default TopDisplay;

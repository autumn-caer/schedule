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

import { collection, getDocs, doc, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { CategoryConverter, TaskConverter } from "../converters/converters";
import * as FIREBASE_FUNC from "../utils/firebase_function";
import { TASK_IMAGE_FOLDER } from "../consts/consts";

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

      categories_snapshot.forEach(async (category_snapshot) => {
        const category_doc_ref = doc(
          db,
          "category",
          category_snapshot.data().category_id
        );

        const q = query(
          collection(db, "task").withConverter(TaskConverter),
          where("category_id", "==", category_doc_ref)
        );

        //配下のタスクリストを作成する、画像がある場合はそれもfetchする
        const tasks_snapshots = await getDocs(q);
        const scroll_tasks = await Promise.all(
          tasks_snapshots.docs.map(async (task_snapshot) => {
            return {
              ...task_snapshot.data(),
              image_source: await FIREBASE_FUNC.get_image_url(
                TASK_IMAGE_FOLDER,
                task_snapshot.data().id
              ),
            };
          })
        );

        registerCategory({
          ...category_snapshot.data(),
          scroll_tasks: scroll_tasks,
        });
      });
    };

    fetch_data();
    // console.log(categories);
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
        <SmallHorizontalLoopImages scroll_tasks={random_small_tasks} />
      </section>
      <TitleCard title={"Category_1"} description={"description"} />
      {categories_list}
    </div>
  );
};

export default TopDisplay;

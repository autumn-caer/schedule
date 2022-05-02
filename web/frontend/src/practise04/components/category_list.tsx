import React from "react";
import "../assets/css/components/display_frame_one.css";
import { imageTag } from "../types/types";
import { useActions } from "../hooks/use-actions";

import TaskList from "./task_list";
import { category } from "../types/types";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useNavigate } from "react-router-dom";

interface CategoryListProps {}
const CategoryList: React.FC<CategoryListProps> = () => {
  const { updateCategory } = useActions();
  const { categories } = useTypedSelector((state) => state.categories);
  const navigate = useNavigate();
  const ext_imaages: imageTag[] = [];
  const show_task_list = (index: number) => {
    const old_category = categories[index];
    var updated_category = {
      ...old_category,
      task_list_desplay: !old_category.task_list_desplay,
    };

    updateCategory(updated_category);
  };

  var categories_list = categories.map(function (category, index) {
    return (
      <div className="frame_color_light_purple has-text-left mb_one_percent category_column_wrapper hover_color_primary">
        <div onClick={() => show_task_list(index)}>
          {" "}
          　　
          <ul className="colors an anime ani_blur on category_column">
            <li className="color0">
              <div></div>
              <h3 className="subtitle">{category.name}</h3>
            </li>
            <li>
              <span>{category.message_middle}</span>
            </li>
            <li>
              <span>{category.message_bottom}</span>
            </li>
          </ul>
        </div>
        <div
          className={category.task_list_desplay ? "is-visible" : "is-hidden"}
        >
          <TaskList title={""} category={category} image_tags={ext_imaages} />
        </div>
      </div>
    );
  });

  return (
    <div className="position_relative mb_5">
      <div className="columns">
        <div className="column is-full">
          <div className="is-parent">
            <div className="column">
              <div className="columns">
                <div className="column is-three-quarters"></div>
                <div className="column">
                  <button
                    className="button is-primary is-light"
                    onClick={() => navigate("/category")}
                  >
                    カテゴリー追加
                  </button>
                </div>
              </div>
              {categories_list}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;

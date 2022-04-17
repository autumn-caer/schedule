import { ActionType } from "../action-types";
import { Action } from "../actions";
import { category } from "../../types/types";

import main_image from "../../assets/images/movie_ph0.jpeg";
import scroll_images_01 from "../../assets/images/mv1_2.jpeg";
import scroll_images_02 from "../../assets/images/mv1_0.jpeg";
import scroll_images_03 from "../../assets/images/mv0_2.jpeg";
import scroll_images_04 from "../../assets/images/mv0_1.jpeg";
import produce from "immer";

interface CategoriesState {
  categories: category[];
}

const initialState: CategoriesState = {
  categories: [
    {
      category_id: `1`,
      main_image: { source: main_image, name: "01" },
      scroll_tasks: [
        {
          category_id: "1",
          image_source: scroll_images_01,
          title: "task_01",
          description: "",
          from_date: "",
          to_date: "",
        },
        {
          category_id: "1",
          image_source: scroll_images_02,
          title: "task_02",
          description: "",
          from_date: "",
          to_date: "",
        },
        {
          category_id: "1",
          image_source: scroll_images_03,
          title: "task_03",
          description: "",
          from_date: "",
          to_date: "",
        },
        {
          category_id: "1",
          image_source: scroll_images_04,
          title: "task_04",
          description: "",
          from_date: "",
          to_date: "",
        },
      ],
      message_top: "ふと足元を見つめたら、",
      message_middle: "ありきたりなものじゃ伝わらない。",
      message_below: "ありきたりなものじゃ伝わらない。",
      task_list_desplay: false,
    },
  ],
};

const reducer = produce(
  (state: CategoriesState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.LOGIN:
        return state;
      case ActionType.REGISTER_TASK:
        state.categories[0].scroll_tasks.push(action.payload.task);
        return state;
      case ActionType.REGISTER_CATEGORY:
        state.categories.push(action.payload.category);
        return state;
      case ActionType.UPDATE_CATEGORY:
        // state.categories.push(action.payload.category);
        const { cellId, category } = action.payload;
        const index = state.categories.findIndex(
          (category) => category.category_id === cellId
        );

        state.categories[index] = category;
        return state;
      default:
        return state;
    }
  }
);

export default reducer;

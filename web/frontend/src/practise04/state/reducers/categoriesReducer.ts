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
      category_id: "1",
      name: "category_one",
      main_image: { source: main_image, name: "01" },
      scroll_tasks: [
        {
          id: 1,
          category_id: "1",
          image_source: scroll_images_01,
          title: "task_01",
          description: "task_01の説明",
          from_date: "2022/01/01",
          to_date: "2022/01/31",
        },
        {
          id: 2,
          category_id: "1",
          image_source: scroll_images_02,
          title: "task_02",
          description: "task_02の説明",
          from_date: "2022/02/01",
          to_date: "2022/02/08",
        },
        {
          id: 3,
          category_id: "1",
          image_source: scroll_images_03,
          title: "task_03",
          description: "task_03の説明",
          from_date: "2022/03/01",
          to_date: "2022/03/31",
        },
        {
          id: 4,
          category_id: "1",
          image_source: scroll_images_04,
          title: "task_04",
          description: "task_04の説明",
          from_date: "2022/04/01",
          to_date: "2022/04/30",
        },
        {
          id: 5,
          category_id: "1",
          image_source: scroll_images_04,
          title: "task_05",
          description: "task_05の説明",
          from_date: "2022/05/01",
          to_date: "2022/05/31",
        },
        {
          id: 6,
          category_id: "1",
          image_source: scroll_images_04,
          title: "task_06",
          description: "task_06の説明",
          from_date: "2022/06/01",
          to_date: "2022/06/30",
        },
      ],
      message_top: "ふと足元を見つめたら、",
      message_middle: "ありきたりなものじゃ伝わらない。",
      message_bottom: "ありきたりなものじゃ伝わらない。",
      task_list_desplay: false,
    },
  ],
};

const randomId = () => {
  return Math.floor(Math.random() * 100);
};

const reducer = produce(
  (state: CategoriesState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.LOGIN:
        return state;
      case ActionType.REGISTER_TASK:
        const { task } = action.payload;
        const target_category = state.categories.find(
          (category) => category.category_id === action.payload.cellId
        );

        if (!target_category) {
          return state;
        }

        if (!task.id) {
          target_category.scroll_tasks = [
            ...target_category.scroll_tasks,
            { ...task, id: randomId() },
          ];
        } else {
          const index = target_category.scroll_tasks.findIndex(
            (target_task) => target_task.id === task.id
          );
          target_category.scroll_tasks[index] = task;
        }

        return state;
      case ActionType.REGISTER_CATEGORY:
        state.categories.push(action.payload.category);
        return state;
      case ActionType.UPDATE_CATEGORY:
        const { cellId, category } = action.payload;

        if (cellId) {
          const index = state.categories.findIndex(
            (category) => category.category_id === cellId
          );
          state.categories[index] = category;
        } else {
          state.categories = [
            ...state.categories,
            { ...category, category_id: randomId().toString() },
          ];
        }

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

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
  categories: [],
};

const randomId = () => {
  // return Math.floor(Math.random() * 100);
  return Math.random().toString(36).substr(2, 5);
};

const reducer = produce(
  (state: CategoriesState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.LOGIN:
        return state;
      case ActionType.REGISTER_TASK:
        const register_task = action.payload.task;
        const register_target_category = state.categories.find(
          (category) => category.category_id === register_task.category_id
        );

        if (!register_target_category) {
          return state;
        }

        register_target_category.scroll_tasks = [
          ...register_target_category.scroll_tasks,
          { ...register_task },
        ];

        return state;
      case ActionType.UPDATE_TASK:
        const update_task = action.payload.task;
        const current_category_id = action.payload.current_category_id;

        const update_target_category = state.categories.find(
          (category) => category.category_id === update_task.category_id
        );

        if (!update_target_category) {
          return state;
        }

        if (update_task.category_id === current_category_id) {
          const index = update_target_category.scroll_tasks.findIndex(
            (target_task) => target_task.id === update_task.id
          );
          update_target_category.scroll_tasks[index] = update_task;
        } else {
          const delete_task_belong_to_category_index =
            state.categories.findIndex(
              (category) => category.category_id === current_category_id
            );

          const delete_task_belong_to_category =
            state.categories[delete_task_belong_to_category_index];

          if (!delete_task_belong_to_category) {
            return state;
          }

          state.categories[delete_task_belong_to_category_index].scroll_tasks =
            delete_task_belong_to_category.scroll_tasks.filter(
              (target_task) => target_task.id !== update_task.id
            );

          update_target_category.scroll_tasks = [
            ...update_target_category.scroll_tasks,
            update_task,
          ];
        }

        return state;
      case ActionType.REGISTER_CATEGORY:
        state.categories = [
          ...state.categories,
          { ...action.payload.category },
        ];

        return state;
      case ActionType.UPDATE_CATEGORY:
        const update_category = action.payload.category;
        const update_index = state.categories.findIndex(
          (category) => category.category_id === update_category.category_id
        );
        state.categories[update_index] = update_category;

        return state;
      case ActionType.CLEAR_CATEGORIES_AND_TASKS:
        state = initialState;

        return state;
      default:
        return state;
    }
  }
);

export default reducer;

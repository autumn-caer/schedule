import { ActionType } from "../action-types";
import { Action } from "../actions";
import { imageTag, task } from "../../types/types";

import scroll_images_01 from "../../assets/images/mv1_2.jpeg";
import scroll_images_02 from "../../assets/images/mv1_0.jpeg";
import scroll_images_03 from "../../assets/images/mv0_2.jpeg";
import scroll_images_04 from "../../assets/images/mv0_1.jpeg";
import produce from "immer";

interface RandomSmallSlideState {
  tasks: task[];
}

const initialState: RandomSmallSlideState = {
  tasks: [
    {
      id: 1,
      category_id: "1",
      image_source: scroll_images_01,
      title: "task_01",
      description: "",
      from_date: "",
      to_date: "",
    },
    {
      id: 2,
      category_id: "1",
      image_source: scroll_images_02,
      title: "task_02",
      description: "",
      from_date: "",
      to_date: "",
    },
    {
      id: 3,
      category_id: "1",
      image_source: scroll_images_03,
      title: "task_03",
      description: "",
      from_date: "",
      to_date: "",
    },
    {
      id: 4,
      category_id: "1",
      image_source: scroll_images_04,
      title: "task_04",
      description: "",
      from_date: "",
      to_date: "",
    },
  ],
};

const reducer = produce(
  (state: RandomSmallSlideState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.LOGIN:
        return state;
      default:
        return state;
    }
  }
);

export default reducer;

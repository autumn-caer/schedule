import { category, task } from "../types/types";
import { FirestoreDataConverter } from "firebase/firestore";
import * as COMMON_FUNC from "../utils/common_function";

export const CategoryConverter: FirestoreDataConverter<category> = {
  toFirestore: (category: category) => {
    return {
      __type: "category",
      category_id: category.category_id,
      name: category.name,
      main_image: category.main_image,
      message_top: category.message_top,
      message_middle: category.message_middle,
      message_bottom: category.message_bottom,
    };
  },
  fromFirestore: (sn) => {
    const data = sn.data();

    const category = {
      category_id: sn.id,
      main_image: { source: "", name: "" },
      scroll_tasks: [] as Array<task>,
      ...data,
    } as category;
    category.category_id = sn.id;
    return category;
  },
};

export const TaskConverter: FirestoreDataConverter<task> = {
  toFirestore: (task: task) => {
    return {
      __type: "task",
      image_source: task.image_source,
      title: task.title,
      description: task.description,
      from_date: task.from_date,
      to_date: task.to_date,
      category_id: task.category_id,
    };
  },
  fromFirestore: (sn) => {
    const data = sn.data();
    const task = {
      id: sn.id,
      ...data,
      category_id: data.category_id.id,
      from_date: COMMON_FUNC.formatDateYYYYMMDD(
        new Date(data.from_date.seconds * 1000)
      ),
      to_date: COMMON_FUNC.formatDateYYYYMMDD(
        new Date(data.to_date.seconds * 1000)
      ),
    } as task;
    return task;
  },
};

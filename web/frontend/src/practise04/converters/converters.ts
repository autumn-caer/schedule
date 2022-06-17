import { category, task, FireBaseLoginInfo } from "../types/types";
import { FirestoreDataConverter } from "firebase/firestore";
import * as COMMON_FUNC from "../utils/common_function";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import * as FIREBASE_FUNC from "../utils/firebase_function";
import { CATEGORY_IMAGE_FOLDER } from "../consts/consts";

export const FireBaseLoginInfoConverter: FirestoreDataConverter<FireBaseLoginInfo> =
  {
    toFirestore: (fireBaseLoginInfo: FireBaseLoginInfo) => {
      return {
        __type: "Users",
        uid: fireBaseLoginInfo.uid,
      };
    },
    fromFirestore: (sn) => {
      const data = sn.data();
      var fireBaseLoginInfo = {
        ...data,
      } as FireBaseLoginInfo;
      fireBaseLoginInfo.user_id = sn.id;

      return fireBaseLoginInfo;
    },
  };

export const CategoryConverter: FirestoreDataConverter<category> = {
  toFirestore: (category: category) => {
    const user_doc_ref = doc(db, "users", category.user_id);
    return {
      __type: "category",
      name: category.name,
      message_top: category.message_top,
      message_middle: category.message_middle,
      message_bottom: category.message_bottom,
      user: user_doc_ref,
    };
  },
  fromFirestore: (sn) => {
    const data = sn.data();
    var rtn_category = {
      category_id: sn.id,
      main_image: { source: "", name: "" },
      scroll_tasks: [] as Array<task>,
      ...data,
    } as category;
    rtn_category.category_id = sn.id;

    return rtn_category;
  },
};

export const TaskConverter: FirestoreDataConverter<task> = {
  toFirestore: async (task: task) => {
    const category_doc_ref = doc(db, "category", task.category_id);
    return {
      __type: "task",
      image_source: task.image_source,
      title: task.title,
      description: task.description,
      from_date: task.from_date ? new Date(task.from_date) : null,
      to_date: task.to_date ? new Date(task.to_date) : null,
      category_id: category_doc_ref,
      status: task.status,
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

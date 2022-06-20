import { DocumentReference, DocumentData } from "firebase/firestore";

export type imageTag = {
  source: string;
  name: string;
};

export type task = {
  id: string | null;
  image_source?: string;
  title: string;
  description: string;
  from_date: string;
  to_date: string;
  category_id: string;
  status: string;
  has_image: boolean;
};

export type category = {
  user_id: string;
  category_id: string;
  name: string;
  main_image: imageTag;
  scroll_tasks: task[];
  message_top: string;
  message_middle: string;
  message_bottom: string;
  task_list_desplay: boolean;
  has_image: boolean;
};

export type RootStackParamList = {
  TopDisplay: undefined;
  TaskRegister: {};
};

export type FireBaseLoginInfo = {
  user_id: string | null;
  email: string;
  uid: string;
  error_message?: string | null;
};

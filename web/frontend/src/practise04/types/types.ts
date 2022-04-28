export type imageTag = {
  source: string;
  name: string;
};

export type task = {
  id: number;
  image_source?: string;
  title: string;
  description: string;
  from_date: string;
  to_date: string;
  category_id: string;
};

export type category = {
  category_id: string;
  main_image: imageTag;
  scroll_tasks: task[];
  message_top: string;
  message_middle: string;
  message_below: string;
  task_list_desplay: boolean;
};

export type RootStackParamList = {
  TopDisplay: undefined;
  TaskRegister: {};
};

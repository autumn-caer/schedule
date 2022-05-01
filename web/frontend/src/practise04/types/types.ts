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
};

export type category = {
  category_id: string | null;
  name: string;
  main_image: imageTag;
  scroll_tasks: task[];
  message_top: string;
  message_middle: string;
  message_bottom: string;
  task_list_desplay: boolean;
};

export type RootStackParamList = {
  TopDisplay: undefined;
  TaskRegister: {};
};

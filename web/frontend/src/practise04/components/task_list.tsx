import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/components/display_frame_one.css";
import { imageTag, category } from "../types/types";
import TaskListColumn from "./task_list_column";
import * as COMMON_FUNC from "../utils/common_function";

interface TaskListProps {
  title: string;
  category: category;
  image_tags: imageTag[];
}

const TaskList: React.FC<TaskListProps> = ({ category }) => {
  const navigate = useNavigate();
  var task_rows = COMMON_FUNC.sliceByNumber(category.scroll_tasks, 3);
  var task_list_column_rows = task_rows.map(function (task_array, index) {
    return (
      <div className="columns" key={index}>
        {task_array.map(function (task, i) {
          return <TaskListColumn key={task.id} task={task} />;
        })}
      </div>
    );
  });

  return (
    <div className="position_relative mb_5">
      <div className="columns">
        <div className="column is-three-quarters"></div>
        <div className="column">
          <button
            className="button is-link is-light"
            onClick={() => navigate(`/category/${category.category_id}`)}
          >
            編集
          </button>
        </div>
        <div className="column">
          <button
            className="button is-link is-light"
            onClick={() => navigate(`/task/${category.category_id}`)}
          >
            タスク新規追加
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column is-full frame_color_light_gray">
          <div className="is-parent">
            <div className="columns">
              <div className="column"></div>
              <div className="column is-four-fifths">
                {task_list_column_rows}
              </div>
              <div className="column"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;

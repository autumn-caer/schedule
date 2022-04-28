import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/components/display_frame_one.css";
import { imageTag, category, task } from "../types/types";
import TaskListColumn from "./task_list_column";
import * as COMMON_FUNC from "../utils/common_function";

interface TaskListProps {
  title: string;
  category: category;
  image_tags: imageTag[];
}

const TaskList: React.FC<TaskListProps> = ({ category }) => {
  var task_rows = COMMON_FUNC.sliceByNumber(category.scroll_tasks, 3);
  var task_list_column_rows = task_rows.map(function (task_array, index) {
    return (
      <div className="columns">
        {task_array.map(function (task, i) {
          return <TaskListColumn task={task} />;
        })}
      </div>
    );
  });

  return (
    <div className="position_relative mb_5">
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

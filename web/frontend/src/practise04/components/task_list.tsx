import React, { Fragment } from "react";
import "../assets/css/components/display_frame_one.css";
import { imageTag, category, task } from "../types/types";
import TaskListColumn from "./task_list_column";

interface TaskListProps {
  title: string;
  category: category;
  image_tags: imageTag[];
}

const TaskList: React.FC<TaskListProps> = ({ category }) => {
  const sliceByNumber = (array: Array<task>, number: number) => {
    const length = Math.ceil(array.length / number);
    return new Array(length)
      .fill(null)
      .map((_, i) => array.slice(i * number, (i + 1) * number));
  };

  var task_rows = sliceByNumber(category.scroll_tasks, 3);
  var task_list_column_rows = task_rows.map(function (task_array, index) {
    return (
      <div className="columns">
        {task_array.map(function (task, i) {
          return <TaskListColumn children={task} />;
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

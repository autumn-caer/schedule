import React, { Fragment } from "react";
import "../assets/css/components/display_frame_one.css";
import { imageTag } from "../types/types";
import TaskListColumn from "./task_list_column";

interface TaskListProps {
  title: string;
  image_tags: imageTag[];
}

const TaskList: React.FC<TaskListProps> = ({ title, image_tags }) => {
  var image_list = image_tags.map(function (image_source) {
    return (
      <li>
        <img src={image_source.source} />
      </li>
    );
  });
  return (
    <div className="position_relative">
      <div className="columns">
        <div className="column frame_color_light_orange prev">
          <div style={{ borderBottomColor: "rgb(150, 105, 73);" }}>prev</div>
        </div>
        <div className="column is-three-quarters frame_color_light_gray">
          <div className="is-parent">
            <div className="columns">
              <div className="column"></div>
              <div className="column is-four-fifths">
                <div className="title is-1">{title}</div>

                <div className="columns">
                  <TaskListColumn />
                  <TaskListColumn />
                  <TaskListColumn />
                </div>
                <div className="columns">
                  <TaskListColumn />
                  <TaskListColumn />
                  <TaskListColumn />
                </div>
                <div className="columns">
                  <TaskListColumn />
                  <TaskListColumn />
                  <TaskListColumn />
                </div>
                <div className="image_row_wrapper">
                  <ul>{image_list}</ul>
                </div>
              </div>
              <div className="column"></div>
            </div>
          </div>
        </div>
        <div className="column frame_color_light_pink next">
          <div style={{ borderBottomColor: "rgb(150, 105, 73);" }}>next</div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;

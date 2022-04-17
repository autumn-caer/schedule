import React, { Fragment } from "react";
import "../assets/css/components/display_frame_one.css";
import { imageTag } from "../types/types";
import TaskListColumn from "./task_list_column";
import TitleCard from "../atoms/title_card";

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
        <div className="column is-full frame_color_light_gray">
          <div className="is-parent">
            <div className="columns">
              <div className="column"></div>
              <div className="column is-four-fifths">
                <div className="title is-1">{title}</div>
                <TitleCard title={"Category_1"} description={"description"} />
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

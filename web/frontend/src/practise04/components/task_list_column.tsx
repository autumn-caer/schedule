import React, { Fragment } from "react";
import "../assets/css/components/display_frame_one.css";
import { imageTag } from "../types/types";

interface TaskListColumnProps {}

const TaskListColumn: React.FC<TaskListColumnProps> = ({}) => {
  return (
    <div className="column">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <span className="tag has-text-left">One</span>
            </div>
            <div className="media-content">
              <p className="title is-4">John Smith</p>
              <p className="subtitle is-6">@johnsmith</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListColumn;

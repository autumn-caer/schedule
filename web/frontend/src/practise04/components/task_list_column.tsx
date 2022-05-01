import React from "react";
import "../assets/css/components/display_frame_one.css";
import { imageTag, task } from "../types/types";
import { useNavigate } from "react-router-dom";

interface TaskListColumnProps {
  task: task;
}

const TaskListColumn: React.FC<TaskListColumnProps> = ({ task }) => {
  const navigate = useNavigate();

  return (
    <div
      className="column is-one-third"
      onClick={() => navigate(`/task/${task.id}`)}
    >
      <div className="card is-clickable hover_color_primary">
        <div className="card-image p-3">
          <figure className="image is-4by3">
            <img src={task.image_source} alt="image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <span className="tag has-text-left">#{task.id}</span>
            </div>
            <div className="media-content">
              <p className="title is-4">{task.title}</p>
              <p className="subtitle is-6">{task.description}</p>
              <p className="tag is-primary">
                {task.from_date}-{task.to_date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListColumn;

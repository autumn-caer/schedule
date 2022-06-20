import React from "react";
import "../assets/css/components/display_frame_one.css";
import { task } from "../types/types";
import { useNavigate } from "react-router-dom";
import ImageWithAltDefault from "../atoms/image_with_alt_default";

interface TaskListColumnProps {
  task: task;
}

const TaskListColumn: React.FC<TaskListColumnProps> = ({ task }) => {
  const navigate = useNavigate();

  return (
    <div
      className="column is-one-third"
      onClick={() => navigate(`/task/${task.category_id}/${task.id}`)}
    >
      <div className="card is-clickable hover_color_primary">
        <div className="card-image p-3">
          <figure className="image is-4by3">
            <ImageWithAltDefault image={task.image_source} />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="subtitle">
                <span className="tag has-text-left">#{task.id}</span>
              </p>
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

import React, { useEffect, useState } from "react";
import "../assets/css/components/small_horizontal_loop_images.css";
import { task } from "../types/types";
import { Link } from "react-router-dom";
import { TASK_IMAGE_FOLDER } from "../consts/consts";
import * as FIREBASE_FUNC from "../utils/firebase_function";

interface SmallHorizontalLoopImagesProps {
  scroll_tasks: task[];
}

const SmallHorizontalLoopImages: React.FC<SmallHorizontalLoopImagesProps> = ({
  scroll_tasks,
}) => {
  const [list, setList] = useState<Array<JSX.Element>>([]);
  useEffect(() => {
    const fetch_image_url = async (id: string | null) => {
      if (!id) {
        return "";
      }
      var image_url = "";
      await FIREBASE_FUNC.downloadImage(TASK_IMAGE_FOLDER, id)
        .then((url) => {
          image_url = url;
        })
        .catch((error) => {
          console.log(error);
        });

      return image_url;
    };

    const init_task_list = async () => {
      const tmp_list = await Promise.all(
        scroll_tasks.map(async (task: task) => {
          const image_url = await fetch_image_url(task.id);
          return (
            <li key={task.id}>
              <Link to={`/task/${task.category_id}/${task.id}`}>
                <img src={image_url} alt="img" />
                {task.title}
              </Link>
            </li>
          );
        })
      );
      setList(tmp_list);
    };

    init_task_list();
  }, []);

  return (
    <div>
      <div className="slider_wrapper">
        <ul>
          {list}
          {list}
        </ul>
        <ul>
          {list}
          {list}
        </ul>
      </div>
    </div>
  );
};

export default SmallHorizontalLoopImages;

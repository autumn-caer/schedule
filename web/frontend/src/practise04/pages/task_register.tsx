import React, { useRef, useEffect, useState } from "react";
import "../assets/css/components/display_frame_one.css";
import "../assets/css/components/task_register.css";
import DatePicker from "react-datepicker";

import { imageTag } from "../types/types";
import { useActions } from "../hooks/use-actions";
import { category, task } from "../types/types";
import { useTypedSelector } from "../hooks/use-typed-selector";

import scroll_images_01 from "../assets/images/mv1_2.jpeg";
import { useParams } from "react-router-dom";

interface TaskRegisterProps {}

const TaskRegister: React.FC<TaskRegisterProps> = ({}) => {
  const { categories } = useTypedSelector((state) => state.categories);

  const { id } = useParams();
  let task = null;
  if (id) {
    const target_category = categories.find(
      (category) => category.category_id === "1"
    );

    if (!target_category) {
      throw new Error("dataset multiple same id.");
    }

    task = target_category.scroll_tasks.find((task) => task.id === Number(id));

    if (!task) {
      throw new Error("dataset multiple same id.");
    }
  }
  const [title, setTilte] = useState<string>(task ? task.title : "");
  const [description, setDescription] = useState<string>(
    task ? task.description : ""
  );
  const [category, setCategory] = useState<string>(
    task ? task.category_id : ""
  );

  const [startDate, setStartDate] = useState(
    task ? new Date(task.from_date) : new Date()
  );
  const [limitDate, setLimitDate] = useState(
    task ? new Date(task.to_date) : new Date()
  );

  const imageRef = useRef<HTMLInputElement | null>(null);

  const [image_name, setImageName] = useState<string | null>("");
  const [image, setImage] = useState<string>("");
  const { registerTask } = useActions();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target != null && e.target.files != null) {
      setImageName(e.target.files.item(0)!.name);
      setImage(URL.createObjectURL(e.target.files.item(0)));
    }
  };

  const onClick = async () => {
    let test: task = {
      id: Math.random(),
      category_id: category,
      image_source: image,
      title: title,
      description: description,
      from_date: startDate.toString(),
      to_date: limitDate.toString(),
    };
    console.log(test);
  };

  var categories_options = categories.map(function (category, index) {
    return <option value={category.category_id}>{category.message_top}</option>;
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
              <div className="column is-three-quarters">
                <div className="title is-1">Register / Edit</div>
                <div className="field">
                  <div className="control">
                    <label className="label">Category</label>
                    <div className="select is-rounded">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories_options}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Title</label>
                    <input
                      className="input is-rounded"
                      type="text"
                      placeholder="Text input"
                      value={title}
                      onChange={(e) => setTilte(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <label className="label">Start Date</label>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                      className="input is-rounded"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Limit Date</label>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={limitDate}
                      onChange={(date: Date) => setLimitDate(date)}
                      className="input is-rounded"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Message</label>
                    <textarea
                      className="textarea"
                      placeholder="Textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">MAP</label>
                    <input
                      className="input is-rounded"
                      type="text"
                      placeholder="Text input"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Image</label>
                    <div className="file has-name">
                      <label className="file-label">
                        <input
                          className="file-input"
                          ref={imageRef}
                          type="file"
                          accept="image/*"
                          onChange={onFileInputChange}
                          name="resume"
                        />
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-upload"></i>
                          </span>
                          <span className="file-label">Choose a file…</span>
                        </span>
                        <span className="file-name">{image_name}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <div className="task_image_wrapper">
                      <ul>
                        <li>
                          <img src={image} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="button is-medium is-responsive"
                    onClick={onClick}
                  >
                    Submit
                  </button>
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

export default TaskRegister;

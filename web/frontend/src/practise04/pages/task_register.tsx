import React, { useState } from "react";
import "../assets/css/components/display_frame_one.css";
import "../assets/css/components/task_register.css";
import DatePicker from "react-datepicker";
import { useActions } from "../hooks/use-actions";
import { task } from "../types/types";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import * as COMMON_FUNC from "../utils/common_function";
import ConfirmModal from "../atoms/confirm_modal";

interface TaskRegisterProps {}

const TaskRegister: React.FC<TaskRegisterProps> = () => {
  const navigate = useNavigate();
  const [show_modal, setShowModal] = useState<boolean>(false);

  const { categories } = useTypedSelector((state) => state.categories);
  const { category_id, id } = useParams();

  const showModal = () => {
    setShowModal(true);
  };

  let task = null;
  if (id) {
    const target_category = categories.find(
      (category) => category.category_id === category_id
    );

    if (!target_category) {
      throw new Error("カテゴリーが存在しません。");
    }

    task = target_category.scroll_tasks.find((task) => task.id === id);
  }
  const [title, setTilte] = useState<string>(task ? task.title : "");
  const [description, setDescription] = useState<string>(
    task ? task.description : ""
  );

  const inital_category_id = categories[0].category_id
    ? categories[0].category_id
    : "";
  const [category, setCategory] = useState<string>(
    task ? task.category_id : inital_category_id
  );

  const [startDate, setStartDate] = useState(
    task ? new Date(task.from_date) : new Date()
  );
  const [limitDate, setLimitDate] = useState(
    task ? new Date(task.to_date) : new Date()
  );

  const [image_name, setImageName] = useState<string | null>("");
  const [image, setImage] = useState<string>(
    task && task.image_source ? task.image_source : ""
  );
  const { registerTask, updateTask } = useActions();

  const onClick = async () => {
    let task: task = {
      id: id ? id : null,
      category_id: category,
      image_source: image,
      title: title,
      description: description,
      from_date: COMMON_FUNC.formatDateYYYYMMDD(startDate),
      to_date: COMMON_FUNC.formatDateYYYYMMDD(limitDate),
    };

    if (id) {
      if (!category_id) {
        throw new Error("カテゴリーが存在しません。");
      }
      await updateTask(category_id, task);
    } else {
      await registerTask(task);
    }

    navigate("/");
  };

  var categories_options = categories.map(function (category, index) {
    if (category && category.category_id) {
      return (
        <option value={category.category_id}>{category.message_top}</option>
      );
    } else {
      return [];
    }
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
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            COMMON_FUNC.onFileInputChange(
                              e,
                              setImageName,
                              setImage
                            )
                          }
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
                          <img src={image} alt="img" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-one-fifth">
                    <button
                      className="button is-medium is-responsive"
                      onClick={showModal}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="column is-one-fifth">
                    <button
                      className="button is-medium is-responsive"
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </button>
                  </div>
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
      <ConfirmModal
        show_modal={show_modal}
        setShowModal={setShowModal}
        confirmSubmit={onClick}
      />
    </div>
  );
};

export default TaskRegister;

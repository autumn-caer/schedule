import React, { useState } from "react";
import "../assets/css/components/display_frame_one.css";
import "../assets/css/components/task_register.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useActions } from "../hooks/use-actions";
import { category } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import * as COMMON_FUNC from "../utils/common_function";
import ConfirmModal from "../atoms/confirm_modal";

interface CategoryRegisterProps {}

const CategoryRegister: React.FC<CategoryRegisterProps> = () => {
  const { categories } = useTypedSelector((state) => state.categories);

  const { id } = useParams();
  const navigate = useNavigate();
  const { registerCategory, updateCategory } = useActions();
  const [show_modal, setShowModal] = useState<boolean>(false);

  const showModal = () => {
    setShowModal(true);
  };

  let target_category = null;
  if (id) {
    target_category = categories.find(
      (category) => category.category_id === id
    );

    if (!target_category) {
      throw new Error("カテゴリーが存在しません。");
    }
  }

  const [name, setName] = useState<string>(
    target_category ? target_category.name : ""
  );
  const [message_top, setMessageTop] = useState<string>(
    target_category ? target_category.message_top : ""
  );
  const [message_middle, setMessageMiddle] = useState<string>(
    target_category ? target_category.message_middle : ""
  );
  const [message_bottom, setMessageBottom] = useState<string>(
    target_category ? target_category.message_bottom : ""
  );

  const [image_name, setImageName] = useState<string | null>(
    target_category && target_category.main_image
      ? target_category.main_image.name
      : ""
  );
  const [image, setImage] = useState<string>(
    target_category && target_category.main_image
      ? target_category.main_image.source
      : ""
  );

  const onClick = async () => {
    let new_category: category = {
      category_id: "",
      name: name,
      main_image: { source: image, name: image_name ? image_name : "" },
      scroll_tasks: [],
      message_top: message_top,
      message_middle: message_middle,
      message_bottom: message_bottom,
      task_list_desplay: false,
    };

    if (id) {
      new_category.category_id = id;
      updateCategory(new_category);
    } else {
      console.log(new_category);

      registerCategory(new_category);
    }

    navigate("/");
  };

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
                    <label className="label">NAME</label>
                    <input
                      className="input is-rounded"
                      type="text"
                      placeholder="Text input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">TOP_MESSAGE</label>
                    <textarea
                      className="textarea"
                      placeholder="Textarea"
                      value={message_top}
                      onChange={(e) => setMessageTop(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">MIDDLE_MESSAGE</label>
                    <textarea
                      className="textarea"
                      placeholder="Textarea"
                      value={message_middle}
                      onChange={(e) => setMessageMiddle(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">BOTTOM_MESSAGE</label>
                    <textarea
                      className="textarea"
                      placeholder="Textarea"
                      value={message_bottom}
                      onChange={(e) => setMessageBottom(e.target.value)}
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

export default CategoryRegister;

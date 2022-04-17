import React, { useRef, useEffect, useState } from "react";
import "../assets/css/components/display_frame_one.css";
import "../assets/css/components/task_register.css";
import { imageTag } from "../types/types";
import { useActions } from "../hooks/use-actions";
import { category, task } from "../types/types";
import { store } from "../../practise04/state";
import scroll_images_01 from "../assets/images/mv1_2.jpeg";
import { useNavigate } from "react-router-dom";

interface CategoryRegisterProps {
  title: string;
  image_tags: imageTag[];
}

const CategoryRegister: React.FC<CategoryRegisterProps> = ({
  title,
  image_tags,
}) => {
  const todoRef = useRef<HTMLInputElement | null>(null);
  const messageTopRef = useRef<HTMLTextAreaElement | null>(null);
  const messageMiddleRef = useRef<HTMLTextAreaElement | null>(null);
  const messageBottomRef = useRef<HTMLTextAreaElement | null>(null);

  const imageRef = useRef<HTMLInputElement | null>(null);

  const [image_name, setImageName] = useState<string | null>("");
  const [image, setImage] = useState<string>("");
  const { registerCategory } = useActions();
  const navigate = useNavigate();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target != null) {
      if (e.target.files != null) {
        if (e.target.files != null) {
          setImageName(e.target.files.item(0)!.name);
          setImage(URL.createObjectURL(e.target.files.item(0)));
        }
      }
    }
  };

  const onClick = async () => {
    console.log("hereee");
    let new_category: category = {
      category_id: "2",
      main_image: { source: scroll_images_01, name: "01" },
      scroll_tasks: [],
      message_top: "message_top",
      message_middle: "message_middle",
      message_below: "message_below",
      task_list_desplay: false,
    };

    registerCategory("12344", new_category);
    console.log(store.getState().categories);
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
                <div className="title is-1">{title}</div>
                <div className="field">
                  <div className="control">
                    <label className="label">NAME</label>
                    <input
                      ref={todoRef}
                      className="input is-rounded"
                      type="text"
                      placeholder="Text input"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">TOP_MESSAGE</label>
                    <textarea
                      ref={messageTopRef}
                      className="textarea"
                      placeholder="Textarea"
                    ></textarea>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">MIDDLE_MESSAGE</label>
                    <textarea
                      ref={messageMiddleRef}
                      className="textarea"
                      placeholder="Textarea"
                    ></textarea>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">BOTTOM_MESSAGE</label>
                    <textarea
                      ref={messageBottomRef}
                      className="textarea"
                      placeholder="Textarea"
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

export default CategoryRegister;

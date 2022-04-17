import React, { useRef, useEffect, useState } from "react";
import "../assets/css/components/display_frame_one.css";
import "../assets/css/components/task_register.css";
import { imageTag } from "../types/types";
import { useActions } from "../hooks/use-actions";
import { category, task } from "../types/types";

import main_image from "../assets/images/movie_ph0.jpeg";
import scroll_images_01 from "../assets/images/mv1_2.jpeg";

interface TaskRegisterProps {
  title: string;
  image_tags: imageTag[];
}

const TaskRegister: React.FC<TaskRegisterProps> = ({ title, image_tags }) => {
  const todoRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const limitRef = useRef<HTMLSelectElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const [image_name, setImageName] = useState<string | null>("");
  const [image, setImage] = useState<string>("");
  const { registerTask } = useActions();

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
    let test: task = {
      category_id: "1",
      image_source: scroll_images_01,
      title: "task_01",
      description: "",
      from_date: "",
      to_date: "",
    };
  };

  var image_list = image_tags.map(function (image_source) {
    return (
      <li>
        <img src={image_source.source} />
      </li>
    );
  });

  let testlist = [{ value: "", name: "" }, {}];
  let pulldown_list = image_tags.map(function (image_source) {
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
              <div className="column is-three-quarters">
                <div className="title is-1">{title}</div>
                <div className="field">
                  <div className="control">
                    <label className="label">Category</label>
                    <div className="select is-rounded">
                      <select ref={categoryRef}>
                        <option>Rounded dropdown</option>
                        <option>With options</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">TO DO</label>
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
                    <label className="label">Limit</label>
                    <div className="select is-rounded">
                      <select ref={limitRef}>
                        <option>Rounded dropdown</option>
                        <option>With options</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Message</label>
                    <textarea
                      ref={messageRef}
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

export default TaskRegister;

import React, { useState, useMemo } from "react";
import "../assets/css/components/display_frame_one.css";
import "../assets/css/components/task_register.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useActions } from "../hooks/use-actions";
import { category } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import * as COMMON_FUNC from "../utils/common_function";
import ConfirmModal from "../atoms/confirm_modal";
import { useForm, SubmitHandler } from "react-hook-form";

interface CategoryRegisterProps {}

type Inputs = {
  name: string;
  message_top: string;
  message_middle: string;
  message_bottom: string;
};

const CategoryRegister: React.FC<CategoryRegisterProps> = () => {
  const { categories } = useTypedSelector((state) => state.categories);
  const { id } = useParams();
  const navigate = useNavigate();
  const { registerCategory, updateCategory } = useActions();
  const [show_modal, setShowModal] = useState<boolean>(false);

  let target_category: category | null = null;
  if (id) {
    let tmp = categories.find((category) => category.category_id === id);

    if (!tmp) {
      throw new Error("カテゴリーが存在しません。");
    }

    target_category = tmp;
  }
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

  const defaultValues = useMemo(() => {
    return {
      name: target_category?.name,
      message_top: target_category?.message_top,
      message_middle: target_category?.message_middle,
      message_bottom: target_category?.message_bottom,
    };
  }, [target_category]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: defaultValues,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setShowModal(true);
  };

  const saveCategory = async () => {
    let new_category: category = {
      category_id: "",
      name: watch("name"),
      main_image: { source: image, name: image_name ? image_name : "" },
      scroll_tasks: [],
      message_top: watch("message_top"),
      message_middle: watch("message_middle"),
      message_bottom: watch("message_bottom"),
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <p className="help is-danger">This field is required</p>
                      )}
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <label className="label">TOP_MESSAGE</label>
                      <textarea
                        className="textarea"
                        placeholder="Textarea"
                        {...register("message_top", { required: true })}
                      ></textarea>
                      {errors.message_top && (
                        <p className="help is-danger">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">MIDDLE_MESSAGE</label>
                      <textarea
                        className="textarea"
                        placeholder="Textarea"
                        {...register("message_middle", { required: true })}
                      ></textarea>
                      {errors.message_middle && (
                        <p className="help is-danger">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">BOTTOM_MESSAGE</label>
                      <textarea
                        className="textarea"
                        placeholder="Textarea"
                        {...register("message_bottom", { required: true })}
                      ></textarea>
                      {errors.message_bottom && (
                        <p className="help is-danger">This field is required</p>
                      )}
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
                        type="submit"
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
            </form>
          </div>
        </div>
        <div className="column frame_color_light_pink next">
          <div style={{ borderBottomColor: "rgb(150, 105, 73);" }}>next</div>
        </div>
      </div>
      <ConfirmModal
        show_modal={show_modal}
        setShowModal={setShowModal}
        confirmSubmit={saveCategory}
      />
    </div>
  );
};

export default CategoryRegister;

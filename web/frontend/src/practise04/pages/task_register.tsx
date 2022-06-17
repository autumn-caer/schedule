import React, { useState, useMemo } from "react";
import "../assets/css/components/display_frame_one.css";
import "../assets/css/components/task_register.css";

import { useActions } from "../hooks/use-actions";
import { task, category } from "../types/types";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import * as COMMON_FUNC from "../utils/common_function";
import ConfirmModal from "../atoms/confirm_modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { DatePicker } from "../atoms/date_picker";
import * as FIREBASE_FUNC from "../utils/firebase_function";
import { CategoryConverter, TaskConverter } from "../converters/converters";
import { TASK_IMAGE_FOLDER, STATUS_LIST } from "../consts/consts";

import {
  collection,
  setDoc,
  doc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";

import { db } from "../../firebase";

interface TaskRegisterProps {}

type Inputs = {
  title: string;
  description: string;
  category: string;
  from_date: Date;
  to_date: Date;
  status: string;
};

const TaskRegister: React.FC<TaskRegisterProps> = () => {
  const navigate = useNavigate();
  const [show_modal, setShowModal] = useState<boolean>(false);
  const { registerTask, updateTask } = useActions();
  const { categories } = useTypedSelector((state) => state.categories);
  const { category_id, id } = useParams();

  let task: task | null = null;
  let target_category: category | null | undefined = null;
  if (category_id) {
    target_category = categories.find(
      (category) => category.category_id === category_id
    );

    if (!target_category) {
      throw new Error("カテゴリーが存在しません。");
    }

    if (id) {
      let tmp = target_category.scroll_tasks.find((task) => task.id === id);
      if (!tmp) {
        throw new Error("タスクが存在しません。");
      }
      task = tmp;
    }
  }

  const [image_name, setImageName] = useState<string | null>("");
  const [image, setImage] = useState<string>(
    task && task.image_source ? task.image_source : ""
  );

  const defaultValues = useMemo(() => {
    return {
      title: task?.title,
      category: target_category?.category_id,
      from_date: task ? new Date(task.from_date) : new Date(),
      to_date: task ? new Date(task.to_date) : new Date(),
      status: task?.title,
    };
  }, [task, target_category]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: defaultValues,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setShowModal(true);
  };

  const saveTask = async () => {
    let task: task = {
      id: id ? id : null,
      category_id: watch("category"),
      image_source: image,
      title: watch("title"),
      description: watch("description"),
      from_date: COMMON_FUNC.formatDateYYYYMMDD(watch("from_date")),
      to_date: COMMON_FUNC.formatDateYYYYMMDD(watch("to_date")),
      status: watch("status"),
    };

    if (id && !category_id) {
      throw new Error("カテゴリーが存在しません。");
    }

    let updateRef: DocumentReference<DocumentData> | null = null;
    if (id) {
      updateRef = doc(db, "task", id).withConverter(TaskConverter);
    } else {
      updateRef = doc(collection(db, "task")).withConverter(TaskConverter);
    }

    if (updateRef) {
      await setDoc(updateRef, task);
      if (image) {
        await FIREBASE_FUNC.uploadImage(image, TASK_IMAGE_FOLDER, updateRef.id);
      } else {
        await FIREBASE_FUNC.deleteImage(TASK_IMAGE_FOLDER, updateRef.id);
      }
    }

    navigate("/");
  };

  var categories_options = categories.map(function (category, index) {
    if (category && category.category_id) {
      return (
        <option key={category.category_id} value={category.category_id}>
          {category.name}
        </option>
      );
    } else {
      return [];
    }
  });

  var status_options = STATUS_LIST.map(function (status, index) {
    return (
      <option key={status.id} value={status.id}>
        {status.name}
      </option>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="columns">
                <div className="column"></div>
                <div className="column is-three-quarters">
                  <div className="title is-1">Register / Edit</div>
                  <div className="field">
                    <div className="control">
                      <label className="label">Category</label>
                      <div className="select is-rounded">
                        <select {...register("category")}>
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
                        {...register("title", { required: true })}
                      />
                      {errors.title && (
                        <p className="help is-danger">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">Status</label>
                      <div className="select is-rounded">
                        <select {...register("status")}>
                          {status_options}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <DatePicker
                        label="from_date"
                        name="from_date"
                        control={control}
                        error={errors.from_date?.message}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <DatePicker
                        label="to_date"
                        name="to_date"
                        control={control}
                        error={errors.to_date?.message}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">Message</label>
                      <textarea
                        className="textarea"
                        placeholder="Textarea"
                        defaultValue={task?.description}
                        {...register("description", { required: true })}
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
        confirmSubmit={saveTask}
      />
    </div>
  );
};

export default TaskRegister;

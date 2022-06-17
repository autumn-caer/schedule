import React, { useState, useMemo, useEffect } from "react";
import "../assets/css/components/display_frame_one.css";
import "../assets/css/components/task_register.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { category } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import * as COMMON_FUNC from "../utils/common_function";
import * as FIREBASE_FUNC from "../utils/firebase_function";
import { CategoryConverter } from "../converters/converters";
import ConfirmModal from "../atoms/confirm_modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { CATEGORY_IMAGE_FOLDER } from "../consts/consts";
import {
  collection,
  setDoc,
  doc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";

import { db } from "../../firebase";
// import RNFetchBlob from "rn-fetch-blob";

interface CategoryRegisterProps {}

type Inputs = {
  name: string;
  message_top: string;
  message_middle: string;
  message_bottom: string;
};

const CategoryRegister: React.FC<CategoryRegisterProps> = () => {
  const { categories } = useTypedSelector((state) => state.categories);
  const { user_id } = useTypedSelector((state) => state.login);
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [image, setImage] = useState<string>("");

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
      main_image: { source: "", name: image_name ? image_name : "" },
      scroll_tasks: [],
      message_top: watch("message_top"),
      message_middle: watch("message_middle"),
      message_bottom: watch("message_bottom"),
      task_list_desplay: false,
      user_id: user_id,
    };

    console.log(new_category);

    let updateRef: DocumentReference<DocumentData> | null = null;
    if (id) {
      updateRef = doc(db, "category", id).withConverter(CategoryConverter);
    } else {
      //Userレファレンスを作成する
      updateRef = doc(collection(db, "category")).withConverter(
        CategoryConverter
      );
    }

    if (updateRef) {
      await setDoc(updateRef, new_category);
      if (image) {
        await FIREBASE_FUNC.uploadImage(
          image,
          CATEGORY_IMAGE_FOLDER,
          updateRef.id
        );
      } else {
        await FIREBASE_FUNC.deleteImage(CATEGORY_IMAGE_FOLDER, updateRef.id);
      }
    }

    navigate("/");
  };

  useEffect(() => {
    const fetch_data = async () => {
      if (id && target_category) {
        if (!target_category.main_image.name) {
          return;
        }
        await FIREBASE_FUNC.downloadImage(CATEGORY_IMAGE_FOLDER, id)
          .then((url) => {
            setImage(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    fetch_data();
  }, []);

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
                      <label className="file-label">
                        <span
                          className="file-cta"
                          onClick={() =>
                            COMMON_FUNC.deleteImage(setImageName, setImage)
                          }
                        >
                          <span className="file-icon">
                            <i className="fas fa-upload"></i>
                          </span>
                          <span className="file-label">キャンセル</span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <div className="task_image_wrapper">
                        <ul>
                          {image && (
                            <li>
                              <img src={image} alt="img" />
                            </li>
                          )}
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

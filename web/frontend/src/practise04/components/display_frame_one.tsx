import React, { useState, useMemo, useEffect } from "react";
import "../assets/css/components/display_frame_one.css";
import SmallHorizontalLoopImages from "./small_horizontal_loop_images";
import { category } from "../types/types";
import { CATEGORY_IMAGE_FOLDER } from "../consts/consts";
import * as FIREBASE_FUNC from "../utils/firebase_function";
interface DisplayFrameOneProps {
  category: category;
}

const DisplayFrameOne: React.FC<DisplayFrameOneProps> = ({ category }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const fetch_data = async () => {
      await FIREBASE_FUNC.downloadImage(
        CATEGORY_IMAGE_FOLDER,
        category.category_id
      )
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetch_data();
  }, []);

  return (
    <div className="position_relative mb_20">
      <div className="frame_color_light_blue"></div>
      <div className="columns" style={{ position: "absolute", top: "100px" }}>
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-3by3">
                <img src={image} alt="img" />
              </figure>
            </div>
          </div>
        </div>
        <div className="column padding_3_percent">
          <div className="is-ancestor">
            <div className="has-text-left">
              <div className="is-parent is-vertical">
                <article className="is-child mb_7_percent">
                  <p className="subtitle">{category.message_top}</p>
                </article>
                <article className="is-child mb_7_percent">
                  <p className="is-size-5">{category.message_middle}</p>
                </article>
                <article className="is-child mb_7_percent">
                  <p className="is-size-5">{category.message_bottom}</p>
                </article>
                <article className="is-child mb_7_percent">
                  <SmallHorizontalLoopImages
                    scroll_tasks={category.scroll_tasks}
                  />
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayFrameOne;

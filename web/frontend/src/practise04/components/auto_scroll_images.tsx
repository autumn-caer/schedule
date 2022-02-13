import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import scroll_images_01 from "../assets/images/mv1_2.jpeg";
import scroll_images_02 from "../assets/images/mv1_0.jpeg";
import scroll_images_03 from "../assets/images/mv0_2.jpeg";
import scroll_images_04 from "../assets/images/mv0_1.jpeg";

// ↓追加
import { autoPlay } from "react-swipeable-views-utils";

// ↓ここで自動的にスライドするようにする
const EnhancedSwipeableViews = autoPlay(SwipeableViews);

const AutoAcrollImages: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  return (
    <EnhancedSwipeableViews
      index={index}
      onChangeIndex={(step) => setIndex(step)}
      enableMouseEvents
    >
      <figure className="image is-4by3">
        <img src={scroll_images_01} alt="image_01" />
      </figure>
      <figure className="image is-4by3">
        <img src={scroll_images_02} alt="image_02" />
      </figure>
      <figure className="image is-4by3">
        <img src={scroll_images_03} alt="image_03" />
      </figure>
      <figure className="image is-4by3">
        <img src={scroll_images_04} alt="image_04" />
      </figure>
    </EnhancedSwipeableViews>
  );
};

export default AutoAcrollImages;

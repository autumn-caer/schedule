import React, { useRef, useState, useEffect } from "react";
import { tsConstructSignatureDeclaration } from "jscodeshift";

interface TitleCardProps {
  image?: string;
  description?: string;
  height?: number;
  width?: number;
}

const ImageWithAltDefault: React.FC<TitleCardProps> = ({
  image,
  description,
}) => {
  const imageDivRef = useRef<HTMLDivElement>(null);
  const [image_height, setHeight] = useState<number>(0);

  // const width = height * 1.5;

  useEffect(() => {
    if (imageDivRef && imageDivRef.current != null) {
      setHeight(imageDivRef.current.offsetWidth * 0.75);
      console.log(imageDivRef.current.offsetWidth);
      console.log(imageDivRef);
    }
  }, [imageDivRef]);

  return image ? (
    <img src={image} alt="img" />
  ) : (
    <div
      className="card frame_color_light_purple"
      style={{ width: `100%`, height: image_height }}
      ref={imageDivRef}
    >
      {description}
      "kokdo"
    </div>
  );
};

export default ImageWithAltDefault;

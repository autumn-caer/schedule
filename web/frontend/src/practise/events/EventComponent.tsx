import React from "react";

const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const onDragStartHandler = (event :React.DragEvent<HTMLDivElement>) => {
  console.log(event);
};

const EventComponent: React.FC = () => {
  return (
    <div>
      <input onChange={onChangeHandler} />
      <div draggable onDragStart={onDragStartHandler}>
        Drag Me!
      </div>
    </div>
  );
};

export default EventComponent;

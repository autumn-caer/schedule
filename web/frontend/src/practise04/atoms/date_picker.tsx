import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import ReactDatePicker from "react-datepicker";
import { Control, Controller, Path } from "react-hook-form";

type Props<T> = {
  label: string;
  name: Path<T>;
  error?: string;
  control: Control<T>;
};

export const DatePicker = <T,>({ label, name, control, error }: Props<T>) => {
  return (
    <>
      <label htmlFor={name} className="label">
        {label}
      </label>

      <div>
        <Controller
          rules={{ required: "入力してください" }}
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              dateFormat="yyyy/MM/dd"
              onChange={onChange}
              selected={value as Date}
              className="input is-rounded"
            />
          )}
        />
      </div>
      <p></p>
      <p className="help is-danger">{error}</p>
    </>
  );
};

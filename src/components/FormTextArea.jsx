import React from "react";
import { forwardRef } from "react";

const FormTextArea = forwardRef(
  (
    { type, placeholder, onChange, onBlur, name, label, error, children },
    ref
  ) => {
    const errorClassLabel = error
      ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
      : "block mb-2 text-sm font-medium text-white";

    const errorClassInput = error
      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
      : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl  block w-full p-2.5 focus:border-black focus:ring-black  ";

    return (
      <div className="mb-6 ">
        <label htmlFor="email" className={errorClassLabel}>
          {label}
        </label>

        <textarea
          className={errorClassInput}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          rows="10"
        />
        {children}
      </div>
    );
  }
);

export default FormTextArea;

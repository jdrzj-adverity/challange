import React from "react";
import styles from "./Select.module.css";

const Select = ({options, value, onChange, label}) => {
  const handleChange = event => {
    const selectedOptions = [...event.currentTarget.options].filter(option => option.selected).map(option => option.value);
    onChange(selectedOptions);
  };

  return (
    <label className={styles.label}>
      {label}
      <select
        className={styles.select}
        options={options}
        onChange={handleChange}
        multiple
        value={value}
        size={Math.min(options.length, 10)}
      >
        {options.map(option =>
          <option key={option} className={styles.option}>{option}</option>
        )}
      </select>
    </label>
  )
};

export default Select;
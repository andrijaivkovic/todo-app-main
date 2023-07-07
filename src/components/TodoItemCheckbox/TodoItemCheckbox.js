import { useState } from "react";

const TodoItemCheckbox = ({ itemId, isCompleted, isDisabled, onChange }) => {
  const iconCheck = "https://i.ibb.co/d4xgZ2g/icon-check.png";

  isDisabled = !!isDisabled;

  const [checked, setChecked] = useState(isCompleted);

  const handleChecked = (e) => {
    const isChecked = e.target.checked;

    setChecked(isChecked);
    onChange(isChecked, itemId);
  };

  return (
    <div className="todo-item-checkbox">
      <label
        style={
          isCompleted
            ? {
                background: `url(${iconCheck}), linear-gradient(135deg,rgba(87, 221, 255, 1) 0%,rgba(192, 88, 243, 1) 100%)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }
            : null
        }
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={isDisabled}
          onChange={handleChecked}
        />
      </label>
    </div>
  );
};

export default TodoItemCheckbox;

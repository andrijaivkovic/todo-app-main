import { useState } from "react";
import TodoItemCheckbox from "../TodoItemCheckbox/TodoItemCheckbox";

const TodoInput = ({ handleNewItem }) => {
  const [inputedTodo, setInputedTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputedTodo) return;

    handleNewItem(inputedTodo);

    setInputedTodo("");
  };

  return (
    <div className="todo-input">
      <TodoItemCheckbox isDisabled={true}></TodoItemCheckbox>
      <form onSubmit={(e) => handleSubmit(e)} className="todo-input__input">
        <input
          onChange={(e) => setInputedTodo(e.target.value)}
          value={inputedTodo}
          type="text"
          placeholder="Create a new todo..."
        />
      </form>
    </div>
  );
};

export default TodoInput;

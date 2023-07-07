import TodoItemCheckbox from "../TodoItemCheckbox/TodoItemCheckbox";

const TodoItem = (props) => {
  return (
    <div className="todo-item">
      <TodoItemCheckbox
        itemId={props.itemId}
        onChange={props.handleCompleted}
        isCompleted={props.isCompleted}
        isDisabled={false}
      ></TodoItemCheckbox>
      <p
        style={
          props.isCompleted
            ? { textDecoration: "line-through", color: "var(--color-text-2)" }
            : null
        }
        className="todo-item__description"
      >
        {props.text}
      </p>
      <button
        onClick={() => props.handleItemDelete(props.itemId)}
        className="todo-item__delete"
      ></button>
    </div>
  );
};

export default TodoItem;

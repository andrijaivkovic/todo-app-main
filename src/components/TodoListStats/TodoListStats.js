const TodoListStats = ({ completedCount, handleClearCompleted }) => {
  const completedCountNumber = Number(completedCount);

  return (
    <div className="todo-list-stats">
      <p className="todo-list-stats__items-left">
        {completedCountNumber === 0
          ? `No items left. Congrats!`
          : `${completedCountNumber} items left`}
      </p>
      <button
        onClick={handleClearCompleted}
        className="todo-list-stats__clear-completed"
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoListStats;

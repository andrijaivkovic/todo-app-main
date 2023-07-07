const TodoListFilter = ({ handleFilter, filteredBy }) => {
  return (
    <div className="todo-list-filter">
      <button
        onClick={(e) => handleFilter(e.target.dataset.filter)}
        data-filter="all"
        className={`todo-list-filter__all ${
          filteredBy === "all" ? "active" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={(e) => handleFilter(e.target.dataset.filter)}
        data-filter="active"
        className={`todo-list-filter__active ${
          filteredBy === "active" ? "active" : ""
        }`}
      >
        Active
      </button>
      <button
        onClick={(e) => handleFilter(e.target.dataset.filter)}
        data-filter="completed"
        className={`todo-list-filter__completed ${
          filteredBy === "completed" ? "active" : ""
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoListFilter;

import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import Header from "./components/Header/Header";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoList from "./components/TodoList/TodoList";
import TodoListStats from "./components/TodoListStats/TodoListStats";
import TodoListFilter from "./components/TodoListFilter/TodoListFilter";

const App = () => {
  const [currentTheme, setTheme] = useState(getInitialTheme);

  const [items, setItems] = useState(getInitialItems);

  const [filteredBy, setFilteredBy] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);

  const completedCount = items.reduce((acc, item) => {
    return !item.isCompleted ? acc + 1 : acc;
  }, 0);

  function getInitialTheme() {
    const data = localStorage.getItem("APP_THEME");
    const savedTheme = JSON.parse(data);
    return savedTheme || "light";
  }

  useEffect(() => {
    const data = JSON.stringify(currentTheme);
    localStorage.setItem("APP_THEME", data);
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.className = "";
    document.documentElement.classList.add(
      currentTheme === "dark" ? "dark" : "light"
    );
  }, [currentTheme]);

  useEffect(() => {
    handleFilter(filteredBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function getInitialItems() {
    const data = localStorage.getItem("APP_STATE");
    const savedTodos = JSON.parse(data);
    return savedTodos || [];
  }

  useEffect(() => {
    window.localStorage.setItem("APP_STATE", JSON.stringify(items));
  }, [items]);

  const handleThemeToggle = () => {
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const handleCompleted = (isChecked, itemId) => {
    setItems((items) =>
      items.map((item) =>
        // eslint-disable-next-line
        item.id == itemId ? { ...item, isCompleted: isChecked } : item
      )
    );
  };

  const handleClearCompleted = () => {
    const newItems = items
      .filter((item) => (item.isCompleted ? null : item))
      .map((item) => item);

    setItems(newItems);
  };

  const handleItemDelete = (itemId) => {
    const newItems = items
      .filter((item) => (item.id === itemId ? null : item))
      .map((item) => item);

    setItems(newItems);
  };

  const handleFilter = (filterBy) => {
    if (filterBy === "all") {
      setFilteredBy(filterBy);
    }

    if (filterBy === "active") {
      const newFilteredItems = items
        .filter((item) => (item.isCompleted ? null : item))
        .map((item) => item);

      setFilteredItems(newFilteredItems);
      setFilteredBy(filterBy);
    }

    if (filterBy === "completed") {
      const newFilteredItems = items
        .filter((item) => (item.isCompleted ? item : null))
        .map((item) => item);

      setFilteredItems(newFilteredItems);
      setFilteredBy(filterBy);
    }
  };

  const handleNewItem = (itemText) => {
    const newItem = {
      id: uuidv4(),
      text: itemText,
      isCompleted: false,
    };

    setItems((items) => [newItem, ...items]);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    if (filteredBy === "all") {
      const newItems = [...items];
      const [reorderedItem] = newItems.splice(result.source.index, 1);

      newItems.splice(result.destination.index, 0, reorderedItem);

      setItems(newItems);
    }

    if (filteredBy === "completed" || filteredBy === "active") {
      const newItems = [...filteredItems];
      const [reorderedItem] = newItems.splice(result.source.index, 1);

      newItems.splice(result.destination.index, 0, reorderedItem);

      setFilteredItems(newItems);
    }
  };

  return (
    <>
      <Header
        currentTheme={currentTheme}
        handleThemeToggle={handleThemeToggle}
      ></Header>
      <main className="todo">
        <TodoInput handleNewItem={handleNewItem}></TodoInput>
        <TodoList>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos-list">
              {(provided) => {
                return filteredBy === "all" ? (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TodoItem
                              handleItemDelete={handleItemDelete}
                              handleCompleted={handleCompleted}
                              itemId={item.id}
                              key={item.id}
                              text={item.text}
                              isCompleted={item.isCompleted}
                            ></TodoItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                ) : filteredBy === "active" || filteredBy === "completed" ? (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredItems.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TodoItem
                              handleItemDelete={handleItemDelete}
                              handleCompleted={handleCompleted}
                              itemId={item.id}
                              key={item.id}
                              text={item.text}
                              isCompleted={item.isCompleted}
                            ></TodoItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                ) : null;
              }}
            </Droppable>
          </DragDropContext>
          <TodoListStats
            handleClearCompleted={handleClearCompleted}
            completedCount={completedCount}
          ></TodoListStats>
        </TodoList>
        <TodoListFilter
          filteredBy={filteredBy}
          handleFilter={handleFilter}
        ></TodoListFilter>
      </main>
      <p className="instructions">Drag and drop to reorder list</p>
    </>
  );
};

export default App;

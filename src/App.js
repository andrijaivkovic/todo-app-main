import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import Header from "./components/Header/Header";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoList from "./components/TodoList/TodoList";
import TodoListStats from "./components/TodoListStats/TodoListStats";
import TodoListFilter from "./components/TodoListFilter/TodoListFilter";

// const lightTheme = {
//   "--color-primary": "hsl(220, 98%, 61%)",
//   "--color-gradient-1": "hsl(192, 100%, 67%)",
//   "--color-gradient-2": "hsl(280, 87%, 65%)",
//   "--color-bg-1": "hsl(0, 0%, 98%)",
//   "--color-bg-2": "hsl(236, 33%, 92%)",
//   "--color-text-1": "hsl(233, 11%, 84%)",
//   "--color-text-2": "hsl(236, 9%, 61%)",
//   "--color-text-3": "hsl(235, 19%, 35%)",
// };

// const darkTheme = {
//   "--color-bg-1": "hsl(235, 21%, 11%)",
//   "--color-bg-2": "hsl(235, 24%, 19%)",
//   "--color-text-1": "hsl(234, 39%, 85%)",
//   "--color-text-2": "hsl(234, 11%, 52%)",
//   "--color-text-3": "hsl(237, 14%, 26%)",
// };

// const applyTheme = (nextTheme) => {
//   const theme = nextTheme === "dark" ? darkTheme : lightTheme;
//   Object.keys(theme).forEach((key) => {
//     const value = theme[key];
//     document.documentElement.style.setProperty(key, value);
//   });
// };

const App = () => {
  // const tempItems = [
  //   {
  //     id: uuidv4(),
  //     text: "Complete online JavaScript course",
  //     isCompleted: false,
  //   },
  //   { id: uuidv4(), text: "Jog around park 3x", isCompleted: false },
  //   { id: uuidv4(), text: "10 minutes meditation", isCompleted: false },
  //   { id: uuidv4(), text: "Read for 1 hour", isCompleted: false },
  //   { id: uuidv4(), text: "Pick up groceries", isCompleted: false },
  //   {
  //     id: uuidv4(),
  //     text: "Complete Todo App on Frontend Mentor",
  //     isCompleted: false,
  //   },
  // ];

  const [currentTheme, setTheme] = useState("dark");
  const [items, setItems] = useState([]);

  const [filteredBy, setFilteredBy] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);

  const completedCount = items.reduce((acc, item) => {
    return !item.isCompleted ? acc + 1 : acc;
  }, 0);

  useEffect(() => {
    document.documentElement.className = "";
    document.documentElement.classList.add(
      currentTheme === "dark" ? "dark" : "light"
    );
  }, [currentTheme]);

  // automatically sets the theme from state on page load
  // applyTheme(currentTheme);

  useEffect(() => {
    handleFilter(filteredBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // loads the data from localStorage and (if it exists) sets it as the state array
  useEffect(() => {
    const data = window.localStorage.getItem("APP_STATE");
    if (data !== null) setItems(JSON.parse(data));
  }, []);

  // updates the data in localStorage
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
      // setFilteredItems([]);
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
        .map((item) => item); // console.log(filteredItems, filteredBy);

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

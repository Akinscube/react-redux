import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Header } from "./component/Header";
import { Form } from "./component/Form";
import { TodoList } from "./component/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { todosActions } from "./store/index";

function App() {
  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState(null);


  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const myRef = useRef(null);

  useEffect(() => {

    let oldTodos  = [];
    oldTodos = JSON.parse(window.localStorage.getItem("oldTodo"));
   
    if (oldTodos) {

    if (oldTodos.length !== 0) {
      dispatch(todosActions.todosRepopulated([...todos, ...oldTodos]));
    }

  }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("oldTodo", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <div className="my-app">
        <Header />
        <Form
          input={input}
          setInput={setInput}
          myRef={myRef}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
        />

        <TodoList setInput={setInput} myRef={myRef} setEditTodo={setEditTodo} />
      </div>
    </div>
  );
}

export default App;

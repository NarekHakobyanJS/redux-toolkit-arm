import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import InputFiled from './components/InputFiled';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos } from './store/todoSlice';
import './App.css';

function App() {
  const [text, setText] = useState('')
  const { status, error } = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const addTask = () => {
    dispatch(addTodo({ text }))
    setText("")
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])
  return (
    <div className="App">
      <InputFiled
        text={text}
        handleInput={setText}
        handleSubmit={addTask}
      />

      {
        status === "loading" && <p>Loading...</p>
      }
      {
        error && <p>An error {error}</p>
      }
      <TodoList />
    </div>
  );
}

export default App;

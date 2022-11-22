import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import React, {useEffect, useRef, useState} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import useLocalStorage from "../Hooks/useLocalStorage";
import {TodosContext} from "../Context/TodosContext";
import {CSSTransition, SwitchTransition} from "react-transition-group";

function App() {
    const nameInputEl = useRef();
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [idForTodo, setIdForTodo] = useLocalStorage('todoId', 1);
    const [filter, setFilter] = useState('all');
    const [name, setName] = useLocalStorage('name', '');

    /**
     * Filter the todos
     * @param filter
     * @returns {({isEditing: boolean, id: number, completed: boolean, title: string}|{isEditing: boolean, id: number, completed: boolean, title: string}|{isEditing: boolean, id: number, completed: boolean, title: string})[]}
     */
    function filterTodos() {
        return todos.filter(todo => {
            if (filter === 'all') {
                return todo;
            } else if (filter === 'active' && !todo.completed) {
                return todo;
            } else if (filter === 'completed' && todo.completed) {
                return todo;
            }
        })
    }

    useEffect(() => {
        nameInputEl.current.focus();
    }, [])

    function handleNameInput(event) {
        setName(event.target.value);
    }

    return (
      <TodosContext.Provider value={{
          todos,
          setTodos,
          idForTodo,
          setIdForTodo,
          filter,
          setFilter,
          filterTodos
      }}>
          <div className="todo-app-container">
              <div className="todo-app">
                  <div className="name-container">
                      <h2>What is your name?</h2>
                      <form action="#">
                          <input
                              ref={ nameInputEl }
                              type="text"
                              className="todo-input"
                              placeholder="What is your name"
                              value={ name }
                              onChange={ handleNameInput }
                          />
                      </form>
                      <CSSTransition
                          in={ name.length > 0 }
                          timeout={300}
                          classNames="slide-vertical"
                          unmountOnExit
                      >
                          <p className="name-label">Hello, { name }</p>
                      </CSSTransition>
                  </div>

                  <h2>Todo App</h2>
                  <TodoForm />

                  <SwitchTransition mode="out-in">
                      <CSSTransition
                          key={ todos.length > 0 }
                          timeout={ 300 }
                          classNames="slide-vertical"
                          unmountOnExit
                      >
                          { todos.length > 0 ? <TodoList /> : <NoTodos /> }
                      </CSSTransition>
                  </SwitchTransition>
            </div>
        </div>
    </TodosContext.Provider>
  );
}

export default App;

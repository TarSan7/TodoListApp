import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import React, {useEffect, useRef, useState} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import useLocalStorage from "../Hooks/useLocalStorage";

function App() {
    const nameInputEl = useRef();
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [idForTodo, setIdForTodo] = useLocalStorage('todoId', 1);
    const [filter, setFilter] = useState('all');
    const [name, setName] = useLocalStorage('name', '');

    /**
     * Add new todo item
     * @param title
     */
    function createTodo(title) {
        setTodos([...todos, {
            id: idForTodo,
            title: title,
            completed: false,
            isEditing: false,
        }]);

        setIdForTodo(prevValue => prevValue + 1);
    }

    /**
     * Delete todos by delete button
     * @param id
     */
    function deleteTodo(id) {
        setTodos([...todos].filter(todo => todo.id !== id));
    }

    /**
     * Complete todos by checkbox
     * @param id
     */
    function completeTodo(id) {
        setTodos([...todos].map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        }))
    }

    /**
     * Mark todos as editing
     * @param id
     */
    function markAsEditing(id) {

        setTodos([...todos].map(todo => {
            if (todo.id === id) {
                todo.isEditing = !todo.isEditing;
            }

            return todo;
        }))
    }

    /**
     * Complete todos by checkbox
     * @param id
     */
    function cancelEdit(id) {
        setTodos([...todos].map(todo => {
            if (todo.id === id) {
                todo.isEditing = !todo.isEditing;
            }

            return todo;
        }))
    }

    /**
     * Update todo
     * @param event
     * @param id
     */
    function updateTodo(event, id) {
        setTodos([...todos].map(todo => {
            if (todo.id === id && event.target.value.trim().length > 0) {
                todo.title = event.target.value;
            }

            todo.isEditing = false;

            return todo;
        }))
    }

    /**
     * Count active todos
     * @returns {number}
     */
    function remaining() {
        return todos.filter(todo => !todo.completed).length;
    }

    /**
     * Clear completed todos
     */
    function clearCompleted() {
        setTodos([...todos].filter(todo => !todo.completed));
    }

    /**
     * Mark completed all todos
     */
    function checkAll() {
        setTodos([...todos].map(todo => {
            todo.completed = true;

            return todo;
        }));
    }

    /**
     * Filter the todos
     * @param filter
     * @returns {({isEditing: boolean, id: number, completed: boolean, title: string}|{isEditing: boolean, id: number, completed: boolean, title: string}|{isEditing: boolean, id: number, completed: boolean, title: string})[]}
     */
    function filterTodos(filter) {
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

    function setTodoFilter(filter) {
        setFilter(filter);
    }

    useEffect(() => {
        nameInputEl.current.focus();
    }, [])

    function handleNameInput(event) {
        setName(event.target.value);
    }

    return (
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
                  { name ? <p className="name-label">Hello, {name}</p> : ''}
              </div>

              <h2>Todo App</h2>
              <TodoForm createTodo={ createTodo }/>

              { todos.length > 0 ? (
                  <TodoList
                      todos={ filterTodos(filter) }
                      completeTodo={ completeTodo }
                      markAsEditing={ markAsEditing }
                      updateTodo={ updateTodo }
                      cancelEdit={ cancelEdit }
                      deleteTodo={ deleteTodo }
                      remaining={ remaining }
                      clearCompleted={ clearCompleted }
                      checkAll={ checkAll }
                      setTodoFilter={ setTodoFilter }
                      filter={ filter }
                  />
              ) : (
                  <NoTodos />
              )}
        </div>
    </div>
  );
}

export default App;

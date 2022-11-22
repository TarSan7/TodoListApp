import React, {useContext} from "react";
import TodosRemaining from "./TodosRemaining";
import ClearCompletedTodos from "./ClearCompletedTodos";
import CheckAllTodos from "./CheckAllTodos";
import TodoFilters from "./TodoFilters";
import useToggle from "../Hooks/useToggle";
import {TodosContext} from "../Context/TodosContext";

export default function TodoList() {
    const { todos, setTodos, filterTodos } = useContext(TodosContext);
    const [firstVisible, setVisible] = useToggle();
    const [secondVisible, setSecondVisible] = useToggle();

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

    return (
        <div>
            <ul className="todo-list">
                { filterTodos().map(todo => (
                    <li key={ todo.id } className="todo-item-container">
                        <div className="todo-item">
                            <input
                                type="checkbox"
                                checked={ todo.completed }
                                onChange={ () => completeTodo(todo.id) }
                            />
                            {!todo.isEditing ? (
                                <span
                                    className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}
                                    onDoubleClick={ () => markAsEditing(todo.id) }
                                >
                                    { todo.title }
                                </span>
                            ) : (
                                <input
                                    type="text"
                                    className="todo-item-input"
                                    defaultValue={todo.title}
                                    onBlur={ (event) => updateTodo(event, todo.id)}
                                    onKeyDown={ event => {
                                        if (event.key === 'Enter') {
                                            updateTodo(event, todo.id);
                                        } else if (event.key === 'Escape') {
                                            cancelEdit(todo.id);
                                        }
                                    }}
                                    autoFocus
                                />
                            )}
                        </div>
                        <button
                            className="x-button"
                            onClick={ () => deleteTodo(todo.id)}
                        >
                            <svg
                                className="x-button-icon"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
            
            <div className="toggles-container">
                <button
                    className="button"
                    onClick={ setVisible }
                >
                    Show one toggle
                </button>
                <button
                    className="button"
                    onClick={ setSecondVisible }
                >
                    Show sec toggle
                </button>
            </div>

            { firstVisible &&
                <div className="check-all-container">
                    <CheckAllTodos />
                    <TodosRemaining />
                </div>
            }
            { secondVisible &&
                <div className="other-buttons-container">
                    <TodoFilters />
                    <ClearCompletedTodos />
                </div>
            }
        </div>
    );
}
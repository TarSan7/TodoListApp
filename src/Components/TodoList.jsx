import React, {useState} from "react";
import TodosRemaining from "./TodosRemaining";
import ClearCompletedTodos from "./ClearCompletedTodos";
import CheckAllTodos from "./CheckAllTodos";
import TodoFilters from "./TodoFilters";
import useToggle from "../Hooks/useToggle";

export default function TodoList(props) {
    const [firstVisible, setVisible] = useToggle();
    const [secondVisible, setSecondVisible] = useToggle();

    return (
        <div>
            <ul className="todo-list">
                { props.todos.map(todo => (
                    <li key={ todo.id } className="todo-item-container">
                        <div className="todo-item">
                            <input
                                type="checkbox"
                                checked={ todo.completed }
                                onChange={ () => props.completeTodo(todo.id) }
                            />
                            {!todo.isEditing ? (
                                <span
                                    className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}
                                    onDoubleClick={ () => props.markAsEditing(todo.id) }
                                >
                                    { todo.title }
                                </span>
                            ) : (
                                <input
                                    type="text"
                                    className="todo-item-input"
                                    defaultValue={todo.title}
                                    onBlur={ (event) => props.updateTodo(event, todo.id)}
                                    onKeyDown={ event => {
                                        if (event.key === 'Enter') {
                                            props.updateTodo(event, todo.id);
                                        } else if (event.key === 'Escape') {
                                            props.cancelEdit(todo.id);
                                        }
                                    }}
                                    autoFocus
                                />
                            )}
                        </div>
                        <button
                            className="x-button"
                            onClick={ () => props.deleteTodo(todo.id)}
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
                    <CheckAllTodos checkAll={props.checkAll}/>
                    <TodosRemaining remaining={props.remaining}/>
                </div>
            }
            { secondVisible &&
                <div className="other-buttons-container">
                    <TodoFilters setTodoFilter={ props.setTodoFilter } filter={ props.filter }/>
                    <ClearCompletedTodos clearCompleted={ props.clearCompleted }/>
                </div>
            }
        </div>
    );
}
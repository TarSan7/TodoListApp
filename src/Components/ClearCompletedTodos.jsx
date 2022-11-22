import React, {useContext} from "react";
import {TodosContext} from "../Context/TodosContext";

export default function ClearCompletedTodos() {
    const { todos, setTodos } = useContext(TodosContext);

    /**
     * Clear completed todos
     */
    function clearCompleted() {
        setTodos([...todos].filter(todo => !todo.completed));
    }

    return (
        <div>
            <button
                className="button"
                onClick={ clearCompleted }
            >
                Clear Completed
            </button>
        </div>
    );
}
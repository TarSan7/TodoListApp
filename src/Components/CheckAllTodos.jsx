import React, {useContext} from "react";
import {TodosContext} from "../Context/TodosContext";

export default function CheckAllTodos() {
    const { todos, setTodos } = useContext(TodosContext);

    /**
     * Mark completed all todos
     */
    function checkAll() {
        setTodos([...todos].map(todo => {
            todo.completed = true;

            return todo;
        }));
    }

    return (
        <div>
            <div
                className="button"
                onClick={ checkAll }
            >
                Check All
            </div>
        </div>
    );
}
import React, {useContext, useState} from "react";
import {TodosContext} from "../Context/TodosContext";

export default function TodoForm() {
    const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);
    const [inputItem, setInputItem] = useState('');

    /**
     * Add new todo item
     * @param event
     */
    function addTodo(event) {
        event.preventDefault();

        if (inputItem.trim().length === 0) {
            return ;
        }

        setTodos([...todos, {
            id: idForTodo,
            title: inputItem,
            completed: false,
            isEditing: false,
        }]);

        setIdForTodo(prevValue => prevValue + 1);
        setInputItem('');
    }

    /**
     * Add a symbol into input
     * @param event
     */
    function handleInput(event) {
        setInputItem(event.target.value);
    }

    return (
        <form action="#" onSubmit={ addTodo }>
            <input
                type="text"
                onChange={ handleInput }
                value={ inputItem }
                className="todo-input"
                placeholder="What do I need to do?.."
            />
        </form>
    );
}
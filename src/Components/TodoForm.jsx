import React, {useState} from "react";

export default function TodoForm(props) {
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

        props.createTodo(inputItem);
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
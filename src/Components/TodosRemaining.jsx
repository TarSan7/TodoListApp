import React, {useContext, useMemo} from "react";
import {TodosContext} from "../Context/TodosContext";

export default function TodosRemaining() {
    const { todos } = useContext(TodosContext);
    const remainingMemo = useMemo(remaining, [ todos ]);

    /**
     * Count active todos
     * @returns {number}
     */
    function remaining() {
        return todos.filter(todo => !todo.completed).length;
    }

    return <span>{ remainingMemo } items remaining</span>;
}
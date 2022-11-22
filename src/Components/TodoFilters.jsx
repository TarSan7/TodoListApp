import React, {useContext} from "react";
import {TodosContext} from "../Context/TodosContext";

export default function TodoFilters() {
    const { filter, setFilter } = useContext(TodosContext);

    return (
        <div>
            <button
                className={ `button filter-button ${ filter === 'all' ? 'filter-button-active' : ''}`}
                onClick={ () => setFilter('all') }
            >
                All
            </button>
            <button
                className={ `button filter-button ${ filter === 'active' ? 'filter-button-active' : ''}`}
                onClick={ () => setFilter('active') }
            >
                Active
            </button>
            <button
                className={ `button filter-button ${ filter === 'completed' ? 'filter-button-active' : ''}`}
                onClick={ () => setFilter('completed') }
            >
                Completed
            </button>
        </div>
    );
}
import React from "react";

export default function TodoFilters(props) {

    return (
        <div>
            <button
                className={ `button filter-button ${ props.filter === 'all' ? 'filter-button-active' : ''}`}
                onClick={ () => props.setTodoFilter('all') }
            >
                All
            </button>
            <button
                className={ `button filter-button ${ props.filter === 'active' ? 'filter-button-active' : ''}`}
                onClick={ () => props.setTodoFilter('active') }
            >
                Active
            </button>
            <button
                className={ `button filter-button ${ props.filter === 'completed' ? 'filter-button-active' : ''}`}
                onClick={ () => props.setTodoFilter('completed') }
            >
                Completed
            </button>
        </div>
    );
}
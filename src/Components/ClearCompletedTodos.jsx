import React from "react";

export default function ClearCompletedTodos(props) {

    return (
        <div>
            <button
                className="button"
                onClick={ props.clearCompleted }
            >
                Clear Completed
            </button>
        </div>
    );
}
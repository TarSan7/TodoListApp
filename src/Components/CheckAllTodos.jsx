import React from "react";

export default function CheckAllTodos(props) {

    return (
        <div>
            <div
                className="button"
                onClick={ props.checkAll }
            >
                Check All
            </div>
        </div>
    );
}
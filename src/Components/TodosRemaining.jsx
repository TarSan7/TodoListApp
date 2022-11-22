import React from "react";

export default function TodosRemaining(props) {

    return <span>{ props.remaining() } items remaining</span>;
}
import React from "react"

export default function Die(props) {
    return (
        <div className="dieComponent">
            <h1>{props.value}</h1>
        </div>
    )
}
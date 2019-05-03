import React from 'react'


export function TodoInput ( { handleNewTodo } ) {

    function addTodo(e) {
        let newTodo = e.target.value
        if(e.keyCode === 13 && newTodo.length !== 0) {

            handleNewTodo(newTodo)

            e.target.value = ""
        }

    }

    return (
        <header>
            <div id="new-todo-container">
                <i className="fas fa-chevron-down"></i>
                <input type="text" id="new-todo" placeholder="Entrer todo" onKeyUp={addTodo} autoFocus/>
            </div>
        </header>
    )
}

export default TodoInput;
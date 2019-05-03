import React from 'react'

export function TodoList({ todos, completionHandler, removeHandler }) {

    let completionStyle = { textDecorationLine: 'line-through' }

    let trashStyle = { color: 'red', fontSize: '18px', marginTop: '14px' }

    function checkControl(e) {

        let todoIndex = e.target.getAttribute('value')

        completionHandler(todoIndex)
    }

    function removeTodo(e) {

        let todoIndex = e.target.getAttribute('value')

        removeHandler(todoIndex)
    }

    todos = todos.map((todo, i) => {
            if(todo.isCompleted) {
                
                return <div className="todos" key={i}>
                        <div>
                            <input type="checkbox" value={i} onChange={checkControl} checked/>
                            <input type="text" value={todo.task} style={completionStyle} readOnly/>
                        </div> 
                        <i className="fas fa-trash-alt" value={i} style={trashStyle} onClick={removeTodo}></i>
                    </div> 
            }else {
                return  <div key={i}>
                            <input type="checkbox" value={i} onChange={checkControl} />
                            <input type="text" value={todo.task} readOnly/>
                        </div>
            }
        }
    )
    return (
        <section>
            { todos }
        </section>
    )
}

export default TodoList;
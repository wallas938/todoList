import React from 'react'

let indexTodoToBeChanged; 

export function TodoList({ todos, completionHandler, removeHandler, display_mode, editHandler, handleNewTask, inEditing, editModeHandler, taskEdited }) {

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

    function editEnabler(e) {

        let todo = e.target

        let todoIndex = todo.getAttribute('index')

        indexTodoToBeChanged = todoIndex; 

        editModeHandler()
    }

    function editTodo(e) {

        let newTask = e.target.value

        handleNewTask(newTask)
    }

    function validNewTask(e) {
        
        let todo = e.target

        let task = todo.value

        if(e.keyCode === 13 && task.length !== 0) {

            let indexTodoTaskToChange = todo.getAttribute('index')

            editHandler(task, indexTodoTaskToChange)

            editModeHandler()

            todo.setAttribute('readonly')
        }

    }

    function todoDisplayer() {
        if(display_mode === 'showAll') {
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
                        
                        if(inEditing && i == indexTodoToBeChanged) { //ICI !!!
                            
                            return  <div key={i}>
                                <input type="checkbox" value={i} onChange={checkControl} />
                                <input type="text" index={i} onChange={editTodo} value={taskEdited}  className="" onKeyUp={validNewTask}/>
                            </div>
                        }else {

                            return  <div key={i}>
                                <input type="checkbox" value={i} onChange={checkControl} />
                                <input type="text" index={i} value={todo.task}  className="" onDoubleClick={editEnabler} readOnly/>
                            </div>
                        }
                    }
                }
            )
        }else if(display_mode === 'onGoing') {
            todos = todos.filter(todo => {
                return !todo.isCompleted
            })
            todos = todos.map((todo, i) => {
                if(inEditing && i == indexTodoToBeChanged) {
                            
                    return  <div key={i}>
                        <input type="checkbox" value={i} onChange={checkControl} />
                        <input type="text" index={i} onChange={editTodo} value={taskEdited}  className="" onKeyUp={validNewTask}/>
                    </div>

                }else {

                    return  <div key={i}>
                        <input type="checkbox" value={i} onChange={checkControl} />
                        <input type="text" index={i} value={todo.task}  className="" onDoubleClick={editEnabler} readOnly/>
                    </div>

                }
                        
            })
            
        }else if(display_mode === 'completed') {
            todos = todos.filter(todo => {
                return todo.isCompleted
            })
            todos = todos.map((todo, i) => {
                    return <div className="todos" key={i}>
                            <div>
                                <input type="checkbox" value={i} onChange={checkControl} checked/>
                                <input type="text" value={todo.task} style={completionStyle} readOnly/>
                            </div> 
                            <i className="fas fa-trash-alt" value={i} style={trashStyle} onClick={removeTodo}></i>
                        </div> 
                }
            )
        }
        
        return todos
    }

    return (
        <section>
            { todoDisplayer() }
        </section>
    )
}

export default TodoList;
import React from 'react'
import TodoInput from './components/TodoInput/TodoInput'
import TodoList from './components/TodoList/TodoList'
import Footer from './components/Footer/Footer'

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [
                {
                    task: 'Premiere todo',
                    isCompleted: false
                },
                {
                    task: 'Deuxieme todo',
                    isCompleted: false
                },
            ],
        }
        this.handleNewTodo = this.handleNewTodo.bind(this)
        this.completionHandler = this.completionHandler.bind(this)
        this.removeHandler = this.removeHandler.bind(this)
    }

    handleNewTodo(newTodo) {

        let newTask = newTodo

        this.setState({
            todos: [
                ...this.state.todos, 
                {
                    task: newTask,
                    isCompleted: false
                }
            ]
        })
    }

    completionHandler(todoIndex) {
        

        let isCompleted = this.state.todos[todoIndex].isCompleted ? false : true

        let todo = {...this.state.todos[todoIndex], isCompleted: isCompleted }

        let todos = this.state.todos

        todos[todoIndex] = todo

        this.setState({
            todos: todos
        })
    }

    removeHandler(todoIndex) {
        
        let todoToRemove = this.state.todos[todoIndex]

        let todos = this.state.todos.filter(todo => {
            return todo !== todoToRemove
        })

        this.setState({
            todos: todos
        })
    }

    render () {
        return (
            <div>
                <TodoInput handleNewTodo={this.handleNewTodo}/>
                <TodoList todos={this.state.todos} completionHandler={this.completionHandler} removeHandler={this.removeHandler}/>
                <Footer />
            </div>
        )
    }
}

export default App
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
            inEditing: false,
            taskEdited: "",
            numberOfOnGoingTasks: "",
            display_mode: 'showAll',
        }
        this.handleNewTodo = this.handleNewTodo.bind(this)
        this.completionHandler = this.completionHandler.bind(this)
        this.removeHandler = this.removeHandler.bind(this)
        this.allCompletionHandler = this.allCompletionHandler.bind(this)
        this.displayHandler = this.displayHandler.bind(this)
        this.editHandler = this.editHandler.bind(this)
        this.editModeHandler = this.editModeHandler.bind(this)
        this.handleNewTask = this.handleNewTask.bind(this)
        this.removeAllSelected = this.removeAllSelected.bind(this)
        this.unfinishedTaskCounter = this.unfinishedTaskCounter.bind(this)
    }

    componentDidMount() {
        this.unfinishedTaskCounter()
    }

    unfinishedTaskCounter() {

        let todos = this.state.todos

        let allTodoUnchecked = todos.filter(todo => {
            return !todo.isCompleted
        })

        this.setState({
            numberOfOnGoingTasks: allTodoUnchecked.length
        })
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
        }, () => {
            this.unfinishedTaskCounter()
        })
    }

    completionHandler(todoIndex) {
        
        let todos = this.state.todos

        let isCompleted = todos[todoIndex].isCompleted ? false : true

        let todo = {...todos[todoIndex], isCompleted: isCompleted }

        todos[todoIndex] = todo

        this.setState({
            todos: todos
        }, () => {
            this.unfinishedTaskCounter()
        })
    }

    allCompletionHandler() {

        let todos = this.state.todos

        let isAllCompleted = todos.every(todo => {

            return todo.isCompleted
        })
        
        todos = this.state.todos.map(todo => {

            todo = isAllCompleted ? {...todo, isCompleted: false } : {...todo, isCompleted: true }

            return todo
        })

        this.setState({
            todos: todos,
            display_mode: 'showAll'
        }, () => {
            this.unfinishedTaskCounter()
        })
    }

    removeHandler(todoIndex) {
        
        let todoToRemove = this.state.todos[todoIndex]

        let todos = this.state.todos.filter(todo => {
            return todo !== todoToRemove
        })

        this.setState({
            todos: todos
        }, () => {
            this.unfinishedTaskCounter()
        })
    }

    removeAllSelected() {

        let todos = this.state.todos

        let allTodoUnchecked = todos.filter(todo => {
            return !todo.isCompleted
        })

        this.setState({
            todos: allTodoUnchecked
        }, () => {
            this.unfinishedTaskCounter()
        })
    }

    displayHandler(mode) {
        switch (mode) {
            case 'showAll':
                this.setState({
                    display_mode: 'showAll'
                })
                break;
            case 'onGoing':
                this.setState({
                    display_mode: 'onGoing'
                })
                break;
            case 'completed':
                this.setState({
                    display_mode: 'completed'
                })
                break;
            default:
                this.setState({
                    display_mode: 'showAll'
                })
                break;
        }
    }

    handleNewTask(newTask) {

        this.setState({

            taskEdited: newTask
        })
    }

    editHandler(task, indexTodoTaskToChange) {

        let todos = this.state.todos

        let todo = {...todos[indexTodoTaskToChange], task: task }

        todos[indexTodoTaskToChange] = todo

        this.setState({
            todos: todos,
            taskEdited: "",
        }, () => {
            this.unfinishedTaskCounter()
        })
    }

    editModeHandler() {
        this.setState(state => ({
            inEditing: !state.inEditing
        }))
    }

    render () {
        return (
            <div>
                <TodoInput 
                    allCompletionHandler={this.allCompletionHandler} 
                    handleNewTodo={this.handleNewTodo}
                />
                
                <TodoList 
                    todos={this.state.todos} 
                    completionHandler={this.completionHandler} 
                    removeHandler={this.removeHandler} 
                    display_mode={this.state.display_mode} 
                    editHandler={this.editHandler}
                    inEditing={this.state.inEditing}
                    editModeHandler={this.editModeHandler}
                    taskEdited={this.state.taskEdited}
                    handleNewTask={this.handleNewTask}
                    />

                <Footer 
                    displayHandler={this.displayHandler}
                    removeAllSelected={this.removeAllSelected}
                    numberOfOnGoingTasks={this.state.numberOfOnGoingTasks}
                />
            </div>
        )
    }
}

export default App
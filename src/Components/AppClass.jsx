import React, {Component} from 'react';
import '../App.css';
import '../reset.css';

class AppClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                {
                    id: 1,
                    title: 'Finish React Series',
                    active: false,
                },
                {
                    id: 2,
                    title: 'Go to Grocery',
                    active: true,
                },
                {
                    id: 3,
                    title: 'Do other thing',
                    active: false,
                },
            ],
            inputItem: '',
            idTodo: 4,
        }
    }

    update = (event) => {
        event.preventDefault();

        this.setState( prevState => {
            return { todos: [...prevState.todos,
                {
                    id: prevState.idTodo,
                    title: prevState.inputItem,
                    isActive: false,
                }],
                inputItem: '',
                idTodo: prevState.idTodo + 1
            };
        });
    }

    handleInput = (event) => {
        this.setState(() => {
            return { inputItem: event.target.value };
        });
    }

    delete = (id) => {
        this.setState(prevState => {
            return { todos: prevState.todos.filter(todo => todo.id !== id) };
        })
    }

    render() {
        return (
            <div className="todo-app-container">
                <div className="todo-app">
                    <h2>Todo App</h2>
                    <form
                        action="#"
                        onSubmit={ this.update }
                        onChange={ this.handleInput }
                    >
                        <input
                            value={ this.state.inputItem }
                            type="text"
                            className="todo-input"
                            placeholder="What do I need to do?.."
                        />
                    </form>

                    <ul className="todo-list">
                        { this.state.todos.map(todo => (
                            <li className="todo-item-container">
                                <div className="todo-item">
                                    <input type="checkbox" />
                                    <span className="todo-item-label">{ todo.title }</span>
                                    {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
                                </div>
                                <button
                                    className="x-button"
                                    onClick={ () => this.delete(todo.id) }
                                >
                                    <svg
                                        className="x-button-icon"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="check-all-container">
                        <div>
                            <div className="button">Check All</div>
                        </div>

                        <span>2 items remaining</span>
                    </div>

                    <div className="other-buttons-container">
                        <div>
                            <button className="button filter-button filter-button-active">
                                All
                            </button>
                            <button className="button filter-button">Active</button>
                            <button className="button filter-button">Completed</button>
                        </div>

                        <div>
                            <button className="button">Clear Completed</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppClass;
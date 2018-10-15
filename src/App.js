import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import {createTodo} from './utils/creators';
import TodoList from './components/TodoList/TodoList'

class App extends Component {
  constructor(props){
    super(props);
    
    console.log(JSON.parse(localStorage.getItem('storag')))
    
    if (!localStorage.getItem('storag')){
      this.state={
        inputValue:'',
        todos:[],
      }
    }else{ this.state={
      inputValue:'',
      todos: (JSON.parse(localStorage.getItem('storag'))),
      }};
    

    

    this._inputRef = React.createRef();

    this.onChangeInputText=this.onChangeInputText.bind(this);
    this.handleAddTodo=this.handleAddTodo.bind(this);
    this.handleTodoClick=this.handleTodoClick.bind(this);
    this.handleTodoRemoveClick=this.handleTodoRemoveClick.bind(this);
    this.getCompletedCount = this.getCompletedCount.bind(this);
    this.getItem = this.getItem.bind(this);
    this.getOllItem = this.getOllItem.bind(this);
  }

  onChangeInputText(inputValue){
    this.setState({ inputValue })
  }

  handleAddTodo(){
    const {inputValue} = this.state;

    if (inputValue.trim().length === 0){
      return
    }
    const todo = createTodo(this.state.inputValue);

    this.setState({
      inputValue: '',
      todos: [todo].concat(this.state.todos),
    },
    localStorage.getItem('storag')?
        localStorage.setItem('storag',JSON.stringify([todo]
          .concat(JSON.parse(localStorage.getItem('storag'))
        ))):localStorage.setItem('storag',JSON.stringify([todo]))
        
    )

    this._inputRef.current.focus();
  }

  handleTodoClick(id){
    const currentTodoIndex = this.state.todos.findIndex(i=> i.id=== id);

    if (currentTodoIndex === -1){
        return;
    }

    const todo = {...this.state.todos[currentTodoIndex]};
    todo.completed = !todo.completed;
    const newTodos = [...this.state.todos];
    newTodos[currentTodoIndex] = todo;

    this.setState({
      todos: newTodos,
    })
  }

  handleTodoRemoveClick(id){
    this.setState({
      todos: this.state.todos.filter(i=> i.id!==id),
    },
    localStorage.setItem('storag',JSON.stringify(JSON.parse(localStorage.getItem('storag')).filter(i=> i.id!==id)))
    );
  }

  getCompletedCount(){
    return  this.state.todos.filter(i=>i.completed).length;
  }

  getItem(completed){
    this.setState({
      todos: this.state.todos.filter(i=> i.completed!==completed),
    })
  }

  getOllItem(){
    this.setState({
      todos: JSON.parse(localStorage.getItem('storag')),
    });
  }

  render() {
    return (
      <div className="App">
        <Header 
          inputRef={this._inputRef}
          value={this.state.inputValue}
          onChangeText = {this.onChangeInputText}
          onClick={this.handleAddTodo}
        />

        <TodoList
          item={this.state.todos}
          onTodoClick={this.handleTodoClick}
          onTodoRemoveClick={this.handleTodoRemoveClick}
        />
        <footer>
          <div>Completed: {this.getCompletedCount()}</div>
          <div>Total: {JSON.parse(localStorage.getItem('storag')).length}</div>
          <div>
            <button onClick={()=>this.getItem(false)}>Completed</button> 
            <button onClick={()=>this.getItem(true)}>Not completed</button> 
            <button onClick={()=>this.getOllItem()}> Oll </button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;

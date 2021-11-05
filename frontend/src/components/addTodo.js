import React, { Component } from 'react';
import axios from 'axios';

export default class AddTodoComponent extends Component {
    
  constructor(props) {
    super(props);
    
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.state = {
      description: ''
    };
  }

  refreshPage() {
    window.location.reload(false);
  }      
    
  onDescriptionChange(e) {
    this.setState({ 
      description: e.target.value 
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const todoObject = {
      description: this.state.description,
    };
        
    console.log(todoObject);

    axios.post('http://localhost:5050/api/create-todo', todoObject)
      .then((res) => {
        console.log(res.data);
      });
    
    this.setState({ description: '' });
    this.refreshPage();
  }
    
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="mb-1 h2"><strong>Lista de Tarefas</strong></label>
            <input type="text" placeholder="Descrição" className="form-control" value={this.state.description} onChange={this.onDescriptionChange} />
          </div>
          <div className="d-grid mt-3">
            <input type="submit" value="+ Adicionar Tarefa" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }

}
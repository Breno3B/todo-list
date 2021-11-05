import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; //Source: https://www.npmjs.com/package/react-modal#examples
import dateFormat from "dateformat";


export default class ViewTodoComponent extends Component {
    
    taskObj = {
        _id: '',
        description: '',
        status: '',
        createdAt: '',
    };

    state = {
        modalIsOpen: false,
        secondModalIsOpen: false
      };
    
      openModal = (data) => {
        this.setState({ 
            modalIsOpen: true 
        });

        this.setTodoVal(data);
      };

      setTodoVal = (data) => {
         this.taskObj = {
            _id: data._id,
            description: data.description,
            status: data.status,
            createdAt: data.createdAt,
        }
      }
    
      closeModal = () => {
        this.setState({ modalIsOpen: false });
      };
    
      openSecondModal = () => {
        this.setState({ secondModalIsOpen: true });
      };
    
      closeSecondModal = () => {
        this.setState({ secondModalIsOpen: false });
      };
      
      

    constructor(props) {
        super(props)

        this.state = {
            todos: []
        };

        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
      this.getTodos();
    }

    getTodos() {
        const headers = { 'Content-Type': 'application/json' }

        const endpoint = 'http://localhost:5050/api';

        axios.get(endpoint, { headers })
        .then(response => {
            this.setState({
                todos: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        })        
    }

    deleteTodo(id) {
        axios.delete('http://localhost:5050/api/delete-todo/' + id)
            .then((res) => {
                // alert('Todo deleted!') // Remover
                this.getTodos();
            }).catch((error) => {
                console.log(error)
           })
    }

    
    onDescriptionChange(e) {
        this.taskObj = {
            _id: this.taskObj._id,
            description: e.target.value,
            status: this.taskObj.status,
        }        

        var event = new Event('input', { bubbles: true });
        this.myinput.dispatchEvent(event);
    }

    onStatusChange(e) {
      this.taskObj = {
          _id: this.taskObj._id,
          description: this.taskObj.description,
          status: e.target.value
      }        

      var event = new Event('input', { bubbles: true });
      this.myinput.dispatchEvent(event);
  }

 

    
    refreshPage() {
        window.location.reload(false);
    }

    onUpdate = () => {
        axios.put('http://localhost:5050/api/update-todo/' + this.taskObj._id, this.taskObj)
        .then((res) => {
          console.log('Todo updated' + res)
          this.refreshPage()
        }).catch((error) => {
          console.log(error)
        })
    }

   


    render() {
        const { todos } = this.state;
        return (
            <>
              <br/>
              <br/>
                <select
                  class="form-select"
                  onChange={(e) => {this.onStatusChange(e)}} ref={(input)=> this.myinput = input}>
                  <option>Ordene as tarefas por:</option>
                  <option value="Descrição">Descrição</option>
                  <option value="Status">Status</option>
                  <option value="Data">Data</option>
                </select>
                <ul className="list-group mt-3">
                    {todos.map((data) => (
                        <li key={data._id} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="col-md-5">
                               <div className="row justify-content-start">{data.description}</div>
                            </div>
                            <div className="col-md-2">
                               <div className="fw">{data.status}</div>
                            </div>
                            <div className="col-md-3">
                               <div className="fw">{dateFormat(data.createdAt, "dd/mm/yyyy - hh:MM:ss")}</div>
                            </div>
                            <span className="col-md-1 badge bg-success rounded-pill" onClick={this.openModal.bind(this, data)}>Update</span> 
                            &nbsp;
                            <span className="col-md-1 badge bg-danger rounded-pill" onClick={this.deleteTodo.bind(this, data._id)}>Delete</span>
                        </li>
                    ))}
                </ul>

                {/* Edit */}
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} ariaHideApp={false}>
                    
                    <div className="container">
                            <div className="form-group">
                                <label className="mb-2"><strong>Update Task</strong></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    defaultValue={this.taskObj.description} 
                                    onChange={(e) => {this.onDescriptionChange(e)}} ref={(input)=> this.myinput = input}
                                />
                                <select
                                  class="form-select"
                                  onChange={(e) => {this.onStatusChange(e)}} ref={(input)=> this.myinput = input}>
                                  <option>Defina o status da tarefa</option>
                                  <option value="pendente">pendente</option>
                                  <option value="em andamento">em andamento</option>
                                  <option value="concluído">concluído</option>
                                </select>
                            </div>

                            <div className="d-grid mt-3 gap-2">
                                <input type="button" onClick={this.onUpdate} value="Update" className="btn btn-success"/>
                                <button onClick={this.closeModal} className="btn btn-warning">close</button>
                            </div>
                    </div>
                </Modal>                
            </>    
        )
    }

}
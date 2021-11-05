import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddTodo from './components/addTodo';
import ViewTodo from './components/viewTodo';

function App() {
  return (
    <div className="App container mt-5">
      <AddTodo />
      <ViewTodo />
    </div>
  );
}

export default App;
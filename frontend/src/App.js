import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddTodo from './components/addTodo';

function App() {
  return (
    <div className="App container mt-5">
      <AddTodo />
    </div>
  );
}

export default App;
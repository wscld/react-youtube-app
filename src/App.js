import React from 'react';
import Home from './Pages/Home';
import './App.css';
import Detail from './Pages/Detail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail/:id" children={<Detail/>}/>
        <Route path="/" children={<Home/>}/>
      </Switch>
    </Router>
  );
}

export default App;

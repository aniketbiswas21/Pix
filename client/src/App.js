import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/chat/:id" component={Chat} />
      </Router>
    </div>
  );
};

export default App;

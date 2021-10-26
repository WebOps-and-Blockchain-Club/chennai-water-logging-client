import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AddData } from "./Components/Pages/AddData";
import { Dashboard } from "./Components/Pages/AdminDashboard";
import { DisplayData } from "./Components/Pages/DisplayData";

function App() {
  return (
    <Router>
      <Route exact path="/" component={AddData} />
      <Route exact path="/data/:id" component={DisplayData} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;

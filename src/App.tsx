import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AddData } from "./Components/Pages/AddData";
import PasswordForm from "./Components/Pages/Admin/PasswordForm";
import { DisplayData } from "./Components/Pages/DisplayData";

function App() {
  return (
    <Router>
      <Route exact path="/" component={AddData} />
      <Route exact path="/data/:id" component={DisplayData} />
      <Route exact path="/dashboard">
        < PasswordForm  />
        </Route>
    </Router>
  );
}

export default App;

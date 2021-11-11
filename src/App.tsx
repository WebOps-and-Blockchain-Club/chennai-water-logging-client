import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import { AddData } from "./Components/Pages/AddData";
import Dashboard from "./Components/Pages/Admin/Dashboard";
import PasswordForm from "./Components/Pages/Admin/PasswordForm";
import { DisplayData } from "./Components/Pages/DisplayData";

function App() {
  return (
    <Router>
      <Route exact path="/" component={AddData} />
      <Route exact path="/data/:id" component={DisplayData} />
      <Route exact path="/dashboard">
        <PasswordForm />
      </Route>
      <Route exact path="/submissions">
        <Dashboard />
      </Route>
      <Footer />
    </Router>
  );
}

export default App;

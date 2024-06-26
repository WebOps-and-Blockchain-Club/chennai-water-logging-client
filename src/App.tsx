import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { AddData } from "./Components/Pages/AddData";
import Dashboard from "./Components/Pages/Admin/Dashboard";
import PasswordForm from "./Components/Pages/Admin/PasswordForm";
import { DisplayData } from "./Components/Pages/DisplayData";
import Mapp from "./Components/Pages/Map";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={AddData} />
      {/* <Route exact path="/data/:id" component={DisplayData} />
      <Route exact path="/view" component={Mapp} />
      <Route exact path="/dashboard">
        <PasswordForm />
      </Route>
      <Route exact path="/submissions">
        <Dashboard />
      </Route> */}
      <Redirect to="/" />
      <Footer />
    </Router>
  );
}

export default App;

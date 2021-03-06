import React from "react";
import "./App.css";
import SignUpForm from "./pages/Authentication/SignUpForm.jsx";
import SignInForm from "./pages/Authentication/SignInForm.jsx";
import AllFoods from "./pages/AllFoods/AllFoods";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FoodForm from "./pages/AllFoods/FoodForm";
import FoodDetails from "./pages/AllFoods/FoodDetails";
import Blogs from "./pages/Blogs/Blogs";
import Retrospective from "./pages/Retrospective/Retrospective";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/retrospective" component={Retrospective} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/fooddetails" component={FoodDetails} />
          <Route path="/login" component={SignInForm} />
          <Route path="/register" component={SignUpForm} />
          <Route path="/allfoods" component={AllFoods} />
          <Route path="/addfood" component={FoodForm} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

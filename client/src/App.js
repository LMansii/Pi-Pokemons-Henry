import React from "react";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing}></Route>
        <Route exact path='/home' component={Home}></Route>
        <Route path='/home/detail/:id' component={Detail}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

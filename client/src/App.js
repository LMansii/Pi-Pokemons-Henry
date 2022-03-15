import React from "react";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Formulario from "./components/Form/Form";
import Loadingd from "./components/LoadingDetail/Loadingd";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing}></Route>
        <Route exact path='/home' component={Home}></Route>
        <Route path='/home/detail/:id' component={Detail}></Route>
        <Route path='/create' component={Formulario}></Route>
        <Route path='/loading' component={Loadingd}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
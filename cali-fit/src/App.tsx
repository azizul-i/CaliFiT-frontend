import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./App.css"
import ProfileInformation from "./components/ProfileInformation/ProfileInformation"
import Lobby from "./components/Lobby/Lobby"
import SignIn from "./components/SignIn/SignIn"
import Workouts from "./components/Workouts/Workouts"
import Dashboard from "./components/Dashboard/Dashboard"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/profile" component={ProfileInformation} />
          <Route path="/lobby" component={Lobby} />
          <Route path="/lobby:id" component={Lobby} />
          <Route path="/workouts" component={Workouts} />
          <Route path="/workouts:id" component={Workouts} />
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

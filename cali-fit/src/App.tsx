import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./App.css"
import ProfileInformation from "./components/ProfileInformation/ProfileInformation"
import SignIn from "./components/SignIn/SignIn"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/Profile" component={ProfileInformation} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

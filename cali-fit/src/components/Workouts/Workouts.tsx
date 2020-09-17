import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import { Button, Header, Icon, Card, Image, CardGroup } from "semantic-ui-react"
import { IWorkout } from "../../Interfaces/Interfaces"
import RedirectTabs from "../RedirectTabs/RedirectTabs"
import { AddWorkout, GetWorkoutsByUserId } from "../../api/Api"
import WorkoutCard from "../WorkoutCard/WorkoutCard"
import AddWorkoutModal from "../AddWorkoutModal/AddWorkoutModal"
import "./style.css"
import { worker } from "cluster"
import { workerData } from "worker_threads"

const Workouts = (props: any) => {
  const [loaded, setLoaded] = useState(false)
  const [reload, setReload] = useState(false)
  const [userWorkouts, setUserWorkouts] = useState<IWorkout[]>([])
  let history = useHistory()

  const loadWorkouts = async () => {
    if (localStorage.getItem("userID") === "0") {
      history.push("/")
    }

    const response = await GetWorkoutsByUserId(localStorage.getItem("userID"))

    if (!response) {
      return
    }
    if (response.status === 200) {
      setUserWorkouts(response.data)
    }

    setLoaded(true)
  }

  if (!loaded) {
    loadWorkouts()
  }

  const renderWorkouts = () => {
    const workouts = userWorkouts.map((workout, index) => (
      // <li key={index}>
      <WorkoutCard workout={workout} callback={setReload} />
      // </li>
    ))

    return (
      <CardGroup centered doubling stackable={true}>
        {" "}
        {workouts}{" "}
      </CardGroup>
    )
  }

  return (
    <div>
      {/* {responsiveVoice.speak("Hello!")} */}
      <RedirectTabs tab="Workouts" />
      <AddWorkoutModal userID={Number(localStorage.getItem("userID"))} />
      <br />
      {renderWorkouts()}
    </div>
  )
}

export default Workouts

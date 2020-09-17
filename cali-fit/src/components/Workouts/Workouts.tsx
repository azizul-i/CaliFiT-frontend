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
  const [userWorkouts, setUserWorkouts] = useState<IWorkout[]>([])
  let history = useHistory()

  const loadWorkouts = async () => {
    if (localStorage.getItem("userID") === "0") {
      history.push("/")
    }
    console.log(localStorage.getItem("userID"))
    const response = await GetWorkoutsByUserId(localStorage.getItem("userID"))
    console.log("Loaded User information from API")
    console.log(response)
    if (!response) {
      console.log("Failed to load user information")
      return
    }
    if (response.status === 200) {
      setUserWorkouts(response.data)
    }
    console.log("User Workouts ", userWorkouts)
    setLoaded(true)
  }

  if (!loaded) {
    loadWorkouts()
  }

  const renderWorkouts = () => {
    const workouts = userWorkouts.map((workout, index) => (
      // <li key={index}>
      <WorkoutCard
        workoutName={workout.workoutName}
        duration={workout.duration}
        requirements={workout.requirements}
        addToLobby={workout.addToLobby}
        difficultyLevel={workout.difficultyLevel}
        workoutID={workout.workoutID}
        userID={workout.userID}
        description={workout.description}
      />
      // </li>
    ))
    console.log("Workouts!: ", workouts)
    return (
      <CardGroup centered doubling stackable={true}>
        {" "}
        {workouts}{" "}
      </CardGroup>
    )
  }

  return (
    <div>
      <RedirectTabs tab="Workouts" />
      <AddWorkoutModal userID={Number(localStorage.getItem("userID"))} />
      <br />
      {renderWorkouts()}
    </div>
  )
}

export default Workouts

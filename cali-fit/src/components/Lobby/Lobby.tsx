import React, { useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import { Button, Header, Icon, Card, Image, CardGroup } from "semantic-ui-react"
import { IUserInformation } from "../../Interfaces/Interfaces"
import RedirectTabs from "../RedirectTabs/RedirectTabs"
import { GetPublicWorkouts } from "../../api/Api"
import { IWorkout } from "../../Interfaces/Interfaces"
import WorkoutCard from "../WorkoutCard/WorkoutCard"

const Lobby = (props: any) => {
  //   const [profileInformation, updateProfile] = useState<IUserInformation>({
  //     isLoggedIn: false,
  //   })
  const [loaded, setLoaded] = useState(false)
  const [userWorkouts, setUserWorkouts] = useState<IWorkout[]>([])
  let history = useHistory()

  const loadWorkouts = async () => {
    const response = await GetPublicWorkouts()
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
      <RedirectTabs tab="Lobby" />
      {renderWorkouts()}
    </div>
  )
}

export default Lobby

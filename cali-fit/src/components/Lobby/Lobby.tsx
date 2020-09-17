import React, { useState } from "react"
import "semantic-ui-css/semantic.min.css"
import { CardGroup } from "semantic-ui-react"
import RedirectTabs from "../RedirectTabs/RedirectTabs"
import { GetPublicWorkouts } from "../../api/Api"
import { IWorkout } from "../../Interfaces/Interfaces"
import WorkoutCard from "../WorkoutCard/WorkoutCard"
import "./style.css"

const Lobby = (props: any) => {
  //   const [profileInformation, updateProfile] = useState<IUserInformation>({
  //     isLoggedIn: false,
  //   })
  const [reload, setReload] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [userWorkouts, setUserWorkouts] = useState<IWorkout[]>([])

  const loadWorkouts = async () => {
    const response = await GetPublicWorkouts()
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
      <RedirectTabs tab="Lobby" />
      {renderWorkouts()}
      <br />
      <iframe
        title={"FacebookLike&Share"}
        src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fcalifit.azurewebsites.net%2Flobby&width=450&layout=standard&action=like&size=large&share=true&height=35&appId=307710587194171"
        width="450"
        height="35"
        // style="border:none;overflow:hidden"
        scrolling="no"
        frameBorder="0"
        allowTransparency={true}
        allow="encrypted-media"
      ></iframe>
    </div>
  )
}

export default Lobby

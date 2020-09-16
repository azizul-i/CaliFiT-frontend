import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import { Button, Header, Icon, Card, Image } from "semantic-ui-react"
import { IUserInformation } from "../../Interfaces/Interfaces"
import RedirectTabs from "../RedirectTabs/RedirectTabs"

const Workouts = (props: any) => {
  //   const [profileInformation, updateProfile] = useState<IUserInformation>({
  //     isLoggedIn: false,
  //   })

  return (
    <div>
      <RedirectTabs tab="Workouts" />
    </div>
  )
}

export default Workouts

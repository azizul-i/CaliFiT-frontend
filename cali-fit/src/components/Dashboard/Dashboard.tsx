import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import { Button, Header, Icon, Card, Image } from "semantic-ui-react"
import { IUserInformation } from "../../Interfaces/Interfaces"
import RedirectTabs from "../RedirectTabs/RedirectTabs"

const Dashboard = (props: any) => {
  //   const [profileInformation, updateProfile] = useState<IUserInformation>({
  //     isLoggedIn: false,
  //   })

  return (
    <div>
      <RedirectTabs tab="Dashboard" />
    </div>
  )
}

export default Dashboard

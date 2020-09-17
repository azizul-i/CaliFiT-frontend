import { profile } from "console"
import React, { useState } from "react"
import "semantic-ui-css/semantic.min.css"
import { Button, Header, Icon, Card, Image } from "semantic-ui-react"
import {
  IFacebookResponse,
  IUserInformation,
} from "../../Interfaces/Interfaces"
import RedirectTabs from "../RedirectTabs/RedirectTabs"
import { Redirect, useHistory } from "react-router-dom"
import { GetUserByFacebookId } from "../../api/Api"

const ProfileInformation = (props: any) => {
  const [profileInformation, updateProfile] = useState<IFacebookResponse>({
    userID: -1,
  })
  const [loaded, setLoaded] = useState<Boolean>(false)

  let history = useHistory()

  const loadUserInformation = async () => {
    if (localStorage.getItem("facebookID") === null) {
      history.push("/")
    }
    const response = await GetUserByFacebookId(
      localStorage.getItem("facebookID")
    )
    if (response.status === 404) {
      return
    }
    updateProfile(() => {
      return {
        avatarURL: response.data.avatarURL,
        completedTasks: response.data.completedTasks,
        email: response.data.email,
        facebookID: response.data.facebookID,
        introduction: response.data.introduction,
        name: response.data.name,
        userID: response.data.userID,
        workouts: response.data.workouts,
      }
    })
    const { userID } = response.data
    localStorage.setItem("userID", userID.toString())
    setLoaded(true)
  }

  if (!loaded) {
    loadUserInformation()
  }

  const handleLogout = () => {
    setLoaded(false)
    localStorage.clear()
    history.push("/")
  }

  const { name, email, avatarURL } = profileInformation

  return (
    <div>
      <RedirectTabs tab={"Profile"} />

      <Header as="h2" icon>
        <Icon name="user" />
        User Profile
      </Header>

      <Card centered={true}>
        <Card.Content>
          <Card.Header>
            <Image src={avatarURL} wrapped ui={false} size="mini" avatar />
            {name}
          </Card.Header>
          <Card.Meta>{email}</Card.Meta>
          <Card.Description>Loving Life!</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color="orange">
            <Icon name="settings" />
            Edit Profile
          </Button>
          <Button onClick={handleLogout} color="red">
            <Icon name="shutdown" />
            Log out
          </Button>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ProfileInformation

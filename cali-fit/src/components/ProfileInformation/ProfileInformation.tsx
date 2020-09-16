import { profile } from "console"
import React, { useState } from "react"
import "semantic-ui-css/semantic.min.css"
import { Button, Header, Icon, Card, Image } from "semantic-ui-react"
import { IUserInformation } from "../../Interfaces/Interfaces"
import RedirectTabs from "../RedirectTabs/RedirectTabs"

const ProfileInformation = (props: any) => {
  const [profileInformation, updateProfile] = useState<IUserInformation>({
    isLoggedIn: false,
  })

  try {
    if (props.location.state.profile && !profileInformation.isLoggedIn) {
      updateProfile((prevState) => {
        console.log(prevState)
        const {
          userID,
          name,
          email,
          picture,
          isLoggedIn,
        } = props.location.state.profile
        return {
          isLoggedIn: isLoggedIn,
          userID: userID,
          name: name,
          email: email,
          picture: picture,
        }
      })
    }
  } catch (err) {
    if (!profileInformation.isLoggedIn) {
      updateProfile((prevState) => {
        console.log(prevState)
        const userID = localStorage.getItem("userID")
        return {
          isLoggedIn: true,
          userID: Number(userID),
        }
      })
    }
  }

  const { name, email, picture } = profileInformation

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
            <Image src={picture} wrapped ui={false} size="mini" avatar />
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
          <Button color="red">
            <Icon name="shutdown" />
            Log out
          </Button>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ProfileInformation

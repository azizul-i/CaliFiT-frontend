import React, { useState, useEffect } from "react"
import FacebookLogin from "react-facebook-login"
import "semantic-ui-css/semantic.min.css"
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react"
import { IUserInformation } from "../../Interfaces/Interfaces"
import { useHistory } from "react-router"
import { AddUser } from "../../api/Api"

const SignIn = () => {
  const [userInformation, setUserInformation] = useState<IUserInformation>({
    isLoggedIn: false,
    userID: -1,
    name: "John Doe",
    email: "John@email.com",
  })

  let history = useHistory()

  const responseFacebook = (response: any) => {
    console.log("Facebook Response:")
    console.log(response)
    if (response.status === "unknown") {
      return null
    }
    setUserInformation((prevState) => {
      return {
        isLoggedIn: true,
        userID: response.id,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
      }
    })

    try {
      localStorage.setItem("name", response.name)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("email", response.email)
      localStorage.setItem("facebookID", String(response.id))
      AddUser(
        response.name,
        response.email,
        "",
        String(response.id),
        response.picture.data.url
      )
      history.push("/profile")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="orange" textAlign="center">
          <Icon name="group" /> CaliFiT
        </Header>
        <FacebookLogin
          appId="307710587194171"
          autoLoad={false}
          fields="name,email,picture"
          size="small"
          icon="fa-facebook"
          callback={responseFacebook}
        />
      </Grid.Column>
    </Grid>
  )
}

export default SignIn

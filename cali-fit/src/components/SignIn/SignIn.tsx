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

interface IUserInformation {
  isLoggedIn: boolean
  userID?: number
  name?: string
  email?: string
  picture?: string
}

const componentClicked = () => console.log("Clicked!")

const SignIn = () => {
  // const [isLoggedIn, setLoggedIn] = useState<Boolean>(false)
  const [userInformation, setUserInformation] = useState<IUserInformation>({
    isLoggedIn: false,
    userID: -1,
    name: "John Doe",
    email: "John@email.com",
  })

  const responseFacebook = (response: any) => {
    console.log(response)
    setUserInformation((prevState) => {
      return {
        isLoggedIn: true,
        userID: response.id,
        name: response.name,
        email: response.email,
      }
    })
  }

  useEffect(() => {
    console.log(userInformation.isLoggedIn)
  }, [userInformation])

  const logoutUser = () => {
    setUserInformation(() => {
      return { isLoggedIn: false }
    })
  }

  if (userInformation.isLoggedIn) {
    return (
      <div>
        <p>Welcome {userInformation.name}</p>
        <Button onClick={logoutUser} color="orange">
          {" "}
          Log out
        </Button>
      </div>
    )
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="orange" textAlign="center">
          <Icon name="group" /> CaliFiT
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="orange" fluid size="large">
              Sign In
            </Button>
          </Segment>
        </Form>
        {/* <Message> */}
        {/* </Message> */}
        <Message>
          <a href="https://google.com">Register</a>
        </Message>
        <FacebookLogin
          appId="307710587194171"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
        />
      </Grid.Column>
    </Grid>
  )
}

export default SignIn

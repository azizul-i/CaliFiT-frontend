import React, { Component } from "react"
import { Menu } from "semantic-ui-react"
import { Redirect } from "react-router-dom"

interface Props {
  tab: string
}

interface State {
  activeItem: string
}

export default class RedirectTabs extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { activeItem: this.props.tab }
  }

  handleItemClick = (e: any) => {
    this.setState({ activeItem: e.target.innerText })
  }

  componentDidMount() {
    this.setState({ activeItem: this.props.tab })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu color="orange" pointing secondary>
        <Menu.Item
          color="orange"
          name="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          color="orange"
          name="Workouts"
          active={activeItem === "Workouts"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          color="orange"
          name="Lobby"
          active={activeItem === "Lobby"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          color="orange"
          name="Profile"
          active={activeItem === "Profile"}
          onClick={this.handleItemClick}
        />
        <Redirect to={{ pathname: "/" + activeItem.toLowerCase() }} />
      </Menu>
    )
  }
}

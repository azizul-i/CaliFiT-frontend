import React, { useState } from "react"
import { IExcercise } from "../../Interfaces/Interfaces"
import { Item, Button, Label, Icon } from "semantic-ui-react"
import { DeleteExcercise } from "../../api/Api"
import { useHistory } from "react-router"

const ExcerciseItem = (props: IExcercise) => {
  const {
    excerciseID,
    excerciseName,
    sets,
    reps,
    restPeriod,
    category,
    description,
  } = props
  let history = useHistory()

  const [deleted, setDeleted] = useState(false)

  const handleDelete = async () => {
    await DeleteExcercise(Number(excerciseID))
    setDeleted(true)
  }

  if (!deleted) {
    return (
      <Item>
        <Item.Content>
          <Item.Header>
            {excerciseName}{" "}
            <Button compact icon color="red" size="mini" onClick={handleDelete}>
              <Icon name="delete" />
            </Button>
          </Item.Header>
          <Item.Meta>
            <Label color="orange">
              Sets
              <Label.Detail>{sets}</Label.Detail>
            </Label>
            <Label color="olive">
              Reps
              <Label.Detail>{reps}</Label.Detail>
            </Label>
            <Label color="green">
              Rest (secs)
              <Label.Detail>{restPeriod}</Label.Detail>
            </Label>
          </Item.Meta>
          <Item.Description>{description}</Item.Description>
          {/* <Item.Extra>Category: {category}</Item.Extra> */}
          <Item.Meta></Item.Meta>
        </Item.Content>
      </Item>
    )
  }
  return null
}

export default ExcerciseItem

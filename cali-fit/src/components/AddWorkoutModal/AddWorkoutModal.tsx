import React, { useState } from "react"
import { Button, Header, Image, Modal, Form } from "semantic-ui-react"
import { IWorkout } from "../../Interfaces/Interfaces"
import { AddWorkout } from "../../api/Api"
import { useHistory } from "react-router"

const AddWorkoutModal = (props: { userID: number }) => {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [workoutFields, setWorkoutFields] = useState<IWorkout>({
    userID: props.userID,
  })

  let history = useHistory()

  const options = [
    { key: "1", text: "Level 1", value: 1 },
    { key: "2", text: "Level 2", value: 2 },
    { key: "3", text: "Level 3", value: 3 },
    { key: "4", text: "Level 4", value: 4 },
    { key: "5", text: "Level 5", value: 5 },
    { key: "6", text: "Level 6", value: 6 },
    { key: "7", text: "Level 7", value: 7 },
    { key: "8", text: "Level 8", value: 8 },
    { key: "9", text: "Level 9", value: 9 },
    { key: "10", text: "Level 10", value: 10 },
  ]

  const handleRequirementsChange = (e: any) => {
    const value = e.target.value
    setWorkoutFields((prevState) => ({
      ...prevState,
      requirements: value,
    }))
  }

  const handleNameChange = (e: any) => {
    const value = e.target.value
    setWorkoutFields((prevState) => ({
      ...prevState,
      workoutName: value,
    }))
  }

  const handleDescChange = (e: any) => {
    const value = e.target.value
    setWorkoutFields((prevState) => ({
      ...prevState,
      description: value,
    }))
  }

  const handleLobbyChange = (e: any, data: any) => {
    const value = Boolean(data.checked)
    setWorkoutFields((prevState) => ({
      ...prevState,
      addToLobby: value,
    }))
  }

  const handleDifficultyChange = (e: any, data: any) => {
    const value = data.value
    setWorkoutFields((prevState) => ({
      ...prevState,
      difficultyLevel: value,
    }))
    console.log("Difficulty Level: ", value)
  }

  const handleSubmit = async () => {
    await AddWorkout(workoutFields)
    window.location.reload()
    setOpen(false)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button inverted color="orange" attached="top">
          + Add New Workout
        </Button>
      }
    >
      <Modal.Header>Add Workout!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Workout Name"
                placeholder={"Enter a workout name!"}
                value={workoutFields ? workoutFields.workoutName : ""}
                onChange={handleNameChange}
              />
              <Form.Select
                fluid
                label="Difficulty"
                options={options}
                placeholder="Select Difficulty (1: low, 10: high)"
                onChange={handleDifficultyChange}
                value={workoutFields ? workoutFields.difficultyLevel : 1}
              />
            </Form.Group>
            <Form.TextArea
              label="Requirements"
              placeholder="What equipment and environment is required for the workout?"
              onChange={handleRequirementsChange}
              value={workoutFields ? workoutFields.requirements : ""}
            />
            <Form.TextArea
              label="Description"
              placeholder="Write a brief summary about the workout!"
              onChange={handleDescChange}
              value={workoutFields ? workoutFields.description : ""}
            />
            <Form.Checkbox
              checked={workoutFields.addToLobby}
              onChange={handleLobbyChange}
              label="Add to the Lobby (Public)?"
            />
            <Form.Button
              labelPosition="right"
              icon="checkmark"
              onClick={handleSubmit}
              color="orange"
              content="Confirm Edit"
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cancel"
          color="red"
          onClick={() => {
            setWorkoutFields(props)
            setOpen(false)
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddWorkoutModal

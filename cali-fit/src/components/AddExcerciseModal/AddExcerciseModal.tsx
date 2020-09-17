import React, { useState } from "react"
import { Button, Header, Image, Modal, Form } from "semantic-ui-react"
import { IExcercise, IWorkout } from "../../Interfaces/Interfaces"
import { AddExcercise, AddWorkout } from "../../api/Api"
import { useHistory } from "react-router"

const AddExcerciseModal = (props: { workoutID: number }) => {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [excerciseFields, setFields] = useState<IExcercise>({
    workoutID: props.workoutID,
  })

  let history = useHistory()

  const handleSetChange = (e: any) => {
    const value = Number(e.target.value)
    setFields((prevState) => ({
      ...prevState,
      sets: value,
    }))
  }

  const handleNameChange = (e: any) => {
    const value = e.target.value
    setFields((prevState) => ({
      ...prevState,
      excerciseName: value,
    }))
  }

  const handleDescChange = (e: any) => {
    const value = e.target.value
    setFields((prevState) => ({
      ...prevState,
      description: value,
    }))
  }

  const handleRepChange = (e: any, data: any) => {
    const value = Number(data.value)
    setFields((prevState) => ({
      ...prevState,
      reps: value,
    }))
    console.log("Reps: ", value)
  }

  const handleRestChange = (e: any, data: any) => {
    const value = Number(data.value)
    setFields((prevState) => ({
      ...prevState,
      restPeriod: value,
    }))
    console.log("Rest: ", value)
  }

  const handleSubmit = async () => {
    await AddExcercise(excerciseFields)
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
          + Add New Excercise
        </Button>
      }
    >
      <Modal.Header>Add Excercise</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Excercise Name"
                placeholder={"Enter a excercise!"}
                value={excerciseFields ? excerciseFields.excerciseName : ""}
                onChange={handleNameChange}
              />
              <Form.Input
                type={"number"}
                fluid
                label="Number of Sets"
                placeholder={0}
                value={excerciseFields ? excerciseFields.sets : 0}
                onChange={handleSetChange}
              />
              <Form.Input
                type={"number"}
                fluid
                label="Number of Reps"
                placeholder={0}
                value={excerciseFields ? excerciseFields.reps : 0}
                onChange={handleRepChange}
              />
              <Form.Input
                type={"number"}
                fluid
                label="Rest period (secs)"
                placeholder={0}
                value={excerciseFields ? excerciseFields.restPeriod : 0}
                onChange={handleRestChange}
              />
            </Form.Group>
            <Form.TextArea
              label="Description"
              placeholder="What does the excercise impact?"
              onChange={handleDescChange}
              value={excerciseFields ? excerciseFields.description : ""}
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
            setFields(props)
            setOpen(false)
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddExcerciseModal

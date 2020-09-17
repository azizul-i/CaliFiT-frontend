import React, { useState } from "react"
import { Button, Header, Image, Modal, Item } from "semantic-ui-react"
import { IExcercise, IWorkout } from "../../Interfaces/Interfaces"
import { AddWorkout } from "../../api/Api"
import { useHistory } from "react-router"
import { GetExcercisesByWorkoutId } from "../../api/Api"
import ExcerciseItem from "../ExcerciseItem/ExcerciseItem"
import AddExcercisesModal from "../AddExcerciseModal/AddExcerciseModal"

const WorkoutExcercisesModal = (props: IWorkout) => {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [workoutFields, setWorkoutFields] = useState<IWorkout>({
    workoutID: props.workoutID,
    userID: props.userID,
    workoutName: props.workoutName,
    duration: props.duration,
    requirements: props.requirements,
    addToLobby: props.addToLobby,
    difficultyLevel: props.difficultyLevel,
    description: props.description,
  })

  const [excercises, setExcercises] = useState<IExcercise[]>([])

  let history = useHistory()

  const loadExcercises = async () => {
    if (
      localStorage.getItem("userID") === "0" &&
      !window.location.href.includes("lobby")
    ) {
      history.push("/")
    }
    const response = await GetExcercisesByWorkoutId(workoutFields.workoutID)
    console.log("Loaded User information from API")
    console.log(response)
    if (!response) {
      console.log("Failed to load user information")
      return
    }
    if (response.status === 200) {
      setExcercises(response.data)
    }
    console.log("User Excercises ", excercises)
    setLoaded(true)
  }

  if (!loaded) {
    loadExcercises()
  }

  const renderExcercises = () => {
    const excerciseList = excercises.map((excercise, index) => (
      <ExcerciseItem
        excerciseID={excercise.excerciseID}
        workoutID={excercise.workoutID}
        excerciseName={excercise.excerciseName}
        sets={excercise.sets}
        reps={excercise.reps}
        restPeriod={excercise.restPeriod}
        category={excercise.category}
        description={excercise.description}
      />
    ))
    console.log("Excercises!: ", excercises)
    return <Item.Group>{excerciseList}</Item.Group>
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="orange">Explore</Button>}
    >
      <Modal.Header>{workoutFields.workoutName}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {renderExcercises()}
          {!window.location.href.includes("lobby") ? (
            <AddExcercisesModal workoutID={Number(workoutFields.workoutID)} />
          ) : null}
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

export default WorkoutExcercisesModal

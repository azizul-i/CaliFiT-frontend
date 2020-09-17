import React from "react"
import "semantic-ui-css/semantic.min.css"
import { Card, Label, Progress, Button } from "semantic-ui-react"
import { IWorkout } from "../../Interfaces/Interfaces"
import EditWorkoutModal from "../EditWorkoutModal/EditWorkoutModal"
import WorkoutExcercisesModal from "../WorkoutExcercisesModal/WorkoutExcercisesModal"
import { DeleteWorkout } from "../../api/Api"
import { useHistory } from "react-router"

const WorkoutCard = (props: IWorkout) => {
  const {
    workoutID,
    workoutName,
    duration,
    requirements,
    addToLobby,
    difficultyLevel,
    userID,
    description,
  } = props

  let history = useHistory()

  const handleDelete = async () => {
    await DeleteWorkout(Number(workoutID))
    history.go(0)
  }

  return (
    <Card>
      <Card.Content header={workoutName} />
      <Card.Content description={description} />
      {duration ? (
        <Card.Content extra>Duration (mins): {duration / 60}</Card.Content>
      ) : null}
      {requirements ? (
        <Card.Content extra>Requirements: {requirements}</Card.Content>
      ) : null}
      <Card.Content extra>
        {addToLobby ? (
          <Label color="orange" tag>
            Public
          </Label>
        ) : (
          <Label color="red" tag>
            Private
          </Label>
        )}
      </Card.Content>
      <Card.Content extra>
        Difficulty
        {difficultyLevel ? (
          <Progress
            color="yellow"
            value={difficultyLevel}
            total="10"
            progress="ratio"
          />
        ) : null}
      </Card.Content>
      <Card.Content extra>
        {!window.location.href.includes("lobby") ? (
          <Button onClick={handleDelete} color="red">
            {" "}
            Delete{" "}
          </Button>
        ) : null}
        {!window.location.href.includes("lobby") ? (
          <EditWorkoutModal
            workoutName={workoutName}
            duration={duration}
            requirements={requirements}
            addToLobby={addToLobby}
            difficultyLevel={difficultyLevel}
            workoutID={workoutID}
            userID={userID}
            description={description}
          />
        ) : null}
        <WorkoutExcercisesModal
          workoutName={workoutName}
          duration={duration}
          requirements={requirements}
          addToLobby={addToLobby}
          difficultyLevel={difficultyLevel}
          workoutID={workoutID}
          userID={userID}
          description={description}
        />
      </Card.Content>
    </Card>
  )
}

export default WorkoutCard

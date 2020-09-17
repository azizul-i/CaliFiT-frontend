import axios, { AxiosResponse } from "axios"
import {
  IFacebookResponse,
  IWorkout,
  IExcercise,
} from "../Interfaces/Interfaces"

const API_BASE_URL = "https://califit-api.azurewebsites.net/api/"
//   process.env.NODE_ENV === "development"
//     ? "https://localhost:44318/api/"
//     : "https://califit-api.azurewebsites.net/api/"

export const AddUser = async (
  name: string,
  email: string,
  password: string = "",
  facebookId: string = "",
  avatarURL: string = ""
) => {
  const response = await axios
    .post(API_BASE_URL + "AddUser", {
      // Adding method type
      name: name,
      email: email,
      password: password,
      facebookId: facebookId,
      avatarURL: avatarURL,
    })
    .then((res) => console.log(res))
    .then((err) => console.log(err))
  console.log(response)

  return response
}

export const GetUserByFacebookId = async (facebookId: string | null = "") => {
  const response = await axios.get<string, AxiosResponse<IFacebookResponse>>(
    API_BASE_URL + "GetUserByFacebookId/" + facebookId
  )
  console.log(response)
  return response
}

export const GetWorkoutsByUserId = async (userID: string | null = "-1") => {
  if (userID) {
    const response = await axios.post<string, AxiosResponse<IWorkout[]>>(
      API_BASE_URL + "GetWorkoutByUserId",
      {
        userID: Number(userID),
      }
    )

    console.log("UserID")
    return response
  }
  return null
}

export const EditWorkout = async (workout: IWorkout) => {
  if (workout) {
    const response = await axios.put<string, AxiosResponse<IWorkout>>(
      API_BASE_URL + "UpdateWorkout/" + workout.workoutID,
      {
        workoutID: workout.workoutID,
        workoutName: workout.workoutName,
        duration: workout.duration,
        requirements: workout.requirements,
        addToLobby: workout.addToLobby,
        difficultyLevel: workout.difficultyLevel,
        userID: workout.userID,
        description: workout.description,
      }
    )
    return response
  }
  return null
}

export const AddWorkout = async (workout: IWorkout) => {
  if (workout) {
    const response = await axios.post<string, AxiosResponse<IWorkout>>(
      API_BASE_URL + "AddWorkout/",
      {
        workoutID: workout.workoutID,
        workoutName: workout.workoutName,
        duration: workout.duration,
        requirements: workout.requirements,
        addToLobby: workout.addToLobby,
        difficultyLevel: workout.difficultyLevel,
        userID: workout.userID,
        description: workout.description,
      }
    )
    return response
  }
  return null
}

export const DeleteWorkout = async (workoutId: number) => {
  if (workoutId) {
    const response = await axios.delete<string, AxiosResponse<IWorkout>>(
      API_BASE_URL + "DeleteWorkout/" + workoutId
    )
    return response
  }
  return null
}

export const DeleteExcercise = async (excerciseID: number) => {
  console.log("Excercise ID: ", excerciseID)
  if (excerciseID) {
    const response = await axios.delete<string, AxiosResponse<IExcercise>>(
      API_BASE_URL + "DeleteExcercise/" + excerciseID
    )
    return response
  }
  return null
}

export const GetExcercisesByWorkoutId = async (
  workoutID: Number | null = -1
) => {
  if (workoutID) {
    const response = await axios.post<string, AxiosResponse<IExcercise[]>>(
      API_BASE_URL + "GetExcercisesByWorkoutId",
      {
        workoutID: Number(workoutID),
      }
    )
    return response
  }
  return null
}

export const AddExcercise = async (excercise: IExcercise) => {
  if (excercise) {
    const response = await axios.post<string, AxiosResponse<IExcercise>>(
      API_BASE_URL + "AddExcercise/",
      {
        workoutID: excercise.workoutID,
        excerciseName: excercise.excerciseName,
        sets: excercise.sets,
        reps: excercise.reps,
        restPeriod: excercise.restPeriod,
        description: excercise.description,
      }
    )
    return response
  }
  return null
}

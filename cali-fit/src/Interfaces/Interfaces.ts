export interface IUserInformation {
  isLoggedIn: boolean
  userID?: number | null
  name?: string
  email?: string
  picture?: string
}

export interface IFacebookResponse {
  avatarURL?: string | null
  completedTasks?: Object | null
  email?: string | null
  facebookID?: string | null
  introduction?: string | null
  name?: string | null
  userID: number
  workouts?: Object | null
}

export interface IWorkout {
  workoutID?: number | null
  workoutName?: string | null
  duration?: number | null
  requirements?: string
  addToLobby?: boolean
  difficultyLevel?: number
  userID: number
  description?: string
  excercises?: Object | null
}

export interface IExcercise {
  excerciseID?: number
  workoutID: number
  excerciseName?: string
  sets?: number
  reps?: number
  restPeriod?: number
  category?: string
  description?: string
}

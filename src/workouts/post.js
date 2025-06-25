import { Workout } from '../utils/generateWorkout2.js';
import { courtZones } from '../utils/courtZones.js';

export const post = {
  workouts: [
    { title: "Drop Steps" },
    { title: "Up and Under Shots", permittedZones: [1, 2, 3] },
    { title: "Hook Shots", permittedZones: [1, 2, 3] },
    { title: "Power Move with Contact" },
    { title: "Spin Move in the Post" },
    { title: "Jump Hooks", permittedZones: [1, 2, 3] },
    { title: "Face Up and Drives", permittedZones: [4, 5, 6, 7, 8] },
    { title: "Seal and Back Downs", permittedZones: [1, 2, 3] },
    { title: "Post Entry Passing and Catch" },
    { title: "Post Fadeaway Shot" },
    { title: "Post Pivot and Spin" },
    { title: "Turnaround Jumper" },
    { title: "Flash to the Basket and Finish" },
    { title: "Double Team Escape Moves" },
    { title: "Hook Shot off the Glass", permittedZones: [1, 2, 3] },
    { title: "Post Jab Step and Drives" },
    { title: "Baseline Power Move", permittedZones: [1, 3, 4, 8] },
    { title: "Post Shot Fake and Drive", permittedZones: [4, 5, 6, 7, 8] },
    { title: "Post Drop Step to Reverse Layup" },
  ],
}

export class Post extends Workout {
  constructor() {
    super(); // Call the parent class's constructor
  }

  workouts = post.workouts
  workout = this.workouts[this.getRandomInteger(0, this.workouts.length - 1)]

  numberOfSpots = this.workout.numberOfSpots || 2
  permittedZones = this.workout.permittedZones || courtZones.filter((zone) => zone.id < 8 ).map((zone) => zone.id )
  actions = this.workout.actions || ["Make", "Attempt"]
  minMakeAmount = this.workout.minMakeAmount || 5
  maxMakeAmount = this.workout.maxMakeAmount || 10
  minAttemptAmount = this.workout.minAttemptAmount || 10
  maxAttemptAmount = this.workout.maxAttemptAmount || 15
  minInARow = this.workout.minInARow || 3
  maxInARow = this.workout.maxInARow || 6
  maxPerTimedPeriod = this.workout.maxPerTimedPeriod || 10
  addedDifficulties = this.workout.addedDifficulties || [
    "Over Defender",
    "With Contact",
    "Using Heavy Ball",
    "In A Row",
    "around defender",
  ]
  isTimeable = false
  frequency = this.workout.frequency || 8
  isStandalone = this.workout.isStandalone || false
  
  // formatWorkout () {

  //   return {
  //     rules,
  //     permittedZones: this.permittedZones(),
  //     workout: this.workout,
  //     permittedSpots: this.permittedSpots(),
  //     numberOfSpots: this.numberOfSpots()
  //   }
  // }
}
import { workouts } from '../workouts/workoutData.js';
import { courtZones } from '../utils/courtZones.js';

export class Workout {
  constructor() {
    this.categories = Object.keys(workouts)
    this.workoutCategoryName = this.categories[this.getRandomInteger(0, this.categories.length - 1)]
    this.workoutCategory = workouts[this.workoutCategoryName]
    this.workout = this.fetchWorkout()
    this.zones = courtZones.map((zone) => zone.id )
    this.minMakeAmount = 5
    this.maxMakeAmount = 10
    this.minAttemptAmount = 10
    this.maxAttemptAmount = 15
    this.minInARow = 3
    this.maxInARow = 6
    this.isStandalone = false
    this.maxPerTimedPeriod = 10
    this.numberOfSpots = 1
    this.addedDifficulties = [
      "Over Defender",
      "With Contact",
      "In A Row",
      "no backboard",
    ]
    this.frequency = 8 //seconds per action
    this.isTimeable = true
    this.difficulty = this.addedDifficulties[this.getRandomInteger(-1, this.addedDifficulties.length - 1)] || ''
    this.permittedSpots = null
    this.actions = ["Make", "Attempt"]
    this.action = this.difficulty === 'In A Row' ? 'Make' : this.actions[this.getRandomInteger(0, this.actions.length - 1)]
    this.variations = [this.workout.title]
    this.variation = this.variations[this.getRandomInteger(0, this.variations.length - 1)]
  }

  getRandomInteger (min, max)  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getAmount (isInARow, isTimed) {
    let minAmount, maxAmount = null

    if (isInARow) {
      minAmount = this.minInARow
      maxAmount = this.maxInARow
    } else if (isTimed) {
      minAmount = this.minMakeAmount
      maxAmount = this.maxPerTimedPeriod
    } else {
      minAmount = this.minAttemptAmount
      maxAmount = this.maxAttemptAmount
    }

    return this.getRandomInteger(minAmount, maxAmount)
  }

  getWorkoutCategory () {
    const categories = Object.keys(workouts)
    const category = categories[this.getRandomInteger(0, categories.length - 1)]
    return workouts[category]
  }

  fetchWorkout () {
    console.log(this.workoutCategory)
    const randomWorkoutIndex = this.getRandomInteger(0, this.workoutCategory.workouts.length - 1)
    return this.workoutCategory.workouts[randomWorkoutIndex]
  }

  getWorkout () {
    let rules = null
    const isTimed = this.isTimeable && Boolean(this.getRandomInteger(0, 1))
    const isInARow = this.difficulty === 'In A Row'
    let amount = this.getAmount(isInARow, isTimed)
    const isStandalone = false
  
    if (isStandalone) {
      rules = `${this.variation}`
    } else if (isTimed) {
      const x = amount * this.frequency
      let seconds = Math.ceil(x + x / 5)
      rules = `Make ${amount} ${this.variation} in ${ seconds } seconds`
    } else {
      rules = `${this.action} ${amount} ${this.variation}${this.difficulty ? ',': ''} ${ this.difficulty }`
    }

    return {
      rules,
      permittedZones: this.zones,
      workout: this.workout,
      permittedSpots: this.permittedSpots,
      numberOfSpots: this.numberOfSpots
    }
  }
}
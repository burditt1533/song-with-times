import { workouts, universalDefaults } from '../workouts/workoutData.js';
let workout = null
let workoutCategory = {}

const thing = {
  getRandomInteger: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  defaults: () => {
    return workoutCategory.defaults || universalDefaults
  },
  isTimeable: () => {
    return workout.isTimeable ?? defaults().isTimeable ?? universalDefaults.isTimeable
  },
  difficulties: () => {
    return workout.addedDifficulties || defaults().addedDifficulties || universalDefaults.addedDifficulties
  },
  difficulty: () => {
    return difficulties()[getRandomInteger(-1, difficulties.length - 1)] || ''
  },
  getAmount: (isInARow, isTimed) => {
    let minAmount = 1
    let maxAmount = 10

    if (isInARow) {
      minAmount = workout.minInARow || defaults().minInARow || universalDefaults.minInARow
      maxAmount = workout.maxInARow || defaults().maxInARow || universalDefaults.maxInARow
    } else if (isTimed) {
      minAmount = workout.minMakeAmount || defaults().minMakeAmount || universalDefaults.minMakeAmount
      maxAmount = workout.maxPerTimedPeriod || defaults().maxPerTimedPeriod || universalDefaults.maxPerTimedPeriod
    } else {
      minAmount = workout.minAttemptAmount || defaults().minAttemptAmount || universalDefaults.minAttemptAmount
      maxAmount = workout.maxAttemptAmount || defaults().maxAttemptAmount || universalDefaults.maxAttemptAmount
    }

    return getRandomInteger(minAmount, maxAmount)
  },
  variation: () => {
    const variations = workout.variations || [workout.title]
    return variations[getRandomInteger(0, variations.length - 1)]
  },
  frequency: () => {
    return workout.frequency || defaults().frequency || universalDefaults.frequency
  },
  action: () => {
    const isHaveToMake = difficulty() === 'In A Row'
    const actions = workout.actions || defaults().actions || universalDefaults.actions
    return isHaveToMake ? 'Make' : actions[getRandomInteger(0, actions.length - 1)]
  },
  permittedZones: () => {
    return workout.zones || defaults().zones || universalDefaults.zones
  },
  permittedSpots: () => {
    return workout.permittedSpots || defaults().permittedSpots
  },
  numberOfSpots: () => {
    return workout.numberOfSpots ?? defaults().numberOfSpots ?? universalDefaults.numberOfSpots
  }
}

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const defaults = () => {
  return workoutCategory.defaults || universalDefaults
}

const isTimeable = () => {
  return workout.isTimeable ?? defaults().isTimeable ?? universalDefaults.isTimeable
}

const difficulties = () => {
  return workout.addedDifficulties || defaults().addedDifficulties || universalDefaults.addedDifficulties
}

const difficulty = () => {
  return difficulties()[getRandomInteger(-1, difficulties.length - 1)] || ''
}

const getAmount = (isInARow, isTimed) => {
  let minAmount = 1
  let maxAmount = 10

  if (isInARow) {
    minAmount = workout.minInARow || defaults().minInARow || universalDefaults.minInARow
    maxAmount = workout.maxInARow || defaults().maxInARow || universalDefaults.maxInARow
  } else if (isTimed) {
    minAmount = workout.minMakeAmount || defaults().minMakeAmount || universalDefaults.minMakeAmount
    maxAmount = workout.maxPerTimedPeriod || defaults().maxPerTimedPeriod || universalDefaults.maxPerTimedPeriod
  } else {
    minAmount = workout.minAttemptAmount || defaults().minAttemptAmount || universalDefaults.minAttemptAmount
    maxAmount = workout.maxAttemptAmount || defaults().maxAttemptAmount || universalDefaults.maxAttemptAmount
  }

  return getRandomInteger(minAmount, maxAmount)
}

const variation = () => {
  const variations = workout.variations || [workout.title]
  return variations[getRandomInteger(0, variations.length - 1)]
}

const frequency = () => {
  return workout.frequency || defaults().frequency || universalDefaults.frequency
}

const action = () => {
  const isHaveToMake = difficulty() === 'In A Row'
  const actions = workout.actions || defaults().actions || universalDefaults.actions
  return isHaveToMake ? 'Make' : actions[getRandomInteger(0, actions.length - 1)]
}

const permittedZones = () => {
  return workout.zones || defaults().zones || universalDefaults.zones
}

const permittedSpots = () => {
  return workout.permittedSpots || defaults().permittedSpots
}

const numberOfSpots = () => {
  return workout.numberOfSpots ?? defaults().numberOfSpots ?? universalDefaults.numberOfSpots
}

const getWorkoutCategory = () => {
  const categories = Object.keys(workouts)
  const category = categories[getRandomInteger(0, categories.length - 1)]
  return workouts.shooting
  // return workouts[category]
}

const fetchWorkout = () => {
  workoutCategory = getWorkoutCategory()
  const randomWorkoutIndex = getRandomInteger(0, workoutCategory.workouts.length - 1)
  return workoutCategory.workouts[randomWorkoutIndex]
}

export const getWorkout = () => {
  workout = fetchWorkout()

  thing.workout = fetchWorkout()

  // return shootingCompiler(getWorkoutCategory())
  return workoutCategory.compiler(thing)

  // let rules = null
  // const isTimed = isTimeable() && Boolean(getRandomInteger(0, 1))
  // const isInARow = difficulty.value === 'In A Row'
  // let amount = getAmount(isInARow, isTimed)
  // const isStandalone = false

  // if (isStandalone) {
  //   rules = `${variation()}`
  // } else if (isTimed) {
  //   const x = amount * frequency()
  //   let seconds = Math.ceil(x + x / 5)
  //   rules = `Make ${amount} ${variation()} in ${ seconds } seconds`
  // } else {
  //   rules = `${action()} ${amount} ${variation()}${difficulty() ? ',': ''} ${ difficulty() }`
  // }

  // return {
  //   rules,
  //   permittedZones: permittedZones(),
  //   workout,
  //   permittedSpots: permittedSpots(),
  //   numberOfSpots: numberOfSpots()
  // }
}
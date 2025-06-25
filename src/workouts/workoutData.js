import { courtZones } from '../utils/courtZones.js';
import { dribbling } from './dribbling.js';
import { combos } from './combos.js';
import { conditioning } from './conditioning.js';
import { defense } from './defense.js';
import { freethrows } from './freethrows.js';
import { layups } from './layups.js';
import { post } from './post.js';
import { shooting } from './shooting.js';
import { warmups } from './warmups.js';

const universalDefaults = {
  zones: courtZones.map((zone) => zone.id ),
  actions: ["Make", "Attempt"],
  minMakeAmount: 5,
  maxMakeAmount: 10,
  minAttemptAmount: 10,
  maxAttemptAmount: 15,
  minInARow: 3,
  maxInARow: 6,
  isStandalone: false,
  maxPerTimedPeriod: 10,
  numberOfSpots: 1,
  addedDifficulties: [
    "Over Defender",
    "With Contact",
    "In A Row",
    "no backboard",
  ],
  frequency: 8, //seconds per action
  isTimeable: true,
};

const allWorkouts = {
  warmups,
  shooting,
  freethrows,
  layups,
  // dribbling,
  conditioning,
  defense,
  combos,
  post,
};

export { allWorkouts, universalDefaults };

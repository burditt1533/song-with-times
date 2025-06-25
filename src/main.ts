import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

Array.prototype.randomItem = function() {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.selectWeightedRandom = function(weights: number[]) {
  if (this.length !== weights.length) {
    throw new Error("Items and weights arrays must have the same length.");
  }

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const randomNumber = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (let i = 0; i < this.length; i++) {
    cumulativeWeight += weights[i];
    if (randomNumber < cumulativeWeight) {
      return this[i];
    }
  }

  // Fallback in case of floating-point precision issues, though rare with this method
  return this[this.length - 1];
};

String.prototype.pluralize = function(count: number, pluralForm: string) {
  pluralForm = pluralForm ?? `${this}s`
  // const pluralizeWord = (count:number, word:any, pluralForm = `${word}s`) => {
  //   return count === 1 ? word : pluralForm;
  // };
  return count === 1 ? this : pluralForm
  // return pluralizeWord(amount, this, theForm)
};

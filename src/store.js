import { writable } from 'svelte/store'

export const store = writable({
  current: 'Boston, MA'
})

export const dispatch = (action) =>
  new Promise((resolve) => {
    store.update(state => {
      resolve()
      if (action.type === 'SET_CURRENT') {
        console.log('setting current city to', action.payload)
        return {...state, current: action.payload}
      }
      return state
    })
  })

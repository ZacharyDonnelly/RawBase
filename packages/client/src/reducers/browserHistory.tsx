import { AnyAction, Reducer } from 'redux'

export interface RouteHistoryState {
  back: string[]
  forward: string[]
  lastAction: 'back' | 'forward' | 'push'
}

/**
 * Keeps track of the back and forward buttons in the browser
 * * ! Debate on use of this reducer
 **/
const routeHistoryReducer: Reducer = (
  state = { back: [], forward: [] },
  action: AnyAction
) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const back = [...state.back]
    let forward = [...state.forward]
    let lastAction = null

    const key = action.payload.location.key
    const pAction = action.payload.action

    if (pAction === 'PUSH') {
      back.push(key)
      forward = []
      lastAction = 'push'
    } else if (pAction === 'POP' && key) {
      const twoBack = back[back.length - 2]

      if (twoBack === key) {
        forward.unshift(back[back.length - 1])
        back.pop()
        lastAction = 'back'
      } else {
        forward.shift()
        back.push(key)
        lastAction = 'forward'
      }
    }

    return { back, forward, lastAction }
  }

  return state
}

export default routeHistoryReducer

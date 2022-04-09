import { Dispatch, SetStateAction, useState } from 'react'

export function useLegacyState<T>(initialState: T) {
  const [state, setState] = useState(initialState)

  const setLegacyState = (nextState: Partial<T>) => {
    setState({ ...state, ...nextState })
  }

  return [state, setLegacyState] as [T, Dispatch<SetStateAction<T>>]
}

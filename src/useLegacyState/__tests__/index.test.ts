import { act, renderHook } from '@testing-library/react-hooks'
import { useLegacyState } from '..'

const setup = (initialState: any) => renderHook(() => useLegacyState(initialState))

describe('useLegacyState', () => {
  test('should update legacy state', () => {
    const { result } = setup({ left: 0, right: 0, top: 0, bottom: 0 })

    expect(result.current[0]).toEqual({ left: 0, right: 0, top: 0, bottom: 0 })

    act(() => {
      result.current[1]({ left: 1 })
    })
    expect(result.current[0]).toEqual({ left: 1, right: 0, top: 0, bottom: 0 })

    act(() => {
      result.current[1]({ right: 2, top: 3 })
    })
    expect(result.current[0]).toEqual({ left: 1, right: 2, top: 3, bottom: 0 })
  })
})

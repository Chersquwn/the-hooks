import { renderHook } from '@testing-library/react-hooks'
import { usePrevious } from '..'

const setup = () => renderHook((value?: any) => usePrevious(value))

describe('usePrevious', () => {
  test('should return undefined when init', () => {
    const { result } = setup()

    expect(result.current).toBeUndefined()
  })

  test('should update previous value after new input', () => {
    const { rerender, result } = setup()

    rerender(0)
    expect(result.current).toBeUndefined()

    rerender(1)
    expect(result.current).toBe(0)

    rerender(2)
    expect(result.current).toBe(1)

    rerender(3)
    expect(result.current).toBe(2)
  })
})

/* eslint-disable max-nested-callbacks */
import { act, renderHook } from '@testing-library/react-hooks'
import { useState } from 'react'
import { useAsyncEffect } from '..'

async function sleep(time = 100) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
})

describe('useAsyncEffect', () => {
  test('should work fine', async () => {
    const hook = renderHook(() => {
      const [state, setState] = useState(0)

      useAsyncEffect(async () => {
        await sleep(100)
        setState(1)
      }, [])

      return state
    })

    expect(hook.result.current).toBe(0)

    await act(() => {
      jest.advanceTimersByTime(150)
    })

    expect(hook.result.current).toBe(1)
  })

  test('should work fine with cleanup', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(0)
      const [y, setY] = useState(10)

      useAsyncEffect(
        async () => {
          await sleep(100)
          const value = y + 1
          const interval = setTimeout(() => {
            setX(value)
          }, 1000);

          return interval
        },
        (interval) => {
          clearTimeout(interval)
        },
        [y]
      )

      return {
        x,
        y,
        setY
      }
    })

    expect(hook.result.current.x).toBe(0)

    await act(() => {
      jest.advanceTimersByTime(150)
    })

    expect(hook.result.current.x).toBe(0)

    act(() => {
      hook.result.current.setY(20)
    })

    expect(hook.result.current.y).toBe(20)

    await act(() => {
      jest.advanceTimersByTime(1100)
    })

    expect(hook.result.current.x).toBe(0)

    await act(() => {
      jest.advanceTimersByTime(1100)
    })

    expect(hook.result.current.x).toBe(21)
  })
})

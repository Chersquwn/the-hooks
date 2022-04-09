import { act, renderHook } from '@testing-library/react-hooks'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ConditionalHookOptions, useConditional } from '..'

const setupHook = (options: ConditionalHookOptions<(...args: any) => any>) => renderHook(() => useConditional(options))

let container: HTMLElement

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
});

afterEach(() => {
  if (!container) return

  document.body.removeChild(container)
});

describe('useConditional', () => {
  const useTitle = (title: string) => {
    const [customTitle, setCustomTitle] = useState<string>()

    useEffect(() => {
      setCustomTitle(`Title: ${title}`)
    }, [title])

    return customTitle
  }

  const useMultiParams = (name: string, age: number) => {
    const [state, setState] = useState<string>()

    useEffect(() => {
      setState(`name: ${name}, age: ${age}`)
    }, [name, age])

    return state
  }

  test('should call hook if condition is true', () => {
    const { result } = setupHook({
      hook: useTitle,
      hookProps: 'This is a title',
      condition: true
    })

    act(() => {
      const HookComponent = result.current.HookComponent
      createRoot(container).render(<HookComponent />)
    })

    expect(result.current.result).toEqual('Title: This is a title')
  })

  test('should call hook fine for multi params', () => {
    const { result } = setupHook({
      hook: useMultiParams,
      hookProps: [
        'Tom',
        12
      ],
      condition: true
    })

    act(() => {
      const HookComponent = result.current.HookComponent
      createRoot(container).render(<HookComponent />)
    })

    expect(result.current.result).toEqual('name: Tom, age: 12')
  })

  test('should not call hook if condition is false', () => {
    const { result } = setupHook({
      hook: useTitle,
      hookProps: 'This is a title',
      condition: false
    })

    act(() => {
      const HookComponent = result.current.HookComponent
      createRoot(container).render(<HookComponent />)
    })

    expect(result.current.result).toBeUndefined()
  })
})

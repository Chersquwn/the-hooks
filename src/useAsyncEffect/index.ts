import { DependencyList, useEffect } from 'react'

type Effect<T> = () => Promise<T>

export function useAsyncEffect<T>(effect: Effect<T>, deps: DependencyList): void
export function useAsyncEffect<T>(effect: Effect<T>, destroy: (result: T) => void, deps: DependencyList): void
export function useAsyncEffect<T>(effect: Effect<T>, x: any, y?: any) {
  const deps = y !== undefined && typeof x === 'function' ? y : x
  const destroy = typeof x === 'function' ? x : undefined

  useEffect(() => {
    let result: T

    const asyncFn = async () => {
      result = await effect()
    }

    asyncFn()

    return () => {
      if (destroy) {
        destroy(result)
      }
    }
  }, deps)
}

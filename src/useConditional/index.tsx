import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import equal from 'fast-deep-equal'

type Hook = (...args: any) => any

export interface ConditionalHookOptions<H extends Hook> {
  hook: H;
  hookProps: Parameters<H>;
  condition: boolean;
  component?: ReactNode;
}

export function useConditional<H extends Hook>(
  {
    hook,
    hookProps,
    condition,
    component = null
  }: ConditionalHookOptions<H>
) {
  const [result, setResult] = useState<ReturnType<H>>()
  const temp = useRef<ReturnType<H>>()

  const props = useMemo(
    () => Array.isArray(hookProps) ? [...hookProps] : [hookProps],
    [hookProps]
  )

  const RenderComponent = useMemo(() => () => <>{component}</>, [component])

  const HookComponent = useMemo(
    () => () => {
      const value = hook(...props)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        if (!equal(temp.current, value)) {
          temp.current = value
          setResult(value)
        }
      }, [value])

      return <RenderComponent />
    },
    [hook, props, RenderComponent]
  )

  return {
    result,
    HookComponent: condition ? HookComponent : RenderComponent
  }
} 

# useConditional

## Usage

```tsx
const useTitle = (title: string) => {
  const [customTitle, setCustomTitle] = useState<string>()

  useEffect(() => {
    setCustomTitle(`Title: ${title}`)
  }, [title])

  return customTitle
}

const { result, HookComponent } = useConditional({
  hook: useTitle,
  hookProps: 'title',
  condition: true
})

// 需要将 <HookComponent /> render 才会根据 condition 执行 hook
<HookComponent />
```

## API

```ts
function useConditional<H extends Hook>(
  {
    hook,
    hookProps,
    condition,
    component
  }: ConditionalHookOptions<H>
)
```

## Params

### options: `ConditionalHookOptions<H>`

| name | description | type | default |
| ---- | ----------- | ---- | ------- |
| hook | hook 函数 | `(...args: any) => any` | - |
| hookProps | hook 函数的参数 | `any | any[]` | - |
| condition | 是否需要执行 hook 函数 | `boolean` | - |
| component | 需要渲染的 component | `ReactNode` | `null` |

## Result

| name | description | type | default |
| ---- | ----------- | ---- | ------- |
| result | hook 函数执行后的结果 | `any` | - |
| HookComponent | 需要渲染的 hook 组件，必须要在父组件中 render | `ReactElement` | - |

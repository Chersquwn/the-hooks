# usePrevious

## Usage

```ts
const [state, setState] = useState(1)
const previouState = usePrevious(state)

setState(2)

// after rerender

console.log(state)  // state = 2
console.log(previouState)  // previousState = 1
```

## API

```ts
function usePrevious<T = any>(value: T) {}
```

## Params

| name | description | type | default |
| ---- | ----------- | ---- | ------- |
| state | 需要保存的状态 | `any` | - |

## Result

| name | description | type | default |
| ---- | ----------- | ---- | ------- |
| previousState | state 的上一个值 | `any` | - |

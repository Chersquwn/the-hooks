# useLegacyState

## Usage

```ts
const [rect, setRect] = useLegacyState({ width: 0, height: 0, left: 0, top: 0 })

setRect({ width: 100 })

console.log(rect)  // rect = { width: 100, height： 0, left: 0, top: 0 }
```

## API

```ts
function useLegacyState<T>(initialState: T) {}
```

## Params

| name | description | type | default |
| ---- | ----------- | ---- | ------- |
| initialState | 初始状态 state | `any` | - |

## Result

| name | description | type | default |
| ---- | ----------- | ---- | ------- |
| state | 数组第一项，最新的状态 | `any` | - |
| dispatch | 数组第二项，更新状态的方法 | `Dispatch<SetStateAction<any>>` | - |

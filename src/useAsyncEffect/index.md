# useAsyncEffect

## Usage

```ts
useAsyncEffect(async () => {
  await api()
}, [])

useAsyncEffect(
  async () => {
    const { userId } = await api()

    function handleStatusChange(status) {
      console.log(status)
    }

    ChatAPI.subscribe(userId, handleStatusChange)

    return {
      userId,
      handleStatusChange
    }
  },
  ({ userId, handleStatusChange }) => {
    ChatAPI.unsubscribe(userId, handleStatusChange)
  },
  []
)
```

## API

```ts
function useAsyncEffect<T>(effect: Effect<T>, deps: DependencyList): void
function useAsyncEffect<T>(effect: Effect<T>, destroy: (result: T) => void, deps: DependencyList): void
```

## Params

| name | description | type | default |
| ---- | ----------- | ---- | ------- |
| effect | 副作用 | `<T>() => Promise<T>` | - |
| deps | 依赖数组 | `DependencyList` | - |
| destroy | 销毁函数 | `(result: T) => void` | - |

## Result

`void`

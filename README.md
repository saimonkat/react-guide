# Библиотека знаний

## Method shouldComponentUpdate()

У всех компонентов React при перерендере срабатывает метод жизненного цикла shouldComponentUpdate(), который сравнивает стейт и пропы компонента которые есть сейчас с тем что нам нужно накатить при следующем рендере. 

1. Классы
- React.Component - ререндерится всегда.
- React.PureComponent - рендерится только при сравнении shouldComponentUpdate().

2. Функциональные компонениы
- function component - ререндерится всегда.
- React.memo() - рендерится только при сравнении shouldComponentUpdate().

```tsx
function test(testProps) {
  console.log('test is printing');
  return <span>{props.test}</span>
}
// ⬇
const Test = React.memo(
  function test(testProps) {
    console.log('test is printing');
    return <span>{props.test}</span>
  }
)
```

## Дополнения

`.sbp-SbOverlay` - скрыть bg плеера
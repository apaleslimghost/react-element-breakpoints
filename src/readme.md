react-element-query
===

A higher-order-component for Element Queries in React, using the ResizeObserver polyfill.

usage
---

```js
import {withBreakpoints, bp} from 'react-element-query';

const FancyHeader = withBreakpoints({
	wide: ({width}) => width >= 400,
	tall: ({height}) => height >= 200,
})(props => <h1 style={{
	fontSize: bp('18px', {
		wide: '30px'
	})(props),

	color: bp('black', {tall: 'red'})(props),
}}>
	It works!
</h1>);
```

The breakpoint functions are called with the `contentRect` from the ResizeObserver entry, which contains `left`, `top`, `right`, `bottom`, `width` and `height`.

### with styled-components

The `bp` helper works well with styled-components:

```js
const FancyHeader = withBreakpoints({
	wide: ({width}) => width >= 400,
	tall: ({height}) => height >= 200,
})(styled.h1`
	font-size: ${bp('18px', {
		wide: '30px'
	})},

	color: ${bp('black', {tall: 'red'})},
`);
```

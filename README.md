# ds-ctx
dumb simple context splitter for nextjs

webpack:
```js
// next.config.js

const withContext = require('next-transpile-modules')(['ds-ctx']);

module.exports = withContext();
```

usage:
```tsx

// initState.ts
export const initState = {
    fruit:{
        dsPreserve?: true, /* preserve object as its own context  */
        apples: 1,
        bananas: 2,
        grapes: 3
    }
}
```

```tsx
// app.tsx

import { initState } from "./initState"
import { Component } from "./component"
import { DSCTX } from "ds-ctx"

const [ ContextProvider, useCTX ] = DSCTX(initState)

export default ()=>
    <ContextProvider>
        <Component/>
    </ContextProvider>

export { useCTX }
```

```tsx
// component.tsx

import { useCTX } from "./app.tsx"

export const Component = ()=>{

    const { get, set, init } = useCTX()

    const increment = ()=> {
        set.fruit.apples(state => state += 1)
    }
    const reset = ()=> {
        set.fruit.apples(init.fruit.apples)
    }

    return(
        <div>
            <div>Apples: {get.fruit.apples()}</div>
            <button onClick={()=> increment()}>Increment</button>
            <button onClick={()=> reset()}>Reset</button>
        </div>
    )
}

```
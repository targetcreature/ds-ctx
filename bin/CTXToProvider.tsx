import { useState } from 'react'

export const CTXToProvider = (CTX) => ({ children }) => {

    const Provider = CTX.reduce((prev, val) => {

        const { Context, SetContext, initState } = val
        const [state, set] = useState(initState)

        return (
            <Context.Provider value={state}>
                <SetContext.Provider value={set}>
                    {prev}
                </SetContext.Provider>
            </Context.Provider>
        )

    }, children)

    return Provider
}
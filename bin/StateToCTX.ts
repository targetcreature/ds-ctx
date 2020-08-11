import { createContext, useContext } from "react"
import { CTX } from "../_types"
import { isObject } from "./_isObject"

const CTXArray = []

const loopCTX = <T>(state: T) => Object.entries(state).reduce((prev, [key, val]) => {

    let value = {}

    if (isObject(val) && !val.__preserveCTX) {
        value = loopCTX(val)
    }

    else {
        const initState = val
        const Context = createContext(initState)
        const SetContext = createContext(null)

        const ctx: CTX<typeof val> = {
            Context,
            SetContext,
            initState
        }

        CTXArray.push(ctx)

        value = (opt = null) => {
            if (!opt) {
                return useContext(Context)
            }
            const set = useContext(SetContext)
            return set
        }
    }

    return {
        ...prev,
        [key]: value
    }
}, {})


export const StateToCTX = <T>(obj: T) => {
    const CTXObject = loopCTX(obj)
    return { CTXArray, CTXObject }
}

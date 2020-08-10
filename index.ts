import { setAutoFreeze } from "immer"
import { CTXToProvider } from "./bin/CTXToProvider"
import { StateToCTX } from "./bin/StateToCTX"
import { _useCTX } from "./bin/_useCTX"
import { UseCTX } from "./_types"

export type ArgProps = {
    disableAutoFreeze?: boolean
}

type ReturnProps<T> = [
    React.FC,
    () => UseCTX<T>
]

export const DSCTX = <T extends object>(INIT: T, ARGS?: ArgProps): ReturnProps<T> => {

    if (ARGS) {
        ARGS.disableAutoFreeze && setAutoFreeze(false)
    }
    const { CTXArray, CTXObject } = StateToCTX(INIT)

    const Provider = CTXToProvider(CTXArray)
    const useCTX = () => _useCTX(CTXObject as T, INIT)

    return [Provider, useCTX]
}
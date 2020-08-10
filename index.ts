import { CTXToProvider } from "./bin/CTXToProvider"
import { StateToCTX } from "./bin/StateToCTX"
import { _useCTX } from "./bin/_useCTX"
import { UseCTX } from "./_types"

type ReturnProps<T> = [
    React.FC,
    () => UseCTX<T>
]

export const DSCTX = <T extends object>(INIT: T): ReturnProps<T> => {

    const { CTXArray, CTXObject } = StateToCTX(INIT)

    const Provider = CTXToProvider(CTXArray)
    const useCTX = () => _useCTX(CTXObject as T, INIT)

    return [Provider, useCTX]
}
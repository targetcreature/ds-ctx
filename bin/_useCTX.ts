import { GET, SET, UseCTX } from "../_types"
import { isObject } from "./_isObject"

export const _useCTX = <T>(CTX: T, init: T): UseCTX<T> => {

    const loopSet = <P>(obj: P) => Object.entries(obj).reduce((prev, [key, val]): SET<P> => {

        let value = {}
        if (isObject(val)) {
            value = loopSet(val)
        }

        else {
            value = val(1)
        }
        return {
            ...prev,
            [key]: value
        }

    }, {} as SET<P>)

    const get = CTX as unknown as GET<T>
    const set = loopSet(CTX)

    return {
        get,
        set,
        init
    }

}
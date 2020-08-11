type Preserve = {
    __preserveCTX: true
}

interface Filter extends Preserve { }

type NotObject = string | number | boolean | any[] | Filter

export interface CTX<T> {
    initState: T
    Context: React.Context<T>
    SetContext: React.Context<React.Dispatch<React.SetStateAction<T>>>
}

export type SET<T> = {
    [K in keyof T]: T[K] extends NotObject
    ? React.Dispatch<React.SetStateAction<T[K]>>
    : T[K] extends {}
    ? SET<T[K]>
    : never
}

export type GET<T> = {
    [K in keyof T]: T[K] extends NotObject
    ? () => T[K]
    : T[K] extends {}
    ? GET<T[K]>
    : never
}

export type UseCTX<T> = {
    get: GET<T>
    set: SET<T>
    init: Readonly<T>
}
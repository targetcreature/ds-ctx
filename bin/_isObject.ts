export const isObject = (variable: any) => {
    return Object.prototype.toString.call(variable) === '[object Object]'
}
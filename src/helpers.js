export const safeFn = fn => (...args) => (fn ? fn(...args) : undefined)

export const isInteger = text => !isNaN(parseInt(text, 10))

export const isObject = obj =>
    obj !== null && obj !== undefined && obj.constructor === Object

export const isEmpty = obj => isObject(obj) && Object.entries(obj).length === 0

export const head = arr => arr[0]
export const tail = arr => arr.slice(1)
export const last = arr => arr[arr.length - 1]

export const deepClone = obj => JSON.parse(JSON.stringify(obj))

export const log = obj => console.log(JSON.stringify(obj, null, 2))

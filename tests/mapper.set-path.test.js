/*globals test, expect*/
import { getPath } from "../src/mapper"

const deepClone = obj => JSON.parse(JSON.stringify(obj))

const setPath = (name, value, obj) => {
    const newObj = deepClone(obj)
    newObj[name] = value

    return newObj
}

test("does not mutate original", () => {
    const obj = { first: 42 }

    const result = setPath("first", 43, obj)

    expect(result === obj).toBe(false)
})

test("one level", () => {
    const obj = { first: 42 }

    const result = setPath("first", 68, obj)

    expect(result.first).toBe(68)
})

/*test("many levels", () => {
    const obj = { first: { second: { third: 42 } } }

    const result = getPath("first.second.third", obj)

    expect(result === obj).toBe(false)
})

test("many levels within arrays", () => {
    const obj = { first: { second: [{ third: 42 }, { third: 68 }] } }

    const result = getPath("first.second.1.third", obj)

    expect(result).toBe(68)
})
*/

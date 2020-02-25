/*globals test, expect*/
import { getPath } from "../src/mapper"

test("one level", () => {
    const obj = { first: 42 }

    const result = getPath("first", obj)

    expect(result).toBe(42)
})

test("many levels", () => {
    const obj = { first: { second: { third: 42 } } }

    const result = getPath("first.second.third", obj)

    expect(result).toBe(42)
})

test("many levels within arrays", () => {
    const obj = { first: { second: [{ third: 42 }, { third: 68 }] } }

    const result = getPath("first.second.1.third", obj)

    expect(result).toBe(68)
})

test("missing many levels", () => {
    const obj = {}

    const result = getPath("first.second.third", obj)

    expect(result).toBeNull()
})

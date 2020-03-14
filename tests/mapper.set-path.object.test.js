/*globals test, expect*/
import { log } from "../src/helpers"
import { setPath } from "../src/mapper"

test("one level", () => {
    const obj = { first: 42 }

    const result = setPath("first", 68, obj)

    expect(result.first).toBe(68)
})

test("many levels", () => {
    const obj = { first: { second: { third: 42 } } }

    const result = setPath("first.second.third", 68, obj)

    expect(result.first.second.third).toBe(68)
})

test("missing last object level", () => {
    const obj = { first: { second: {} } }

    const result = setPath("first.second.third", 68, obj)

    expect(result.first.second.third).toBe(68)
})

test("missing many object levels", () => {
    const obj = {}

    const result = setPath("first.second.third", 68, obj)

    expect(result.first.second.third).toBe(68)
})

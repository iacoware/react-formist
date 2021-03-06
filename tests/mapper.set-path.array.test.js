/*globals test, expect*/
import { log } from "../src/helpers"
import { setPath } from "../src/mapper"

test("array", () => {
    const obj = []

    const result = setPath("1", 68, obj)

    expect(Array.isArray(result)).toBe(true)
    expect(result[1]).toBe(68)
})

test("array with nested object", () => {
    const obj = []

    const result = setPath("1.city", "Florence", obj)

    expect(Array.isArray(result)).toBe(true)
    expect(result[1].city).toBe("Florence")
})

test("object with nested array", () => {
    const obj = { first: { second: [{ third: 42 }, { third: 68 }] } }

    const result = setPath("first.second.1.third", 99, obj)

    expect(result.first.second[1].third).toBe(99)
    expect(result.first.second[0].third).toBe(42)
    expect(result.first.second.length).toBe(2)
})

test("missing middle array level", () => {
    const obj = {}

    const result = setPath("first.second.1.third", 68, obj)

    expect(Array.isArray(result.first.second)).toBe(true)
    expect(result.first.second[1].third).toBe(68)
})

test("missing last array level", () => {
    const obj = {}

    const result = setPath("first.second.1", 68, obj)

    expect(Array.isArray(result.first.second)).toBe(true)
    expect(result.first.second[1]).toBe(68)
})

test("missing nested array levels", () => {
    const obj = []

    const result = setPath("1.2.3", 68, obj)

    expect(Array.isArray(result)).toBe(true)
    expect(result[1][2][3]).toBe(68)
})

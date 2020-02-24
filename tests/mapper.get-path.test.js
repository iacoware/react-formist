/*globals test, expect*/
import { pathValue as getPath } from "../src/mapper"

test("one level", () => {
    const obj = { first: 42 }

    const result = getPath("first", obj)

    expect(result).toBe(42)
})

test("one element, many level", () => {
    const obj = { first: { second: { third: 42 } } }

    const result = getPath("first.second.third", obj)

    expect(result).toBe(42)
})

/*
test("many elements, many levels", () => {
    const now = new Date()
    const values = {
        "one.two.three1": 42,
        "one.two.three2": "is",
        "one.two.three3": "the answer",
        "four.five1": now,
        "four.five2": true,
    }

    const result = mapPropsToObj(values)

    expect(result).toStrictEqual({
        one: { two: { three1: 42, three2: "is", three3: "the answer" } },
        four: { five1: now, five2: true },
    })
})
*/

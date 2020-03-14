/*globals test, expect*/
import { log } from "../src/helpers"
import { setPath } from "../src/mapper"

test("does not mutate original", () => {
    const obj = { first: 42 }

    const result = setPath("first", 43, obj)

    expect(result === obj).toBe(false)
})

test("root, type mismatch (object instead of array)", () => {
    expect(() => setPath("0", 68, {})).toThrow(/mismatch/)
})

test("root, type mismatch (array instead of object)", () => {
    expect(() => setPath("age", 68, [])).toThrow(/mismatch/)
})

test("nested, type mismatch (object instead of array)", () => {
    expect(() =>
        setPath("addresses.0.city", "Florence", { addresses: {} }),
    ).toThrow(/mismatch/)
})

test("nested type mismatch (array instead of object)", () => {
    expect(() => setPath("0.addresses.0", "Florence", [[]])).toThrow(/mismatch/)
})

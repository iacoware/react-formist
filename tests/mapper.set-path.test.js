/*globals test, expect*/
import { log } from "../src/helpers"
import { setPath } from "../src/mapper"

test("does not mutate original", () => {
    const obj = { first: 42 }

    const result = setPath("first", 43, obj)

    expect(result === obj).toBe(false)
})

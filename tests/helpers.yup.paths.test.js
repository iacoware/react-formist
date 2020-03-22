/*globals test, expect*/
import { fromYupPath, toYupPath } from "../src/helpers.yup"

test("from: simple paths", () => {
    expect(fromYupPath("name")).toBe("name")
    expect(fromYupPath("name.age")).toBe("name.age")
})

test("from: array paths", () => {
    expect(fromYupPath("[0]")).toBe("0")
    expect(fromYupPath("name[0]")).toBe("name.0")
    expect(fromYupPath("name[0][1]")).toBe("name.0.1")
    expect(fromYupPath("name[0][1].second")).toBe("name.0.1.second")
})

test("to: simple paths", () => {
    expect(toYupPath("name")).toBe("name")
    expect(toYupPath("name.age")).toBe("name.age")
})

test("to: simple paths", () => {
    expect(toYupPath("0")).toBe("[0]")
    expect(toYupPath("name.0")).toBe("name[0]")
    expect(toYupPath("name.0.1")).toBe("name[0][1]")
    expect(toYupPath("name.0.1.second")).toBe("name[0][1].second")
})

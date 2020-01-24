/*globals test, expect*/
import * as yup from "yup"
import { safeFn, isObject, isEmpty, extractYupErrors } from "../src/helpers"

test("safeFn, null function", () => {
    const safeInvoke = safeFn(null)

    expect(safeInvoke()).toBe(undefined)
})

test("safeFn, valid function, no args", () => {
    const safeInvoke = safeFn(() => 1)

    expect(safeInvoke()).toBe(1)
})

test("safeFn, valid function, many args", () => {
    const safeInvoke = safeFn((num, text) => num + text)

    expect(safeInvoke(1, "hello")).toBe("1hello")
})

test("an object", () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: "a" })).toBe(true)
})

test("not an object", () => {
    expect(isObject([])).toBe(false)
    expect(isObject(1)).toBe(false)
    expect(isObject("text")).toBe(false)
    expect(isObject(new Date())).toBe(false)
    expect(isObject(Date())).toBe(false)
    expect(isObject(new Map())).toBe(false)
    expect(isObject(new Set())).toBe(false)
    expect(isObject()).toBe(false)
    expect(isObject(null)).toBe(false)
})

test("empty", () => {
    expect(isEmpty({})).toBe(true)
})

test("not empty", () => {
    expect(isEmpty({ a: "a" })).toBe(false)
    expect(isEmpty(5)).toBe(false)
    expect(isEmpty(null)).toBe(false)
    expect(isEmpty(undefined)).toBe(false)
})

test("extract yup errors", () => {
    let schema = yup.object().shape({
        firstName: yup.string().required(),
        age: yup.number().required(),
    })

    let result = {}
    try {
        schema.validateSync({}, { abortEarly: false })
    } catch (errors) {
        result = extractYupErrors(errors)
    }

    expect(result).toStrictEqual({
        firstName: "firstName is a required field",
        age: "age is a required field",
    })
})

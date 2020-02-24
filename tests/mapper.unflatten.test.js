/*globals test, expect*/
import { unflatten } from "../src/mapper"

test("custom object arrays", () => {
    const values = {
        "customer.addresses.0.street": "5th avenue",
        "customer.addresses.0.city": "New York",
    }

    const result = unflatten(values)

    expect(result).toStrictEqual({
        customer: { addresses: [{ city: "New York", street: "5th avenue" }] },
    })
})

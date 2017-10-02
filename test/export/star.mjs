import assert from "assert"
import def, { a, b, c as d } from "../fixture/export/star-with-default.mjs"
import * as ns from "../fixture/export/star-without-default.mjs"

export default () => {
  const starNs = {
    a: "a",
    b: "b",
    c: "c"
  }

  assert.strictEqual(a, "a")
  assert.strictEqual(b, "b")
  assert.strictEqual(d, "c")
  assert.strictEqual(def, "default")
  assert.deepEqual(ns, starNs)
}
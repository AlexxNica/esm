import assert from "assert"

export const one = 1

import {
  one as aOne,
  two as aTwo
} from "./a.mjs"

export const two = 2

export default function () {
  assert.strictEqual(aOne, 1)
  assert.strictEqual(aTwo, 2)
}

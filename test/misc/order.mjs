import assert from "assert"
import { getLog } from "../fixture/order/tracker.mjs"
import "../fixture/order/c.mjs"

export default () => {
  assert.deepEqual(getLog(), ["a", "b", "c"])
}

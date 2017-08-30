import Module from "./module.js"

import env from "./env.js"
import { inspect } from "util"
import mainHook from "./hook/main.js"
import moduleHook from "./hook/module.js"
import replHook from "./hook/repl.js"
import requireHook from "./hook/require.js"
import setProperty from "./util/set-property.js"
import vm from "vm"

const BuiltinModule = __non_webpack_module__.constructor

const { custom } = inspect
const inspectKey = typeof custom === "symbol" ? custom : "inspect"

function hook(mod) {
  moduleHook(Module)
  return requireHook(mod)
}

if (env.cli) {
  // Enable ESM in command-line utilities by including @std/esm as an argument.
  moduleHook(BuiltinModule)
} else {
  if (env.repl) {
    // Enable ESM in the Node REPL by loading @std/esm upon entering.
    // Custom REPLs can still define their own eval functions to bypass this.
    replHook(vm)
  } else if (env.preload &&
      process.argv.length > 1) {
    // Enable ESM in the Node CLI by loading @std/esm with the -r option.
    mainHook(BuiltinModule)
  }

  moduleHook(Module)
}

setProperty(hook, inspectKey, {
  configurable: false,
  enumerable: false,
  value: () => "@std/esm enabled",
  writable: false
})

export default Object.freeze(hook)

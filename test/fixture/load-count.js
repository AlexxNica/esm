"use module"

if (typeof global.loadCount === "number") {
  global.loadCount++
} else {
  global.loadCount = 1
}

module.exports = global.loadCount

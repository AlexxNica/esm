import { delimiter, join } from "path"

import { ensureLink } from "fs-extra"
import execa from "execa"
import globby from "globby"
import trash from "./trash.js"

const NODE_ENV = String(process.env.NODE_ENV)

const isProd = NODE_ENV.startsWith("production")
const isWin = process.platform === "win32"

const rootPath = join(__dirname, "..")
const testPath = join(rootPath, "test")
const envPath = join(testPath, "env")
const esmPath = isProd ? "../index.js" : "../build/esm.js"

const HOME = join(envPath, "home")
const MOCHA_BIN = join(rootPath, "node_modules/mocha/bin/mocha")
const NODE_BIN = join(envPath, "prefix", isWin ? "node.exe" : "bin/node")
const NODE_PATH = [
  join(envPath, "node_path"),
  join(envPath, "node_path/relative")
].join(delimiter)

const trashPaths = globby.sync([
  "**/.?(esm-)cache",
  "test/**/*.gz"
], {
  cwd: rootPath,
  realpath: true
})

const mochaArgs = [
  MOCHA_BIN,
  "--full-trace",
  "--require", esmPath,
  "tests.mjs"
]

function cleanRepo() {
  return Promise.all(trashPaths.map(trash))
}

function runTests() {
  return execa(NODE_BIN, mochaArgs, {
    cwd: testPath,
    env: { HOME, NODE_PATH, USERPROFILE: HOME },
    reject: false,
    stdio: "inherit"
  })
}

function setupNode() {
  const basePath = join(NODE_BIN, isWin ? "" : "..")
  return trash(basePath)
    .then(() => ensureLink(process.execPath, NODE_BIN))
}

/* eslint-disable lines-around-comment */
Promise
  .all([
    cleanRepo(),
    setupNode()
  ])
  // Run tests without the cache.
  .then(runTests)
  // Run tests with the cache.
  .then(runTests)

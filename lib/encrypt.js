'use strict'

const fs = require('fs')
const path = require('path')
const pify = require('pify')
const base64Img = require('base64-img')
const nacl = require('nacl-encrypt')

function defaultOptions (options) {
  var { filePath, key } = options
  if (!filePath) throw new Error('filePath is empty.')
  if (!key) key = nacl.generateKey()

  return { filePath, key }
}

function destFilePath (options) {
  var { destPath, filePath } = options

  if (!destPath) destPath = path.dirname(filePath)

  var extname = path.extname(filePath)
  var filename = path.basename(filePath, extname)

  return path.resolve(destPath, filename + '.ept')
}

const encrypt = function (options) {
  var { filePath, key } = defaultOptions(options)

  return pify(base64Img.base64)(filePath).then(b64 => ({
    data: nacl.encrypt(b64, key),
    key
  }))
}

const encryptSync = function (options) {
  var { filePath, key } = defaultOptions(options)
  var b64 = base64Img.base64Sync(filePath)
  return {
    key,
    data: nacl.encrypt(b64, key)
  }
}

const encryptTo = function (options) {
  var destPath = destFilePath(options)

  return encrypt(options).then(res => pify(fs.writeFile)(destPath, res.data).then(() => ({ destPath, key: res.key })))
}

const encryptToSync = function (options) {
  var res = encryptSync(options)
  var destPath = destFilePath(options)

  fs.writeFileSync(destPath, res.data)
  return { destPath, key: res.key }
}

module.exports = { encrypt, encryptSync, encryptTo, encryptToSync }

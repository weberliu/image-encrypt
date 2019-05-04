'use strict'

const fs = require('fs')
const path = require('path')
const pify = require('pify')
const base64Img = require('base64-img')
const { encrypt, decrypt, generateKey } = require('nacl-encrypt')

function defaultOptions (options) {
  var { filePath, key, destDir } = options
  if (!filePath) throw new Error('filePath is empty.')
  if (!key) key = generateKey()
  if (!destDir) destDir = path.dirname(filePath)

  var filename = path.basename(filePath)
  var destPath = path.resolve(destDir, filename.substr(0, filename.lastIndexOf('.')) + '.ept')

  return { filePath, key, destPath }
}
module.exports = {
  generateKey,

  encrypt: (options) => {
    var { filePath, key, destPath } = defaultOptions(options)

    return pify(base64Img.base64)(filePath)
      .then(b64 => {
        var data = encrypt(b64, key)
        return pify(fs.writeFile)(destPath, data)
      })
      .then(() => ({ destPath, key }))
  },

  encryptSync: (options) => {
    var { filePath, key, destPath } = defaultOptions(options)
    var b64 = base64Img.base64Sync(filePath)
    var data = encrypt(b64, key)
    fs.writeFileSync(destPath, data)
    return { destPath, key }
  },

  decrypt: (options) => {
    var { key, filePath, destDir } = options
    if (!key || !filePath) throw new Error('"filePath" or "key" is mission.')

    return pify(fs.readFile)(filePath)
      .then(img => {
        var b64 = decrypt(img, key)
        if (destDir) {
          var filename = path.basename(filePath, '.ept')
          return pify(base64Img.img)(b64, destDir, filename)
        } else {
          return Promise.resolve(b64)
        }
      })
  },

  decryptSync: (options) => {
    var { key, filePath, destDir } = options
    if (!key || !filePath) throw new Error('"filePath" or "key" is mission.')

    var img = fs.readFileSync(filePath)
    var filename = path.basename(filePath, '.ept')
    var b64 = decrypt(img, key)

    return (destDir)
      ? base64Img.imgSync(b64, destDir, filename)
      : b64
  }
}

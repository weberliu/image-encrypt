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

/**
 * 异步方法，将图片加密后并返回字符串以及秘钥
 *
 * @param {Object} options 加密配置
 * @param {string} options.key 加密的秘钥，可以为空
 * @param {string} options.filePath 源文件路径
 * @returns {Object}
 */
const encrypt = function (options) {
  var { filePath, key } = defaultOptions(options)

  return pify(base64Img.base64)(filePath).then(b64 => ({
    data: nacl.encrypt(b64, key),
    key
  }))
}

/**
 * 同步方法，将图片加密后并返回字符串以及秘钥
 *
 * @param {Object} options 加密配置
 * @param {string} options.key 加密的秘钥，可以为空
 * @param {string} options.filePath 源文件路径
 * @returns {Object}
 */
const encryptSync = function (options) {
  var { filePath, key } = defaultOptions(options)
  var b64 = base64Img.base64Sync(filePath)
  return {
    key,
    data: nacl.encrypt(b64, key)
  }
}

/**
 * 异步方法，将图片加密后并保存文件
 *
 * @param {Object} options 加密配置
 * @param {string} options.key 加密的秘钥，可以为空
 * @param {string} options.filePath 源文件路径
 * @param {string} options.destPath 加密后文件存储目录，默认为源文件相同目录
 * @returns {Object}
 */
const encryptTo = function (options) {
  var destPath = destFilePath(options)

  return encrypt(options).then(res => pify(fs.writeFile)(destPath, res.data).then(() => ({ destPath, key: res.key })))
}

/**
 * 同步方法，将图片加密后并保存文件
 *
 * @param {Object} options 加密配置
 * @param {string} options.key 加密的秘钥，可以为空
 * @param {string} options.filePath 源文件路径
 * @param {string} options.destPath 加密后文件存储目录，默认为源文件相同目录
 * @returns {Object}
 */
const encryptToSync = function (options) {
  var res = encryptSync(options)
  var destPath = destFilePath(options)

  fs.writeFileSync(destPath, res.data)
  return { destPath, key: res.key }
}

module.exports = { encrypt, encryptSync, encryptTo, encryptToSync }

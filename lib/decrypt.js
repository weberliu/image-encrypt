'use strict'

const fs = require('fs')
const path = require('path')
const pify = require('pify')
const base64Img = require('base64-img')
const nacl = require('nacl-encrypt')

/**
 * 异步方法，将加密的图片文件解密并输出为 base64 字符串
 *
 * @param {Object} options 解密设置
 * @param {string} options.key 加密时的秘钥
 * @param {string} options.filePath 加密后的图片文件路径
 * @returns {Promise}
 */
const decrypt = function (options) {
  var { key, filePath } = options
  if (!key || !filePath) throw new Error('"filePath" or "key" is mission.')

  return pify(fs.readFile)(filePath).then(img => nacl.decrypt(img, key))
}

/**
 * 同步方法，将加密的图片文件解密并输出为 base64 字符串
 *
 * @param {Object} options 解密设置
 * @param {string} options.key 加密时的秘钥
 * @param {string} options.filePath 加密后的图片文件路径
 * @returns {string} 解密后的 base64 字符串
 */
const decryptSync = function (options) {
  var { key, filePath } = options
  if (!key || !filePath) throw new Error('"filePath" or "key" is mission.')

  var img = fs.readFileSync(filePath)
  try {
    return nacl.decrypt(img, key)
  } catch (err) {
    throw new Error(`Incorrect secret key "${key}".`)
  }
}

/**
 * 将加密后的图片文件解密并输出为文件
 *
 * @param {Object} options 解密设置项
 * @param {string} options.key 加密时的秘钥
 * @param {string} options.filePath 加密后的图片文件路径
 * @param {string} options.destPath 解密后文件的存储目录的地址，默认为加密文件目录
 * @returns {Promise}
 */
const decryptTo = function (options) {
  var { filePath, destPath } = options
  if (!destPath) destPath = path.dirname(filePath)

  return decrypt(options).then(b64 => pify(base64Img.img)(b64, destPath, path.basename(filePath, '.ept')))
}

/**
 * 同步方法，将加密后的图片文件解密并输出为文件
 *
 * @param {Object} options 解密设置项
 * @param {string} options.key 加密时的秘钥
 * @param {string} options.filePath 加密后的图片文件路径
 * @param {string} options.destPath 解密后文件的存储目录的地址，默认为加密文件目录
 * @returns {string} 解密后的文件路径
 */
const decryptToSync = function (options) {
  var { filePath, destPath } = options
  if (!destPath) destPath = path.dirname(filePath)

  var b64 = decryptSync(options)
  var filename = path.basename(filePath, '.ept')
  return base64Img.imgSync(b64, destPath, filename)
}

module.exports = { decrypt, decryptSync, decryptTo, decryptToSync }

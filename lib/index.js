'use strict'

const { generateKey } = require('nacl-encrypt')
const { encrypt, encryptTo, encryptSync, encryptToSync } = require('./encrypt.js')
const { decrypt, decryptTo, decryptSync, decryptToSync } = require('./decrypt')

module.exports = {
  generateKey,

  encrypt,
  encryptTo,
  encryptSync,
  encryptToSync,

  decrypt,
  decryptTo,
  decryptSync,
  decryptToSync
}

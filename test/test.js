var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')
var imageEncrypt = require('../lib')

var outputPath = path.resolve(__dirname, 'output')
var filePath = path.resolve(__dirname, 'src', 'wolf.jpg')
var encryptedFilePath = path.resolve(__dirname, 'src', 'wolf.ept')
var key = 'so78e/GuQ1y/gQ9wtF2z/EYNmhnaGmtnWv2y45viVFM='

describe('encrypt image', () => {
  test('async to string', () => {
    imageEncrypt
      .encrypt({ filePath })
      .then(img => {
        expect(img).toHaveProperty('data')
        expect(img).toHaveProperty('key')
      })
      .catch(err => console.error(err))
  })

  test('sync to string', () => {
    var img = imageEncrypt.encryptSync({ filePath })
    expect(img).toHaveProperty('data')
    expect(img).toHaveProperty('key')
  })

  test('async to file', () => {
    imageEncrypt
      .encryptTo({ filePath, destPath: outputPath })
      .then(res => expect(fs.existsSync(res.destPath)).toBeTruthy())
      .catch(err => console.error(err))
  })

  test('sync to file', () => {
    var res = imageEncrypt.encryptToSync({ filePath, destPath: outputPath })
    expect(fs.existsSync(res.destPath)).toBeTruthy()
  })

  test('specified secret key', () => {
    var res = imageEncrypt.encryptSync({ filePath, key })
    expect(res.key).toEqual(key)
  })
})

describe('decrypt image', () => {
  test('async to base64 string', () => {
    imageEncrypt
      .decrypt({ filePath: encryptedFilePath, key })
      .then(b64 => expect( b64.substr(0, 10)).toEqual('data:image'))
  })

  test('sync to base64 string', () => {
    var b64 = imageEncrypt.decryptSync({ filePath: encryptedFilePath, key })
    var prefix = b64.substr(0, 10)
    expect(prefix).toEqual('data:image')
  })

  test('async to image file', () => {
    imageEncrypt
      .decryptTo({
        filePath: encryptedFilePath,
        key,
        destPath: outputPath
      })
      .then(res => {
        expect(fs.existsSync(res)).toBeTruthy()
      })
  })

  test('sync to image file', () => {
    var img = imageEncrypt.decryptToSync({
      filePath: encryptedFilePath,
      key,
      destPath: outputPath
    })

    expect(fs.existsSync(img)).toBeTruthy()
  })

  test('incorrect secret key', () => {
    expect(() => {
      imageEncrypt.decryptSync({
        filePath: encryptedFilePath,
        key: 'so78e/Gup5y/gQ9wtF2z/EYNmhnaGmtnWv2y45viVFM='
      })
    }).toThrow()
  })
})

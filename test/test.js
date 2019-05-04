var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')
var imageEncrypt = require('../lib')

var filePath = path.resolve(__dirname, 'src', 'wolf.jpg')
var encryptedFilePath = path.resolve(__dirname, 'src', 'image.ept')
var output = path.resolve(__dirname, 'output')
var key = 'so78e/GuQ1y/gQ9wtF2z/EYNmhnaGmtnWv2y45viVFM='

describe('async encrypt image', () => {
  beforeAll(() => {
    rimraf.sync(output)
    fs.mkdirSync(output)
  })

  test('do not spcecified destination directory', () => {
    imageEncrypt
      .encrypt({ filePath, key })
      .then(res => expect(fs.existsSync(res.destPath)).toBeTruthy())
      .catch(err => console.error(err))
  })

  // test('specified destination directory', () => {
  //   imageEncrypt
  //     .encrypt({ filePath, destDir: output })
  //     .then(res => expect(fs.existsSync(res.destPath)).toBeTruthy())
  //     .catch(err => console.error(err))
  // })
})

// describe('sync encrypt image', () => {
//   beforeAll(() => {
//     rimraf.sync(output)
//     fs.mkdirSync(output)
//   })

//   test('do not spcecified destination directory', () => {
//     var res = imageEncrypt.encryptSync({ filePath, key })
//     expect(fs.existsSync(res.destPath)).toBeTruthy()
//   })

//   test('spcecified destination directory', () => {
//     var res = imageEncrypt.encryptSync({ filePath, destDir: output })
//     expect(fs.existsSync(res.destPath)).toBeTruthy()
//   })
// })

// describe('async decrypt image', () => {
//   beforeAll(() => {
//     rimraf.sync(output)
//     fs.mkdirSync(output)
//   })

//   test('output base64 string', () => {
//     imageEncrypt
//       .decrypt({
//         filePath: encryptedFilePath,
//         key
//       })
//       .then(b64 => {
//         var prefix = b64.substr(0, 10)
//         expect(prefix).toEqual('data:image')
//       })
//   })

//   test('write image file', () => {
//     imageEncrypt
//       .decrypt({
//         filePath: encryptedFilePath,
//         key,
//         destDir: output
//       })
//       .then(res => expect(fs.existsSync(res)).toBeTruthy())
//   })
// })

describe('sync decrypt file', () => {
  // beforeAll(() => {
  //   rimraf.sync(output)
  //   fs.mkdirSync(output)
  // })

  // test('output base64 string', () => {
  //   var b64 = imageEncrypt.decryptSync({
  //     filePath: encryptedFilePath,
  //     key
  //   })
  //   var prefix = b64.substr(0, 10)
  //   expect(prefix).toEqual('data:image')
  // })

  // test('output image file', () => {
  //   var img = imageEncrypt.decryptSync({
  //     filePath: encryptedFilePath,
  //     key,
  //     destDir: output
  //   })
  //   expect(fs.existsSync(img)).toBeTruthy()
  // })
})

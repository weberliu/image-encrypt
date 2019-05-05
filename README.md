# image-encrypt

基于 Nacl 的图片文件加密。

## Installation

```yarn add image-encrypt```

## Documents

<dl>
<dt><a href="#encrypt">encrypt(options)</a> ⇒ <code>Object</code></dt>
<dd><p>异步方法，将图片加密后并返回字符串以及秘钥</p>
</dd>
<dt><a href="#encryptSync">encryptSync(options)</a> ⇒ <code>Object</code></dt>
<dd><p>同步方法，将图片加密后并返回字符串以及秘钥</p>
</dd>
<dt><a href="#encryptTo">encryptTo(options)</a> ⇒ <code>Object</code></dt>
<dd><p>异步方法，将图片加密后并保存文件</p>
</dd>
<dt><a href="#encryptToSync">encryptToSync(options)</a> ⇒ <code>Object</code></dt>
<dd><p>同步方法，将图片加密后并保存文件</p>
</dd>
<dt><a href="#decrypt">decrypt(options)</a> ⇒ <code>Promise</code></dt>
<dd><p>异步方法，将加密的图片文件解密并输出为 base64 字符串</p>
</dd>
<dt><a href="#decryptSync">decryptSync(options)</a> ⇒ <code>string</code></dt>
<dd><p>同步方法，将加密的图片文件解密并输出为 base64 字符串</p>
</dd>
<dt><a href="#decryptTo">decryptTo(options)</a> ⇒ <code>Promise</code></dt>
<dd><p>将加密后的图片文件解密并输出为文件</p>
</dd>
<dt><a href="#decryptToSync">decryptToSync(options)</a> ⇒ <code>string</code></dt>
<dd><p>同步方法，将加密后的图片文件解密并输出为文件</p>
</dd>
</dl>

<a name="encrypt"></a>

## encrypt(options) ⇒ <code>Object</code>
异步方法，将图片加密后并返回字符串以及秘钥

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 加密配置 |
| options.key | <code>string</code> | 加密的秘钥，可以为空 |
| options.filePath | <code>string</code> | 源文件路径 |

<a name="encryptSync"></a>

## encryptSync(options) ⇒ <code>Object</code>
同步方法，将图片加密后并返回字符串以及秘钥

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 加密配置 |
| options.key | <code>string</code> | 加密的秘钥，可以为空 |
| options.filePath | <code>string</code> | 源文件路径 |

<a name="encryptTo"></a>

## encryptTo(options) ⇒ <code>Object</code>
异步方法，将图片加密后并保存文件

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 加密配置 |
| options.key | <code>string</code> | 加密的秘钥，可以为空 |
| options.filePath | <code>string</code> | 源文件路径 |
| options.destPath | <code>string</code> | 加密后文件存储目录，默认为源文件相同目录 |

<a name="encryptToSync"></a>

## encryptToSync(options) ⇒ <code>Object</code>
同步方法，将图片加密后并保存文件

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 加密配置 |
| options.key | <code>string</code> | 加密的秘钥，可以为空 |
| options.filePath | <code>string</code> | 源文件路径 |
| options.destPath | <code>string</code> | 加密后文件存储目录，默认为源文件相同目录 |

<a name="decrypt"></a>

## decrypt(options) ⇒ <code>Promise</code>
异步方法，将加密的图片文件解密并输出为 base64 字符串

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 解密设置 |
| options.key | <code>string</code> | 加密时的秘钥 |
| options.filePath | <code>string</code> | 加密后的图片文件路径 |

<a name="decryptSync"></a>

## decryptSync(options) ⇒ <code>string</code>
同步方法，将加密的图片文件解密并输出为 base64 字符串

**Kind**: global function
**Returns**: <code>string</code> - 解密后的 base64 字符串

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 解密设置 |
| options.key | <code>string</code> | 加密时的秘钥 |
| options.filePath | <code>string</code> | 加密后的图片文件路径 |

<a name="decryptTo"></a>

## decryptTo(options) ⇒ <code>Promise</code>
将加密后的图片文件解密并输出为文件

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 解密设置项 |
| options.key | <code>string</code> | 加密时的秘钥 |
| options.filePath | <code>string</code> | 加密后的图片文件路径 |
| options.destPath | <code>string</code> | 解密后文件的存储目录的地址，默认为加密文件目录 |

<a name="decryptToSync"></a>

## decryptToSync(options) ⇒ <code>string</code>
同步方法，将加密后的图片文件解密并输出为文件

**Kind**: global function
**Returns**: <code>string</code> - 解密后的文件路径

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 解密设置项 |
| options.key | <code>string</code> | 加密时的秘钥 |
| options.filePath | <code>string</code> | 加密后的图片文件路径 |
| options.destPath | <code>string</code> | 解密后文件的存储目录的地址，默认为加密文件目录 |
import CryptoJS from 'crypto-js'
import { aesKey as key, iv } from '../config/default'
const aesKey = CryptoJS.enc.Utf8.parse(key);
const aesIv = CryptoJS.enc.Utf8.parse(iv);

// 加密
export function Encrypt (word: string) {
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypt = CryptoJS.AES.encrypt(srcs, aesKey, {
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.AnsiX923,
        iv: aesIv
    })
    return encrypt.ciphertext.toString().toLocaleUpperCase()
}

// 解密
export function Decrypt(word: string) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(srcs, aesKey, {
        iv: aesIv,
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.AnsiX923
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

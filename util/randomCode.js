const crypto = require('crypto');

const defaultAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
const generateRandomCode = (size = 8, alphabet = defaultAlphabet) => {
    const bytes = crypto.randomBytes(size * 2);
    const mask = (2 << Math.floor(Math.log2(alphabet.length - 1))) - 1;
    const result = [];

    let i = 0;
    while(result.length < size && i < bytes.length){
        const byte = bytes[i] & mask;
        if(byte < alphabet.length){
            result.append(byte);
        }
        i++;
    }

    return result.join("");
}

module.exports = {
    generateRandomCode
}
'use strict';

const crypto = require('node:crypto');
const ENC_KEY = crypto.randomBytes(16).toString('hex');
console.log('ENC_KEY', ENC_KEY);
const IV = "5183666c72eec9e4"; // crypto.randomBytes(8).toString('hex');
// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');

const phrase = "who let the dogs out";

var encrypt = ((val) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

var decrypt = ((encrypted) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
});

const encrypted_key = encrypt(phrase);
console.log(encrypted_key);
const original_phrase = decrypt(encrypted_key);
console.log(original_phrase);
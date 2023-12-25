import crypto from 'crypto';
import fs from 'fs/promises';
import asyncHandler from '../utils/asyncHandler.utils.js';
import ApiError from '../utils/ApiError.utils.js';
import { json } from 'express';

const decryptDataHandler = asyncHandler(async (req, _, next) => {
    try {
        const receivedNonce = Buffer.from(req.body.nonce, 'base64');
        const receivedTag = Buffer.from(req.body.tag, 'base64');
        const receivedCiphertext = Buffer.from(req.body.ciphertext, 'base64');
        const receivedEncAESKey = Buffer.from(req.body.encryptedaeskey, 'base64');

        // Await the result of fs.readFile to get the private key
        const private_key = await fs.readFile('src/keys/private_key.pem', 'utf-8');

        // Decode Base64 to get the AES key
        const aes_key = crypto.privateDecrypt({ key: private_key }, receivedEncAESKey);

        // Check key length
        if (aes_key.length !== 32) {
            throw new ApiError(401, 'Invalid AES key length from client !!!');
        }

        const decipher = crypto.createDecipheriv('aes-256-gcm', aes_key, receivedNonce);
        decipher.setAuthTag(receivedTag);

        const decryptedChunks = [];
        decryptedChunks.push(decipher.update(receivedCiphertext));
        decryptedChunks.push(decipher.final());

        const decrypted = Buffer.concat(decryptedChunks).toString('utf-8');

        req.body = JSON.parse(decrypted)
        next()
    } catch (error) {
        throw new ApiError(500, 'Something went wrong while Decrpyting the data !!!')
    }
})

export default decryptDataHandler;

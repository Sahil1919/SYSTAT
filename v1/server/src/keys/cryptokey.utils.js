import crypto from 'crypto';
import fs from 'fs/promises';

const generateKeyPair = async () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });

  try {
    // Save the public key to a file (this can be shared with clients)
    await fs.writeFile('src/keys/public_key.pem', publicKey);

    // Save the private key securely (do not share this with clients)
    await fs.writeFile('src/keys/private_key.pem', privateKey);

    console.log('Server key pair generated and saved successfully!');
  } catch (error) {
    console.error('Error saving server keys:', error);
  }
};

generateKeyPair();

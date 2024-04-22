from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.Random import get_random_bytes
import base64
import os

current_path = os.path.dirname(__file__)


class DataEncryption:

    def __init__(self, data_to_encrypt: str) -> dict:

        with open(f"{current_path}/public_key.pem", 'rb') as f:
            public_key = RSA.import_key(f.read())

        self.public_key = public_key
        self.data_to_encrypt = data_to_encrypt

        # Generate a random AES key
        self.aes_key = get_random_bytes(128)

        # Encrypt data with AES
        nonce, tag, ciphertext = self.encrypt_data()

        # Encrypt AES key with RSA public key
        enc_aes_key = self.encrypt_aes_key()

        # Encrypt data with AES
        self.encrypted_data = {
            "nonce": base64.b64encode(nonce).decode('utf-8'),
            "tag": base64.b64encode(tag).decode('utf-8'),
            "ciphertext": base64.b64encode(ciphertext).decode('utf-8'),
            "encryptedaeskey": base64.b64encode(enc_aes_key).decode('utf-8')
        }

    def encrypt_data(self):
        cipher = AES.new(self.aes_key, AES.MODE_GCM)
        ciphertext, tag = cipher.encrypt_and_digest(self.data_to_encrypt.encode('utf-8'))
        nonce = cipher.nonce
        return nonce, tag, ciphertext

    # Encrypt AES key with RSA public key
    def encrypt_aes_key(self):
        cipher_rsa = PKCS1_OAEP.new(self.public_key)
        enc_aes_key = cipher_rsa.encrypt(self.aes_key)
        return enc_aes_key


if __name__ == "__main__":
    message = "Sahil Shaikh"
    encrypted_data = DataEncryption(message)
    print(encrypted_data)
    # print(os.path.dirname(os.path.abspath(__file__)))
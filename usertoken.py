#!/usr/bin/env python3

import json
from base64 import b64decode
from secrets import token_urlsafe
from urllib.parse import urlencode

from Cryptodome.Cipher import PKCS1_v1_5
from Cryptodome.PublicKey import RSA
from Cryptodome.Random import get_random_bytes

def generate_devforum_key():
    key = RSA.generate(2048)
    public_key_raw = key.publickey().export_key().decode('utf-8')

    host = "https://devforum.roblox.com"
    path = "/user-api-key/new"
    
    query_dict = {
        "application_name": "HandbookGithubCI",
        "client_id": token_urlsafe(16),
        "scopes": "write",
        "public_key": public_key_raw,
        "nonce": token_urlsafe(8),
    }
    
    url = f"{host}{path}?{urlencode(query_dict)}"
    
    print(f"\nOpen the URL to authorize (make sure you're logged into HandbookPET!):\n\n{url}\n")
    ciphertext = input("Paste the Ciphertext: ").strip()

    sentinel = get_random_bytes(16)
    cipher_rsa = PKCS1_v1_5.new(key)
    
    try:
        decrypted_bytes = cipher_rsa.decrypt(b64decode(ciphertext), sentinel)
        plaintext_json = json.loads(decrypted_bytes.decode('utf-8'))
        
        print("\nSuccess, User API Key:")
        print(plaintext_json["key"])
        
    except Exception as e:
        print(f"\nError: {e}")

if __name__ == "__main__":
    generate_devforum_key()
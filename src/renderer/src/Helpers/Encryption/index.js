export const generateRSAKeyPair = async () => {
    // Generate RSA key pair
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048, // Length of the key in bits
            publicExponent: new Uint8Array([1, 0, 1]), // 65537
            hash: { name: "SHA-256" }, // Hash function to use
        },
        true, // Whether the key is extractable
        ["encrypt", "decrypt"] // Key usages
    );

    // Export the keys to string format
    const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    const publicKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(publicKey)));
    const privateKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(privateKey)));
  
    // Convert Base64 keys to PEM format
    const publicKeyString = `-----BEGIN PUBLIC KEY-----\n${publicKeyBase64.match(/.{1,64}/g).join('\n')}\n-----END PUBLIC KEY-----`;
    const privateKeyString = `-----BEGIN PRIVATE KEY-----\n${privateKeyBase64.match(/.{1,64}/g).join('\n')}\n-----END PRIVATE KEY-----`;

    return { publicKey: publicKeyString, privateKey: privateKeyString };
}
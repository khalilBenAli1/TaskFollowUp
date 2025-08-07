import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
  private key: Buffer;

  constructor() {
    const base64Key = process.env.CRYPT_KEY || '';
    this.key = Buffer.from(base64Key, 'base64');
  }

  async encrypt(plain: string): Promise<string> {
    try {
      const iv = randomBytes(16);
      const cipher = createCipheriv('aes-256-gcm', this.key, iv);
      const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
      const tag = cipher.getAuthTag();
      return Buffer.concat([iv, tag, encrypted]).toString('base64');
    } catch (err) {
      throw err;
    }
  }

  async decrypt(payload: string): Promise<string> {
    try {
      const data = Buffer.from(payload, 'base64');
      const iv = data.subarray(0, 16);
      const tag = data.subarray(16, 32);
      const encrypted = data.subarray(32);
      const decipher = createDecipheriv('aes-256-gcm', this.key, iv);
      decipher.setAuthTag(tag);
      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
      return decrypted.toString('utf8');
    } catch (err) {
      throw err;
    }
  }
}

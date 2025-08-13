import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CryptoJS from 'crypto-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str:any) {
  return str.replace(/^\w/, (c:any) => c.toUpperCase());
}

// Function to decrypt the encrypted data
export const decryptData = (encryptedData:any) => {
  const [ivHex, encryptedHex] = encryptedData.split(':');

  // Parse the IV and the encrypted data (both are in hex format)
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);
  console.log(process.env.ENCODE_PAYMENT_VERIFIED_PAYLOAD_SECRET)
  // Convert the secret key to a WordArray using CryptoJS
  // Get the secret key from the environment variables
  const secretKey = process.env.NEXT_PUBLIC_ENCODE_PAYMENT_VERIFIED_PAYLOAD_SECRET;
  if (secretKey === undefined) return;
  const key = CryptoJS.enc.Hex.parse(secretKey); // Parse the secret key from hex

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: encrypted,
  });
  
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Return the decrypted data as a UTF-8 string
  return decrypted.toString(CryptoJS.enc.Utf8);
};


export const formatDateInNepaliTimezone = (dateString: string, showTime: boolean = true) => {
  // First convert to UTC to ensure consistent handling
  const utcDate = new Date(dateString);

  // Define formatting options
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // "Thu"
    year: 'numeric',  // "2025"
    month: 'short',   // "Mar"
    day: 'numeric',   // "27"
    timeZone: 'Asia/Kathmandu',
  };

  if (showTime) {
    Object.assign(dateOptions, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Show AM/PM format
    });
  }

  // Format date based on options
  return utcDate.toLocaleString('en', dateOptions);
};

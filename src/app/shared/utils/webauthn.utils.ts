/**
 * WebAuthn utility functions for base64url encoding/decoding
 */

export function base64urlToUint8array(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function uint8arrayToBase64url(bytes: Uint8Array): string {
  const binary = String.fromCharCode(...bytes);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function initialCheckStatus(response: Response): Promise<any> {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}

export function displayError(error: any): void {
  console.error('WebAuthn Error:', error);
}

export function followRedirect(response: Response): void {
  if (response.ok) {
    console.log('Registration successful');
    // Handle successful registration
  } else {
    throw new Error(`Registration failed: ${response.statusText}`);
  }
}
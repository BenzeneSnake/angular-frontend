/**
 * WebAuthn Types for better TypeScript support
 */

export interface WebAuthnCredentialCreationOptions {
  publicKey: {
    challenge: Uint8Array;
    rp: {
      name: string;
      id?: string;
    };
    user: {
      id: Uint8Array;
      name: string;
      displayName: string;
    };
    pubKeyCredParams: Array<{
      type: string;
      alg: number;
    }>;
    authenticatorSelection?: {
      authenticatorAttachment?: string;
      userVerification?: string;
      requireResidentKey?: boolean;
    };
    timeout?: number;
    excludeCredentials?: Array<{
      type: string;
      id: Uint8Array;
      transports?: string[];
    }>;
    extensions?: any;
  };
}

export interface WebAuthnEncodedCredential {
  type: string;
  id: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
    transports: string[];
  };
  clientExtensionResults: any;
}

export interface FIDORegistrationResponse {
  publicKey: {
    challenge: string;
    rp: {
      name: string;
      id?: string;
    };
    user: {
      id: string;
      name: string;
      displayName: string;
    };
    pubKeyCredParams: Array<{
      type: string;
      alg: number;
    }>;
    authenticatorSelection?: any;
    timeout?: number;
    excludeCredentials?: Array<{
      type: string;
      id: string;
      transports?: string[];
    }>;
    extensions?: any;
  };
}
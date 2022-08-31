/* eslint-disable camelcase */

declare global {
  export type GoogleTokenClientConfig = {
    client_id?: string;
    scope?: string;
  };

  export type GoogleTokenClientCallbackResponse = {
    access_token: string;
  };

  export type GoogleTokenClient = {
    requestAccessToken: () => void;
    callback?: (response: GoogleTokenClientCallbackResponse) => void;
  };

  export interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (
            config: GoogleTokenClientConfig
          ) => GoogleTokenClient;
        };
      };
    };
  }
}

export {};

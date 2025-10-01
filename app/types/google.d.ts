// Type definitions for Google API
declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      auth2: {
        init: (config: { client_id: string }) => void;
        getAuthInstance: () => {
          isSignedIn: {
            get: () => boolean;
          };
          signIn: () => Promise<unknown>;
          currentUser: {
            get: () => {
              getAuthResponse: () => {
                access_token: string;
              };
            };
          };
        };
      };
    };
  }
}

export {};
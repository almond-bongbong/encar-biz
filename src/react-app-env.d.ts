/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface Process {
    /** running on server */
    isServer: boolean;
  }
  interface ProcessEnv {
    /** node environment */
    NODE_ENV: string;
    REACT_APP_API_URL: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_PORT:string;
  readonly VITE_LAN_API_URL: string;
  readonly VITE_LAN_API_PORT:string;
  // add more env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

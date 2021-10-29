interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

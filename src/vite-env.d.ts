/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional override; default `aideazz.hashnode.dev` for live post sync */
  readonly VITE_HASHNODE_HOST?: string;
}

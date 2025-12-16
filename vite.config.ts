import { defineConfig, mergeConfig, UserConfig } from "vite";
import { vueConfig } from "@nativescript/vite";

export default defineConfig(({ mode }: { mode: string }): UserConfig => {
  const VIRTUAL_CHROMA_ID = "virtual:chroma-js-compat";
  const RESOLVED_VIRTUAL_CHROMA_ID = `\0${VIRTUAL_CHROMA_ID}`;

  const chromaPlugin = {
    name: "chroma-js-compat",
    enforce: "pre",
    resolveId(id: string, importer?: string) {
      if (id === "chroma-js") {
        if (importer === RESOLVED_VIRTUAL_CHROMA_ID) {
          return null;
        }
        return RESOLVED_VIRTUAL_CHROMA_ID;
      }
      return null;
    },
    load(id: string) {
      if (id === RESOLVED_VIRTUAL_CHROMA_ID) {
        return `
import * as chromaNs from 'chroma-js';
const __defaultKey = 'default';
const __cjsKey = 'module.exports';
const __requireKey = '__require';
const chroma =
  (chromaNs && typeof chromaNs[__requireKey] === 'function' && chromaNs[__requireKey]()) ||
  (chromaNs && chromaNs[__defaultKey]) ||
  (chromaNs && chromaNs[__cjsKey]) ||
  chromaNs;
export default chroma;
`;
      }
      return null;
    },
  };

  const VIRTUAL_BASE64URL = "virtual:base64-url-compat";
  const RESOLVED_VIRTUAL_BASE64URL_ID = `\0${VIRTUAL_BASE64URL}`;

  const base64urlPlugin = {
    name: "base64-url-compat",
    enforce: "pre",
    resolveId(id: string, importer?: string) {
      if (id === "base64-url") {
        if (importer === RESOLVED_VIRTUAL_BASE64URL_ID) {
          return null;
        }
        return RESOLVED_VIRTUAL_BASE64URL_ID;
      }
      return null;
    },
    load(id: string) {
      if (id === RESOLVED_VIRTUAL_BASE64URL_ID) {
        return `
import * as base64Mod from 'base64-url';
const __defaultKey = 'default';
const __cjsKey = 'module.exports';
const __requireKey = '__require';
const base64url =
  (base64Mod && typeof base64Mod[__requireKey] === 'function' && base64Mod[__requireKey]()) ||
  (base64Mod && base64Mod[__defaultKey]) ||
  (base64Mod && base64Mod[__cjsKey]) ||
  base64Mod;
export default base64url;
`;
      }
      return null;
    },
  };
  return mergeConfig(vueConfig({ mode }), {
    plugins: [chromaPlugin, base64urlPlugin],
    optimizeDeps: {
      include: ["chroma-js", "base64-url"],
    },
  });
});

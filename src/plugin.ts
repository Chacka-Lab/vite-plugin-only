import type { Plugin } from 'vite';

export default function serverClientOnly(): Plugin {
  return {
    name: 'server-client-only',
    enforce: 'pre',
    resolveId(id, importer, { ssr }) {
      if (id === 'server-only') {
        if (!ssr)
          this.error(
            `"server-only" module was imported in [${importer}]. This file must only run on the server.`,
          );
      } else if (id === 'client-only') {
        if (ssr)
          this.error(
            `"client-only" module was imported in [${importer}]. This file must only run in the browser.`,
          );
      } else {
        return null;
      }
      return '\0server-client-only';
    },
    load(id) {
      if (id === '\0server-client-only') return 'export {}';
    },
  };
}

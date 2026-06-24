# vite-plugin-only

Build-time `server-only` and `client-only` module boundaries for Vite.

Prevents server-side modules (secrets, DB credentials, Node-only APIs) from accidentally leaking into the client
bundle — with a clear build error, not a silent runtime failure.

## Install

```bash
pnpm add -D vite-plugin-only
```

## Usage

### 1. Add the Vite plugin

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import serverClientOnly from "vite-plugin-only";

export default defineConfig({
  plugins: [
    serverClientOnly(),
  ],
});
```

### 2. Add type declarations

```typescript
// src/global.d.ts
/// <reference types="vite-plugin-only/env" />
```

### 3. Guard your modules

```typescript
// src/lib/db.ts
import "server-only"; // build error if imported from client code

export const db = drizzle(pool);
```

```typescript
// src/components/Canvas.tsx
import "client-only"; // build error if imported from server code
```

## How it works

The Vite plugin intercepts `server-only` and `client-only` imports via `resolveId`. If the wrong environment tries to
import them, the build fails immediately with a descriptive error — no runtime surprises.

## License

MIT
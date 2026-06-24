import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: true,
  entry: ['./src/plugin.ts', './src/env.d.ts'],
});

import json from "@rollup/plugin-json";
import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
    input: 'src/index-custom.js',
    output: {
      file: 'kute-magoreal.js',
      format: 'umd',
      exports: 'default',
      // external: ['moment']
      name: 'KUTE',
      compact: true
    },
    plugins: [
      nodeResolve(),
        json(),      // <---- put after commonjs
    ]
  };
  
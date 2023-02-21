import { defineConfig, loadEnv } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
    fs: {
      // throws an error without this when importing Fira font
      allow: ['..', 'node_modules/@fontsource/fira-code']
    },
    proxy: {},
    port: 5174,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  },
  define: {
    '__SERVER_VERSION__': JSON.stringify(process.env.npm_package_version),
  },
};


// export default config;
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.env.npm_package_version, '')
  console.log(env.npm_package_version)
  return {
    // vite config
    plugins: [sveltekit()],
    test: {
      include: ['src/**/*.{test,spec}.{js,ts}']
    },
    server: {
      fs: {
        // throws an error without this when importing Fira font
        allow: ['..', 'node_modules/@fontsource/fira-code']
      },
      proxy: {},
      port: 5174,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    },
    define: {
      __APP_ENV__: env.APP_ENV,
      __SERVER_VERSION__: JSON.stringify(env.npm_package_version)
    },
    worker: {
      format: 'es',

    }
  }
})

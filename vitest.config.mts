import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    // This allows `vitest` to work with TypeScript
    plugins: [tsconfigPaths()],
    test: {
        // This is simulates a Js Dom environment to run the tests
        // As this is the environment the application will go live
        // Is the place we need to simulate it
        environment: 'jsdom',
        // This exclude other tests available that are no interesting to us right now
        // We only want to run the tests we are writing
        exclude: ['**/node_modules/**', '**/test/**', 'playwright-report/**', 'test-results/**'],
        // Tells vitest to use the dependencies instead of mocking them
        deps: {
            inline: ['wagmi', '@wagmi/core']
        }
    },
});
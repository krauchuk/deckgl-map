export default {
  root: 'src',
  envDir: '../',
  build: {
    outDir: '../dist',
  },
  optimizeDeps: {
    esbuildOptions: { target: 'es2020' },
  },
  server: {
    open: true,
    port: 8080,
  },
}

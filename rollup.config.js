import babel from 'rollup-plugin-babel';

export default [{
  input: 'src/index.js',
  output: {
    name: 'karas',
    file: 'index.es.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      runtimeHelpers: true
    }),
  ],
}];

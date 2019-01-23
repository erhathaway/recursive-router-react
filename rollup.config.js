import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
// import minify from 'rollup-plugin-babel-minify';

const dependencies = Object.keys({
  ...require('./package.json').dependencies,
  ...require('./package.json').peerDependencies,
});

export default {
  input: 'src/index.js',
  external: ['react'],
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      globals: {
        react: 'React',
      },
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      globals: {
        react: 'React',
      },
    },
  ],
  plugins: [
    // eslint({}),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      babelrc: true,
    }),
    // minify({
    //   comments: false,
    //   sourceMap: false,
    // }),
  ],
};

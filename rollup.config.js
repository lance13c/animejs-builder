import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from "rollup-plugin-uglify";

export default [{
  input: 'src/js/AnimeBuilder.js',
  output: {
    file: 'lib/AnimeBuilder.mjs',
    format: 'cjs',
    sourceMap: true,
    name: 'AnimeBuilder',
    external: ['anime'],
    global: 'AnimeBuilder'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    }),
    resolve({
      browser: true,
      jail: 'src/'
    }),
    commonjs()
  ]
},
{
  input: 'src/js/AnimeBuilder.js',
  output: {
    file: 'lib/AnimeBuilder.es.js',
    format: 'es',
    sourceMap: true,
    name: 'AnimeBuilder',
    external: ['anime'],
    global: 'AnimeBuilder'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    }),
    resolve({
      browser: true,
      jail: 'src/'
    }),
  ]
},
{
  input: 'src/js/AnimeBuilder.js',
  output: {
    file: 'lib/AnimeBuilder.js',
    format: 'umd',
    sourceMap: true,
    name: 'AnimeBuilder',
    external: ['animejs'],
    globals: {
      'animejs': 'anime'
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    }),
    resolve({
      jail: 'src/'
    })
  ]
},
{
  input: 'src/js/AnimeBuilder.js',
  output: {
    file: 'lib/AnimeBuilder.min.js',
    format: 'umd',
    sourceMap: true,
    name: 'AnimeBuilder',
    external: ['animejs'],
    globals: {
      'animejs': 'anime'
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    }),
    uglify(),
    resolve({
      jail: 'src/'
    })
  ]
},
{
  input: 'src/js/AnimeBuilder.js',
  output: {
    file: 'lib/AnimeBuilder.iife.js',
    format: 'iife',
    sourceMap: true,
    name: 'AnimeBuilder',
    external: ['animejs'],
    globals: {
      'animejs': 'anime'
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    }),
    resolve({
      jail: 'src/'
    })
  ]
},
{
  input: 'src/js/AnimeBuilder.js',
  output: {
    file: 'lib/AnimeBuilder.iife.min.js',
    format: 'iife',
    sourceMap: true,
    name: 'AnimeBuilder',
    external: ['animejs'],
    globals: {
      'animejs': 'anime'
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    }),
    uglify(),
    resolve({
      jail: 'src/'
    })
  ]
},
{
  input: 'src/js/AnimeBuilder.js',
  output: {
    file: 'lib/AnimeBuilder.es.js',
    format: 'esm',
    sourceMap: true,
    name: 'AnimeBuilder',
    external: ['animejs'],
    globals: {
      'animejs': 'anime'
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    }),
    resolve({
      jail: 'src/'
    })
  ]
},
];
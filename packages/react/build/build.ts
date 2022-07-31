import path from 'path'
import consola from 'consola'
import colors from 'picocolors'
import { build } from 'esbuild'
import GlobalsPlugin from 'esbuild-plugin-globals'
// import vue from 'unplugin-vue/esbuild'
import { emptyDir } from 'fs-extra'
import type { BuildOptions, Format } from 'esbuild'
import { version } from '../package.json'
import { pathOutput, pathSrc } from './paths'

const buildBundle = async () => {
  const getBuildOptions = (format: Format) => {
    const options: BuildOptions = {
      entryPoints: [
        path.resolve(pathSrc, 'index.ts'),
        path.resolve(pathSrc, 'global.ts')
      ],
      target: 'es2018',
      platform: 'neutral',
      plugins: [
        vue({
          isProduction: true
        })
      ],
      bundle: true,
      format,
      minifySyntax: true,
      banner: {
        js: `/*! Sure UI Icons Vue v${version} */\n`
      },
      outdir: pathOutput
    }
    if (format === 'iife') {
      options.plugins!.push(
        GlobalsPlugin({
          vue: 'Vue'
        })
      )
      options.globalName = 'SureIconsVue'
    } else {
      options.external = ['vue']
    }

    return options
  }
  const doBuild = async (minify: boolean) => {
    await Promise.all([
      build({
        ...getBuildOptions('esm'),
        entryNames: `[name]${minify ? '.min' : ''}`,
        minify,
        sourcemap: minify
      }),
      build({
        ...getBuildOptions('iife'),
        entryNames: `[name].iife${minify ? '.min' : ''}`,
        minify,
        sourcemap: minify
      }),
      build({
        ...getBuildOptions('cjs'),
        entryNames: `[name]${minify ? '.min' : ''}`,
        outExtension: { '.js': '.cjs' },
        minify,
        sourcemap: minify
      })
    ])
  }

  return Promise.all([doBuild(true), doBuild(false)])
}

const run = async () => {
  consola.info(colors.blue('cleaning dist...'))
  await emptyDir(pathOutput)
  consola.info(colors.blue('building...'))
  await buildBundle()
}

run()

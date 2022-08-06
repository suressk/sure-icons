import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import { emptyDir, ensureDir } from 'fs-extra'
import consola from 'consola'
import camelcase from 'camelcase'
import glob from 'fast-glob'
import { format } from 'prettier'
import colors from 'picocolors'
import findWorkspaceDir from '@pnpm/find-workspace-dir'
import findWorkspacePackages from '@pnpm/find-workspace-packages'
import type { BuiltInParserName } from 'prettier'
import { pathComponents } from './paths'

// consola.warn(colors.red('[sure-icon]'), pathComponents)

const getSvgFiles = async () => {
  const pkgs = await
  (findWorkspacePackages as typeof findWorkspacePackages)(
    (await findWorkspaceDir(process.cwd()))!
  )
  const pkg = pkgs.find(
    pkg => pkg.manifest.name === 'sure-icons-svg'
  )!
  return glob('*.svg', { cwd: pkg.dir, absolute: true })
}

const getName = (file: string) => {
  const filename = path.basename(file).replace('.svg', '')
  // => 大驼峰命名
  const camelcaseName = camelcase(filename, { pascalCase: true })
  // const componentName = camelcase(filename, { pascalCase: true })
  return {
    filename: camelcaseName,
    componentName: camelcaseName
  }
}

const formatCode = (
  code: string,
  parser: BuiltInParserName = 'typescript'
) => format(code, {
  parser,
  semi: false,
  singleQuote: true,
  trailingComma: 'none'
})

/*
<script setup lang="ts">
defineOptions({
  name: '${componentName}',
  inheritAttrs: false
})
</script>
*/
const transformToVueComponent = async (file: string) => {
  const content = await readFile(file, 'utf-8')
  const { filename, componentName } = getName(file)
  const vue = formatCode(
`
<script lang="ts">
import type { DefineComponent } from 'vue'
export default ({
  name: '${componentName}',
  inheritAttrs: false
}) as DefineComponent
</script>

<template>
  ${content}
</template>`,
'vue'
  )
  writeFile(path.resolve(pathComponents, `${filename}.vue`), vue, 'utf-8')
}

const generateEntry = async (files: string[]) => {
  const code = formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file)
        return `export { default as ${componentName} } from './${filename}.vue'`
      })
      .join('\n')
  )
  await writeFile(path.resolve(pathComponents, 'index.ts'), code, 'utf-8')
}

const run = async () => {
  consola.info(colors.blue('generating vue components'))
  await ensureDir(pathComponents)
  await emptyDir(pathComponents)
  const files = await getSvgFiles()

  consola.info(colors.blue('generating vue files'))
  await Promise.all(files.map(file => transformToVueComponent(file)))

  consola.info(colors.blue('generating entry file'))
  await generateEntry(files)
}

run()


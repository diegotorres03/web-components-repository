#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises'
import { Command } from 'commander'

import * as CreateProjectFolder from './bin/projectTools.js'
import { exec } from 'child_process'

const program = new Command()

program
  .name('dwck')
  .description("A CLI for Diego's Web Components Kit (DWCK)")
  .version('0.0.1')

program
  .command('project')
  .argument('<name>', 'Name of the project to create')
  .description('Create a new DWCK project')
  .action((name) => {
    console.log(`Creating a new DWCK project called ${name}`)
    CreateProjectFolder.createDwckProjectFolder(name)
    // [ ] Create a new index.html file with the name of the project
  })

program
  .command('element')
  .argument('<name>', 'Name of the element to create')
  .option('-t, --type <type>', 'Type of element to create') // Instead of creating a new element in the elements folder, this creates a new element in its type folder (e.g. components, layouts, etc.)
  .option('-r, --root', 'Create the new element on the execution folder instead of looking for the elements folder')
  .description('Create a new DWCK element')
  .action((name, options) => {
    console.log(`Creating a new DWCK element called ${name}`)
    console.log(`Options: ${JSON.stringify(options)}`)
  })


async function selectIndexFile(name) {
  const indexHtml = await readFile(`./index.${name}.html`, 'utf-8')
  console.log(indexHtml)
  await writeFile(`./index.html`, indexHtml)
}

program
  .command('serve')
  .argument('<name>', 'Name of the index file to run, like index.app1.html')
  .description('run a specific index.<name>.html so you can have multiple versions in a single file')
  .action(async (name, options) => {
    console.log('name, options', name, options)
    await selectIndexFile(name)
    exec('npm run serve', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log(`stdout: ${stdout}`)
    })
  })

program.parse(process.argv)

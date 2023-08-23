#!/usr/bin/env node

import { readFile, writeFile, rm, } from 'fs/promises'
import { Command } from 'commander'

import * as CreateProjectFolder from './bin/projectTools.js'
import { exec } from 'child_process'
// import {version} from './package.json'
import { readFileSync } from 'fs'



const version = '1.1.3'
// const { version } = JSON.parse(readFileSync('./package.json'))

const program = new Command()

program
  .name('dwck')
  .description("A CLI for Diego's Web Components Kit (DWCK)")
  .version(version)

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
  await rm('./index.html', { force: true })
  await exec(`ln -s ./index.${name}.html ./index.html`)
}

program
  .command('serve')
  .argument('<name>', 'Name of the index file to run, like index.app1.html')
  .description(`run a specific index.<name>.html
so you can have multiple versions of your application 
runnung single index.html.
They way it works is when a file is selected, an ln -s
command run to create a link to the selected file.
`)
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

// [ ] Add command to update components library


program.parse(process.argv)

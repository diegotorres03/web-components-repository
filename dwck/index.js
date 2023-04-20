#!/usr/bin/env node

import { Command } from 'commander'

import * as CreateProjectFolder from './bin/projectTools.js'

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

program.parse(process.argv)

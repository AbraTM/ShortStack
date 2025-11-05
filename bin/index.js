#!/usr/bin/env node

const { program } = require('commander');

console.log("ShortStack");

program
  .option('-u, --url <string>', 'URL to shorten')
  .option('-c, --custom-code <string>', 'Custom Short Code')
  .option('-t, --tags <string...>', 'Tags for the link');

program.parse(process.argv);

const options = program.opts();
console.log("Options : ", options);


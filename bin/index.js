#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');

const API_URL = "http://localhost:5000";

// CLI Banner
function showBanner(){
  console.clear();
  const ascii_art = figlet.textSync('ShortStack', {
	font: "Standard",
	horizontalLayout: "default",
	verticalLayout: "default",
  });

  console.log(gradient.rainbow.multiline(ascii_art));
  console.log(chalk.bold.magentaBright(`                A Personal CLI based URL Shortener and Click Ananlytics\n\n`));
}

// CLI Interface
program
  .name('shortstack')
  .description('Personal URL Shortener and Click Analytics.')
  .version('0.0.1')
  .showHelpAfterError('(use --help for available options)');


// URL Shortening Command
program
  .command('shorten')
  .description('Shortens a given URL.')
  .requiredOption('-u, --url <string>', 'URL to shorten')
  .option('-c, --custom-code <string>', 'Custom Short Code')
  .option('-t, --tags <string...>', 'Tags for the link')
  .action(() => {
	console.log("Shortening....");
  });


// Show a URL's Stats
program
  .command('stats')
  .description('Shows Clicks and other Stats for a short URL.')
  .requiredOption('-u, --url <string>', 'Short Code')
  .action(() => {
	console.log("Stats....");
  });


// List out all the shortened URLs
program
  .command('list')
  .description('List all shortened URLs')
  .action(() => {
	console.log("List out....");
  });


if(process.argv.length <= 2){
  showBanner();
  program.outputHelp();
} else {
  program.parse(process.argv);
}


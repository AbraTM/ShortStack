#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const gradient = require("gradient-string").default;

const API_URL = "http://localhost:5000";

// CLI Banner
function showBanner() {
  console.clear();
  const ascii_art = figlet.textSync("ShortStack", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  });
  const customGradient = gradient("#FFFFFF", "#d397fa", "#8364e8");
  console.log(customGradient.multiline(ascii_art));
  console.log(
    chalk.magentaBright(
      `                A Personal CLI based URL Shortener and Click Ananlytics\n`,
    ),
  );
}

// CLI Interface
program
  .name("shortstack")
  .version("0.0.1")
  .showHelpAfterError("(use --help for available options)\n\n")

// Test
program
  .command("test")
  .action(async() => {
    const response = await fetch(`${API_URL}`);
    const data = response.json();
    console.log(data);
  })


// URL Shortening Command
program
  .command("shorten")
  .description("Shortens a given URL.")
  .requiredOption("-u, --url <string>", "URL to shorten")
  .option("-c, --custom-code <string>", "Custom Short Code")
  .option("-t, --tags <string...>", "Tags for the link")
  .action(async (options) => {
    const response = await fetch(`${API_URL}/permURL`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: options.url,
        customCode: options.customCode,
        tags: options.tags,
      }),
    });
    const data = await response.json();
    
    // Displaying the Shortened Link
    console.log(`Shortened Link : ${data.url}`);
    console.log(options);
  });

// Show a URL's Stats
program
  .command("stats")
  .description("Shows Clicks and other Stats for a short URL.")
  .requiredOption("-u, --url <string>", "Short Code")
  .action(async (options) => {
    const url = options.url.split("/");
    const code = url[url.length - 1];
    const response = await fetch(`${API_URL}/stats/${code}`);
    const data = await response.json();
  
    console.log(data);
  });

// List out all the shortened URLs
program
  .command("list")
  .description("List all shortened URLs")
  .action(async() => {
      const response = await fetch(`${API_URL}/stats/all`);
      const data = await response.json();

      console.log(data);
  });

if (process.argv.length <= 2) {
  showBanner();
  program.outputHelp();
} else {
  program.parse(process.argv);
}

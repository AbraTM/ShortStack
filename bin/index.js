#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const gradient = require("gradient-string").default;
const { table } = require('table');

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
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const formatDate = (date, withDay) => {
  const d = new Date(Number(date));
  return withDay ? 
    `${days[d.getDay()]}, ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
    : `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
}
const tableConfig = {
  columns: [
    {
      alignment: "center",
    },
    {
      alignment: "center"
    },
    {
      alignment: "center"
    },
    {
      alignment: "center"
    },
  ],
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,

    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,

    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,

    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  }
}

program
  .command("stats")
  .description("Shows Clicks and other Stats for a short URL.")
  .requiredOption("-u, --url <string>", "Short Code")
  .action(async (options) => {
    const url = options.url.split("/");
    const code = url[url.length - 1];
    const response = await fetch(`${API_URL}/stats/${code}`);
    const json_res = await response.json();

    const data = json_res.data;
    const statsTableHeadings = ["Original URL", "Click", " Unique Visitors", "Last Visited"];
    const statsTableData = [data.url, data.clicks, data.unique_visitors, formatDate(data.last_visited, false)];
    const coloredStatsTableHeadings = statsTableHeadings.map((h) => chalk.cyanBright.bold(h));
    const coloredStatsTableData = statsTableData.map((d) => chalk.gray(d));
    const statsTable = [
      coloredStatsTableHeadings,
      coloredStatsTableData
    ];
    const heading = figlet.textSync("Stats", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    });

    // Display the Stats
    console.log(chalk.cyanBright.bold(heading))
    console.log(chalk.cyanBright.bold(`For Shortend URL: ${options.url}\n\n`));
    console.log(table(statsTable, tableConfig));
    console.log(chalk.cyanBright.bold("Tags: ") + data.tags.join(", "));
    console.log(chalk.cyanBright.bold("Created On: ") + formatDate(data.created_on, true));
  });


// List out all the shortened URLs
program
  .command("list")
  .description("List all shortened URLs")
  .action(async() => {
      const response = await fetch(`${API_URL}/stats/all`);
      const data = await response.json();
      const statsTableHeadings = ["Shortend URL", "Original URL", "Click", " Unique Visitors", "Last Visited"];
      const coloredStatsTableHeadings = statsTableHeadings.map((h) => chalk.cyanBright.bold(h));
      const statsTableData = data.urlsData.map((urlData) => {
        const row = [urlData.shortLink, urlData.url, urlData.clicks, urlData.unique_visitors, formatDate(urlData.last_visited, false)];
        const coloredRow = row.map((h) => chalk.gray.bold(h));
        return coloredRow;
      })
      const urlsTable = [
        coloredStatsTableHeadings,
        ...statsTableData
      ];
      console.log(chalk.bgCyanBright.black.bold("\nLIST OF ALL THE SHORTEND URLS :  \n"));
      console.log(table(urlsTable, tableConfig));
      console.log("To get the stats of a particular short url,");
      console.log("Run the following command :");
      console.log(chalk.gray("shortstack stats -u ${short_url}"));
  });


if (process.argv.length <= 2) {
  showBanner();
  program.outputHelp();
} else {
  program.parse(process.argv);
}

#!/usr/bin/env node
const meow = require("meow");
const { promises, createWriteStream } = require("fs");
const chalk = require("chalk");

const CWD = process.cwd();
const cli = meow(
	chalk`
	{blue Usage}
		$ get-good-readme [options]

    {yellow Options}
		{bold Required}: -p, --project-name Set the project name.
		{bold Required}: -g, --github-user Set the github user name.

		--description, -d Describe why you're creating this project.
        --help, Display all commands and options availables.
		--version, Display the actual package version.

	{green Exemples}
		get-good-readme -p=test -g=luctst -d="This project is amazing."
`,
	{
		flags: {
			projectName: {
				type: "string",
				alias: "p"
			},
			githubUser: {
				type: "string",
				alias: "g"
			},
			description: {
				type: "string",
				alias: "d",
				default: "This project is amazing, you should write some lines about it."
			}
		}
	}
);

if (
	!Object.prototype.hasOwnProperty.call(cli.flags, "projectName") ||
	!Object.prototype.hasOwnProperty.call(cli.flags, "githubUser")
) {
	console.error(chalk`{red You must add required options.}`);
	console.error(cli.showHelp(1));
}

promises.readFile(`${__dirname}/README.md`, "utf-8").then(d => {
	let readMeToReplace = d;

	readMeToReplace = readMeToReplace.replace(/\{\{name\}\}/g, cli.flags.projectName);
	readMeToReplace = readMeToReplace.replace(/\{\{githubUser\}\}/g, cli.flags.githubUser);
	readMeToReplace = readMeToReplace.replace("{{goal}}", cli.flags.description);

	createWriteStream(`${CWD}/TEST.md`).write(readMeToReplace);

	console.log(chalk`{green Your new README file was correctly installed :)}`);
});

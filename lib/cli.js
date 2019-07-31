#!/usr/bin/env node
const inquirer = require("inquirer");
const figlet = require("figlet");
const fs = require("fs");
const choices = require("./utils/choices.js");

const inquirerChoices = [];

console.log(
	figlet.textSync("get-good-readme", {
		horizontalLayout: "full"
	})
);

console.log("We need to ask you a few questions, it should not be too long. \n");

fs.readdirSync(`${__dirname}/template`).forEach(el => {
	choices.filter(choice => {
		if (choice.templateName === el) {
			return inquirerChoices.push({
				name: `${choice.name} ${new inquirer.Separator(choice.description)}`,
				value: choice.templateName.split(".md")[0]
			});
		}
		return false;
	});
});

inquirer
	.prompt([
		{
			name: "name",
			type: "input",
			message: "What is the name of your project ?",
			validate: answer => {
				if (answer.length === 0) {
					console.error("\x1b[31m", "You must enter an validate pseudo");
					return false;
				}
				return true;
			}
		},
		{
			name: "goal",
			type: "input",
			message: "With a few words what kind of problem you're trying to resolve ?"
		},
		{
			name: "template",
			type: "list",
			message: "What kind of README file you want use ? ",
			choices: [...inquirerChoices]
		}
	])
	.then(answers => {
		const prompt = inquirer.createPromptModule();

		console.log("\x1b[33m", "\n This is your answers \n");

		Object.keys(answers).map(el => console.log(`${el} -> ${answers[el]}`));

		prompt([
			{
				name: "validate",
				type: "confirm",
				message: "Does this answers are good for you ?"
			}
		]).then(continueProcess => {
			if (continueProcess.validate) {
				fs.readFile(
					`${__dirname}/template/${answers.template}.md`,
					"utf-8",
					(err, data) => {
						if (err) throw err;

						let readMeToReplace = data;

						readMeToReplace = readMeToReplace.replace("{{name}}", answers.name);
						readMeToReplace = readMeToReplace.replace("{{goal}}", answers.goal);

						fs.createWriteStream("README.md").write(readMeToReplace);

						console.log("\x1b[32m", "Your new README file was correctly installed :)");
					}
				);
			} else {
				console.error("\x1b[31m", "Oups your answers are not correct ? \n");
				console.error(
					"\x1b[31m",
					"Please rerun this program to write the answers you want."
				);
			}
		});
	});

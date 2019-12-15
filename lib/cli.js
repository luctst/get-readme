#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const choices = require("./utils/choices.js");

const CWD = process.cwd();
const inquirerChoices = [];

console.log(
	chalk`{yellow We need to ask you a few questions, it should not be too long. \n}`
);

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
					console.error(chalk`chalk {red You must enter an validate pseudo}`);
					return false;
				}
				return true;
			}
		},
		{
			type: "input",
			message: "What is your github user name ?",
			name: "githubUser",
			validate: answer => {
				if (/^([a-z\d]+-)*[a-z\d]+$/i.test(answer)) return true;
				return console.error("Enter a valid username");
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

		console.log(chalk`{yellow \n This is your answers \n}`);
		Object.keys(answers).map(el =>
			console.log(chalk`{yellow ${el}} -> {blue ${answers[el]}}`)
		);

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

						readMeToReplace = readMeToReplace.replace(/\{\{name\}\}/g, answers.name);
						readMeToReplace = readMeToReplace.replace(
							/\{\{githubUser\}\}/g,
							answers.githubUser
						);
						readMeToReplace = readMeToReplace.replace("{{goal}}", answers.goal);

						fs.createWriteStream(`${CWD}/README.md`).write(readMeToReplace);

						console.log(chalk`{green Your new README file was correctly installed :)}`);
					}
				);
			} else {
				console.error(chalk`{red Oups your answers are not correct ? \n}`);
				console.error(
					chalk`{yellow Please rerun this program to write the answers you want.}`
				);
			}
		});
	});

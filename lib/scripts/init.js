const readline = require("readline");
const replace = require("replace-in-file");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "-> "
});
const initProcess = {
	steps: 0,
	questions: [
		"What is the name of your project ? Don't add space in the name. \n",
		"Enter a description. \n",
		"Enter the version of NodeJs that your project must use. \n",
		"Enter the URL of your repo. \n"
	],
	answers: {
		name: "",
		description: "",
		node: "",
		url: ""
	}
};

const replaceContent = (property, input) => {
	const newAnswers = { ...initProcess.answers };
	newAnswers[property] = input;
	initProcess.answers = { ...newAnswers };

	if (initProcess.steps !== initProcess.questions.length) {
		initProcess.steps += 1;
		return;
	}
	console.log("\x1b[35m%s\x1b[0m", "Your package.json file was configurated");

	replace.sync({
		files: "./package.json",
		from: [/NAME/g, /DESCRIPTION/g, /VERSION/g, /REPO/g],
		to: [
			initProcess.answers.name,
			initProcess.answers.description,
			initProcess.answers.node,
			initProcess.answers.url
		],
		countMatches: true,
		allowEmptyPaths: true,
		dry: true
	});

	process.exit(0);
};

console.log(
	"\x1b[33m%s\x1b[0m",
	"Before starting we need some informations to configurate your project. \n"
);
console.log("Press enter to start");

rl.on("line", input => {
	if (input === "" && initProcess.steps !== 0) {
		console.log("\x1b[35m%s\x1b[0m", "You should enter data !");
		rl.prompt();
	} else {
		if (initProcess.steps !== initProcess.questions.length) {
			console.log(`${initProcess.steps} - ${initProcess.questions[initProcess.steps]}`);
			rl.prompt();
		}

		switch (initProcess.steps) {
			case 0:
				initProcess.steps += 1;
				break;
			case 1:
				replaceContent("name", input);
				break;
			case 2:
				replaceContent("description", input);
				break;
			case 3:
				replaceContent("node", input);
				break;
			case 4:
				replaceContent("url", input);
				break;
			default:
				break;
		}
	}
}).on("close", () => {
	initProcess.steps !== initProcess.questions.length &&
		console.log(
			"\x1b[33m%s\x1b[0m",
			"You closed the program too earlier your package.json file is not completed"
		);
});

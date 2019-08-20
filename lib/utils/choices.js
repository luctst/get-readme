/**
 * The choices module is used to create the object that will be sent when choosing the templates.
 *
 * By doing so we separate the logic by isolating the contents in a module which will allow us to format it more easily.
 *
 * To be valid an object need 3 properties name, description and templateName.
 *
 * 1. `Name` is the template name use by inquirer to display the differents choices.
 * 2. `description` is used to describe with a few words what this template contains.
 * 3. `templateName` is important because it allows us to compare if the template is present in the template folder that's why it must exactly has the same name than the file in the template folder.
 */
module.exports = [
	{
		name: "Default",
		description: "Good for all type of projects.",
		templateName: "default.md"
	},
	{
		name: "Tiny modules",
		description: "Good for little projects",
		templateName: "tinyModule.md"
	},
	{
		name: "In coming",
		description: "Template used when your project is not ready yet",
		templateName: "inComing.md"
	}
];

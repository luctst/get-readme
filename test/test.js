import test from "ava";
import choices from "../lib/utils/choices";
import {readdirSync} from "fs";

test.serial("Choices array is correct ?", t => {
	choices.map(el => {
		t.truthy(el.name);
		t.truthy(el.description);
		t.truthy(el.templateName);
	});
});

test.serial("Check if the choices array is at the same level than template folder", t => {
	const checkIfTemplate = Object.values(choices).map(el => el.templateName);

	readdirSync("./lib/template/").map(el => {
		checkIfTemplate.includes(el) ? t.pass("Same level") : t.fail("Error, check if choices hold one objet per files in template folder");
	});
});

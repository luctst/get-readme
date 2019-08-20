import test from "ava";
import choices from "../lib/utils/choices";
import {readdirSync} from "fs";

test.serial("Does the objects in choices array are correct ?", t => {
	choices.map(el => {
		t.truthy(el.name);
		t.truthy(el.description);
		t.truthy(el.templateName);
	});
});

test.serial("Does the template folder includes all the template written by choices array ?", t => {
	const choicesTemplateName = Object.values(choices).map(choicesItem => choicesItem.templateName);

t.log(choicesTemplateName);
	readdirSync("lib/template/").map(template => {
		choicesTemplateName.includes(template) ?
			t.pass("Template folder is at the same level") :
				t.fail("Template folder is not at the same level");
	});
});

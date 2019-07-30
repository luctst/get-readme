# Contributing
we are happy that you want to contribute to this project, first of all we know it is a bit painful but please it is important to read the [code of conduct file](https://github.com/luctst/get-readme/blob/master/.github/CODE_OF_CONDUCT.md).

## How to contribute ?
It is possible to contribute in many ways, either you want to solve a problem or you have an idea and you'll like to add it in the project.

1. First case, please go to the issue page and read the issues sections in this file to start coding.
2. In the second case it is preferable at first to validate your idea, to do this open an issue by following the feature request template by giving a maximum information and add the label enhancement.
This method is important because it allows us to verify that your idea is in adequacy with the project and thus be able to validate it or not. Once your idea is validate you can start coding by reading the next section.

### Issues
If you decide to solve an issue, please do the actions listed below:

1. Fork the project.
2. Create a branch with the issue name.
3. Once you're done open a PR by respecting the rules writing in the Pull request section of this file.

When you solve a problem we have made tests available to keep some guideline in the code:

* `npm run test:watch` - Test and watch all the Javascript files in the `lib` folder with ava.
* `npm run lint:watch` - Lint check style and watch all the Javascript files in the `lib` folder with eslint and prettier.

The lint command will sometime return warnings and errors that can be automatically fixed to solve this use this command `npm run lint:fix`.

### Pull request
So you have decided to contribute code back to upstream by opening a pull request. You've invested a good chunk of time, and we appreciate it. We will do our best to work with you and get the PR looked at.

Small pull requests are much easier to review and more likely to get merged. Make sure the PR does only one thing, otherwise please split it.

When you create your pull request we give you access to a template, it is important to try to respect it as much as possible by providing as much information as you judge necessary it can save us a lot of time.

To get your code merge in the codebase you must
imperatively pass those tests to run them enter this in your terminal:

* Test with ava - `npm run test`.
* Lint with eslint - `npm run lint`.
* Style with prettier - `npm run style`.

It's really important to keep this tests green because
they allow us to keep some consistency in the code. As long as this tests are red we will not be able to watch your work.

Once everything is good you can watch your code
alive :)

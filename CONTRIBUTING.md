## Contribution Guide
* Recommended to have `forked` master branch to be updated to upstream.
* Configure [Syncing a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/).
  - `git remote add upstream https://github.com/dooboolab/talktalk-rn`
  - Check it with `git remote -v`
* Fetch the branches from upstream repository by `git fetch upstream`
* When you want to give `PR`, make new branch `git checkout -b [feature_name]`
  - Before pushing `PR`, do `git fetch upstream` from master branch then try the rebase by `git rebase master`
  - Check your status by `git log --decorate --oneline --all --graph` or `npm run git:log`

### Issue
* Please search and register if you already have the issue you want to create. If you have a similar issue, you can add additional comments.
* Please write a problem or suggestion in the issue. Never include more than one item in an issue.
* Please be as detailed and concise as possible.
	* If necessary, please take a screenshot and upload an image.

### Pull request(PR)
* PR is available to `master` branch.

### Coding Guidelines
Please follow the Coding conventions as much as possible when contributing your code.
* The indent tab is two spaces.
* The class declaration and the `{}` in curly brackets such as function, if, foreach, for, and while should be in the following format. Also if you installed eslint in vscode or in your code editor, it will help you with linting.
	* `{` should be placed in same line and `}` should be placed in next line.
```
for (let i = 0; i < 10; i++) {
  ...
}
array.forEach((e) => {
  ...
});
```
  * Space before `(` and after `)`.
* **If you find code that does not fit in the coding convention, do not ever try to fix code that is not related to your purpose.**

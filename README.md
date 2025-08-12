# Typescript and Playwright Demo Project

## Istallation

### Pre-condition:

- istall prefered Ide (example: Visual Studio Code, IntelliJ etc.)
- install Ide extensions: ESLint, Playwright, Prettier, Live Preview
- install nodeJS LTS (latest stable version) from `https://nodejs.org/en/download`
- check your nodeJS installed version with terminal command `npm -v` and `node -v`

### Project Set Up

- install all project package dependenices:
- `npm install`

- install playwright with dependenices:
- using normal install `npx playwright install` or silent install `npx playwright install --with-deps`

- finally run all tests by providing an enviroment and language to use when logging into Banker
- `npx playwright test`

- you can run only 1 test by addint `.only` to the test implementation, example: 
- `test.only(`Login with valid creds`, { tag: ['@ui'] }, async ({ page }) => {`

## Set up VS Code User Settings with:

- ctr+p (to open VS Code search menu)
- type: ">Open User Settings" and select the JSON option (search for command to execute which contains this text)
- note!: after this you will have to set up your IDE's colour scheme again

### Copy the below settings and replace your JSON file with the JSON below:

- makes git bash default terminal
- configures formater as Prettier
- configures auto format on Paste or Save
- sets up some useful git settings
- sets up some playwright settings for later

{
    "terminal.integrated.defaultProfile.windows": "Git Bash",
    "prettier.printWidth": 200,
    "files.autoSave": "afterDelay",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "explorer.confirmDelete": false,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "git.autofetch": true,
    "git.enableSmartCommit": true,
    "editor.wordWrapColumn": 160,
    "playwright.updateSnapshots": "all",
    "playwright.env": {},
    "playwright.reuseBrowser": true,
    "playwright.showTrace": false,
    "git.confirmSync": false,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}

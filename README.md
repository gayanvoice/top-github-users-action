# JavaScript Action | File Handling and GitHub Operations

Use this repository to bootstrap the creation of a JavaScript action for cahe_file handling and Git operations.

This repository includes create directory, create Json cahe_file, read Json cahe_file, git commit and git push.

## Create an action from this repository

### 1. Folk the repository

### 2. Change the git.js

Go to <a href="https://github.com/gayanvoice/github-javascript-action/blob/master/src/git/git.js">src/git/git.js</a> and
change <a href="https://github.com/gayanvoice/github-javascript-action/blob/master/src/git/git.js#L6">
user.email</a> with your GitHub account's primary email
and <a href="https://github.com/gayanvoice/github-javascript-action/blob/master/src/git/git.js#L7">
user.name</a> with your GitHub profile name.

```javascript
const {exec} = require('child_process');
const core = require('@actions/core');

async function commit() {
    core.info('git commit');
    exec('git config --global user.email "username@mail.com"');
    exec('git config --global user.name "GitHub Name"');
    exec('git add .');
    exec('git commit -m "message"');
}

module.exports = commit
```

### 3. Package for distribution

Run prepare

```bash
npm run prepare
```

### 4. Push changes to repository

## Create a workflow

### 1. Create an empty repository or go to an existing repository

### 2. Create YML cahe_file in .github/workflows/main.yml and change to your JavaScript Action repository url

```yml
name: JavaScript CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:
jobs:
  deployment:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2.3.3
        with:
          ref: ${{ github.head_ref }}
          token: ${{ secrets.GITHUB_TOKEN }}
      - name: JavaScript Action
        uses: gayanvoice/javascript-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SECRETS_CONTEXT: ${{ toJson(secrets) }}
```
### 3. Go to Actions to see the process
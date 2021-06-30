# Top GitHub Users Action <img src="https://github.githubassets.com/images/modules/site/features/actions-icon-actions.svg" height=48 width=48 /> [<img alt="Image of my-profile-views-counter" src="https://github.com/gayanvoice/my-profile-views-counter/blob/master/graph/373376349/small/week.png" height="20">](https://github.com/gayanvoice/my-profile-views-counter/blob/master/readme/373376349/week.md)
[![Image of my-profile-views-counter](https://github.com/gayanvoice/my-profile-views-counter/blob/master/svg/373376349/badge.svg)](https://github.com/gayanvoice/my-profile-views-counter/blob/master/readme/373376349/week.md)

Check your rank in GitHub! Get the list of active users in GitHub by country using GitHub Graph API. Go to [gayanvoice/top-github-users](https://github.com/gayanvoice/top-github-users).

## Setup

**1 —** Create an empty repository and name the repository as `top-github-users`.

**2 —** 🔒 Create a new personal access token with `repo` `workflow` `admin:org` `user` options

Go to Settings -> Developer settings -> Personal Access Tokens and click on *Generate new token* button. Give it any name and select `repo` `workflow` `admin:org -> read:org` `user -> read:user` options and click on *Generate token* button. ✂️ Copy the token.

**3 —** 🔑 Create a repository secret

Go to your top-github-users repository -> Settings -> Secrets and click on *New repository secret* button and enter *name* as `CUSTOM_TOKEN` and 📋 paste the `personal access token` under *value*. Click on *Add secret* button.

**4 —** Go to your top-github-users repository -> Actions and click on *set up a workflow yourself* link to create a new workflow and paste the below content into yml file. Commit changes.

```yml
name: Top GitHub Users
on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:
jobs:
  release:
    name: GitHub Active Users
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2.3.4
        with:
          ref: ${{ github.head_ref }}
          token: ${{ secrets.CUSTOM_TOKEN }}
      - uses: actions/setup-node@v2.1.5
        with:
          node-version: 14.17.0
      - uses: gayanvoice/top-github-users-action@master
        env:
          CUSTOM_TOKEN: ${{ secrets.CUSTOM_TOKEN }}

```
**5 —** Go to your top-github-users repository. Create a JSON file *checkpoint.json*. Copy the content and paste to the checkpoint.json and commit changes.

```json
{"checkpoint":0}
```
**6 —** Go to your top-github-users repository. Create a JSON file *config.json*. Copy the content and paste to the config.json and commit changes.

```json
{
  "devMode": "false",
  "locations":[
    { "country":  "afghanistan", "geoName": "Afghanistan", "cities": ["kabul", "kandahar", "herat", "Kunduz", "lashkargah", "ghazni", "khost", "zaranj"], "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Afghanistan.svg" },
    { "country":  "albania", "geoName": "Albania", "cities": ["tirana", "durrës", "vlorë", "elbasan", "shkodër", "kamëz", "fier", "korçë"], "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg" },
    { "country":  "algeria", "geoName": "Algeria", "cities": ["algiers", "oran", "constantine", "batna", "djelfa", "sétif", "annaba", "sidibelabbès", "biskra", "tiaret"], "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg" },
    { "country":  "andorra", "geoName": "Andorra", "cities": ["andorra-la-vella", "santa-coloma", "la-margineda", "engolasters"], "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg" },
    { "country":  "angola", "geoName": "Angola", "cities": ["luanda", "cabinda ", "huambo", "lubango ", "kuito", "malanje ", "lobito", "benguela"], "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg" },
    { "country":  "argentina","geoName": "Argentina", "cities": ["buenos-aires", "cordoba", "rosario", "la-plata", "tucumán", "mar-del-plata", "salta", "santa-fe"], "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg" },
    { "country":  "armenia", "geoName": "Armenia", "cities": ["yerevan", "gyumri", "vanadzor", "vagharshapat", "abovyan "], "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg" },
    { "country":  "australia", "geoName": "Australia", "cities": ["sydney", "melbourne", "perth", "adelaide", "brisbane", "canberra", "hobart", "gold-coast", "darwin"], "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg" },
    { "country":  "austria", "geoName": "Austria", "cities": ["vienna", "salzburg", "innsbruck", "linz", "graz", "klagenfurt", "bregenz", "villach"], "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg" }
  ]
}
```
**7 —** 📄 Go to your top-github-users repository -> Actions. Select the workflow *Top GitHub Users* and click on `Run workflow` button.

## Deploy local
**1 —** Clone this repository to your computer.

**2 —** Edit *index.js*
📋 paste the `personal access token` in `AUTH_KEY` in https://github.com/gayanvoice/top-github-users-action/blob/master/src/index.js and comment *process.env* secrets.
```javascript
    const AUTH_KEY = "ghp_vbmFdybMFCxWzvrgC*************";
    const GITHUB_USERNAME_AND_REPOSITORY = 'gayanvoice/top-github-users';
    // const AUTH_KEY = process.env.CUSTOM_TOKEN;
    // const GITHUB_USERNAME_AND_REPOSITORY = process.env.GITHUB_REPOSITORY;
```
**3 —** Run `test`*
Run on command line.
```shell
npm test
```
## 📦 Third party
- [@octokit/graphql](https://www.npmjs.com/package/@octokit/graphql) - Send GraphQL requests to GitHub API.
- [fs-extra](https://www.npmjs.com/package/fs-extra) - Creating directories and files.
- [simple-git](https://www.npmjs.com/package/simple-git) - Handling Git commands.
## 📄 License
- GitHub Action - [gayanvoice/top-github-users-action](https://github.com/gayanvoice/top-github-users-action)
- Repository - [gayanvoice/top-github-users](https://github.com/gayanvoice/top-github-users)
- Data in the `./cache` directory - [Open Database License](https://opendatacommons.org/licenses/odbl/1-0/)
- Code - [MIT](./LICENSE) © [Gayan Kuruppu](https://github.com/gayanvoice)

const {graphql} = require("@octokit/graphql");
const OctokitResponseModel = require('../model/octokit/OctokitResponseModel');
let octokit = (function () {
    // const AUTH_KEY = "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";
    const AUTH_KEY = process.env.CUSTOM_TOKEN;
    let getHeader = function () {
       return  {
            headers: {
                authorization: `token ${AUTH_KEY}`,
            },
        }
    }
    let getQuery = function (locations, numberOfUsers, cursor) {
        return { query: `query {
              search(type: USER, query:"${locations} sort:followers-desc", first:${numberOfUsers}, after:${cursor}) {
                edges {
                  node {
                    __typename
                    ... on User {
                      login,
                      avatarUrl(size: 72),
                      name,
                      location,
                      followers {
                        totalCount
                      }
                      contributionsCollection {
                        contributionCalendar {
                          totalContributions
                        }
                        restrictedContributionsCount
                      }
                    }
                  }
                }
                 pageInfo {
                    endCursor
                    hasNextPage
                  }
              }
            }`};
    }
    let setCursor = function (cursor) {
        if(cursor === null){
            return cursor
        } else {
            return `"${cursor}"`;
        }
    }
    let request = async function (locations, cursor) {
        try{
            const graphqlWithAuth = graphql.defaults(getHeader());
            const response = await graphqlWithAuth(getQuery(locations, 10, setCursor(cursor)));
            return new OctokitResponseModel(true, response);
        } catch (error) {
            console.log(error)
            return new OctokitResponseModel(false)
        }

    }
    return {
        request: request
    };
})();
module.exports = octokit;
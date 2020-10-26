[![Netlify Status](https://api.netlify.com/api/v1/badges/acd76991-747a-414b-b3d7-fc03fafd114f/deploy-status)](https://app.netlify.com/sites/vette-tracker/deploys)

# Vette Tracker

A tool to track corvette prices over time. Built using [this tutorial](https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-faunadb/#2-set-up-faunadb) as a guide.

## React

- [React Docs](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Router](https://reactrouter.com/)

## Netlify Functions

- [Netlify Functions](https://www.netlify.com/products/functions/)

## FaunaDB

- [FaunaDB Documentation](https://docs.fauna.com/fauna/current/start/cloud)
- [How to use FaunaDB with Netlify](https://docs.fauna.com/fauna/current/integrations/netlify.html)

## TODO List

- Front End

  - ~~Setup bootstrap colors~~
  - ~~Create header and routing~~
  - ~~Figure out forms~~
  - Break out confirmation view card into vette detail
  - Create list of current vettes
  - Add edit and delete functions

- Functions

  - Identify functions needed
  - Build out functions
    - ~~Get all vettes~~
    - create new vette
    - update vette
    - delete vette

- FaunaDB

  - ~~Figure out how to initialize it~~

- Miscellaneous
  - ~~[Update to cra v4](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md)~~
  - Add error handing to client side errors
  - Add logic to account for missing payloads in lambda functions
  - Incoporate [react router 6](https://reacttraining.com/blog/react-router-v6-pre/)
  - Add Typescipt
  - Read RefactoringUI, go back through and redesign everything
  - Change to graphQL backend
  - Add prettier as a commit hook

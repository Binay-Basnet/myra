# Saccos

This project was generated using [Nx](https://nx.dev).

## Folder Structure

Learn about workspace structure from [here](https://nx.dev/structure/applications-and-libraries)

Also understand carefully about library [types](https://nx.dev/structure/library-types), [grouping libraries](https://nx.dev/structure/grouping-libraries) and what goes in apps and libs folder. Explore all the sub topics from WORKSPACE STRUCTURE group within the [nx](https://nx.dev) documentation.

The actual working directory for now is here:

```
apps/
    myra/
```

This app is a [Nextjs](https://nextjs.org/) application.

The UI libraries for the app is generated here:

```
libs/
  myra/
    ui/
```

This workspace structure is subject to change with growing codebase so carefully read the [nx](https://nx.dev) documentation as we will be strictly following the workspace structure provided by nx documentation.

## Some Short commands

- To generate UI components for myra app

```cmd
  make create-myra-ui name=NameOfYourComponent
```

This command generates a UI component with tests and stories on

```
  libs/
    myra/
      ui/
        src/
          lib/
```

## How to start

Runs the dev server for myra application

```
yarn start:myra
```

Runs the storybook for myra ui component

```
yarn storybook:myra-ui
```

## Existing problem:

From package.json file I've removed emotion dependency.

```
//package.json

 "@emotion/react": "^11",
```

This dependency is required by [Chakra Ui](https://chakra-ui.com/guides/getting-started/nextjs-guide) but conflicts with storybook. For that I tried the follwing things:

- [update .storybook/main.js](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#emotion11-quasi-compatibility)
- [upgraded storybook](https://github.com/storybookjs/storybook/issues/13114#issuecomment-1026850608)

But somehow the storybook still seem to parse package.json and throw error when it finds unsupported `@emotion/react` version (^11). So to run storybook I removed the dependency fromm package.json but It should be available in our node_modules directory. So, install the package with:

```
yarn add @emotion/react@^11
```

and remove from `package.json` again.

I know its weird. But I didn't find any other way. will be looking into solutions though. Any help will be appreciated!!

TODO:

[x] react query // all
[] redux-toolkit (June) // Sameer
[x] i18n // all
[] theming // Santosh
[] authorization and authentication (June) // Suyash

[] hotkeys // Santosh

[] table // Aakash // priorty1
[] Docker and deployment // Aakash // priority 3

[] json form generator // Suyash // priority 2
[] Nx expertise // Sameer & Suyash

// Rules:

1. Export everything ( chakra -related) from libs/myra
2. Rule of 3 if used for more than 2 then create a lib else create it where it is used
3. Don't use "any"
4.

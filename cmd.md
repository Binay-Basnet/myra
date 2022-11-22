generate-myra-component:

- yarn nx g @nrwl/next:component --project=myra --dry-run

remove:

- yarn nx g rm myapp-navbar // test

generate-myra-library

- yarn nx g library --directory=myra

generate-storybook-to-myra-components:

- yarn nx g @nrwl/react:storybook-configuration myra-components-navbar --generateStories --dry-run

## How I created UI library for Myra

https://blog.nrwl.io/build-your-design-system-with-storybook-nx-e3bde4087ad8

> Using @nrwl/next didn't exported the component from index.ts as said in doc (seems to be a bug in nx); so I used @nrwl/react;

### step 1;

First create library with

```javascript
yarn nx g @nrwl/react:lib --directory=myra
```

then choose the name of your library for example "ui"

This creates a "myra/ui" folder within lib directory

### step 2:

Configure storybook

```javascript
nx g @nrwl/react:storybook-configuration --name=myra-ui
```

### step 2;

then named the library "ui"

Then added component with

```javascript
yarn nx g @nrwl/react:component --project=myra-ui --export

```

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': async (ctx) => [2, 'always'],
  },
};

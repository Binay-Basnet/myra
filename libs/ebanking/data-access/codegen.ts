import { CodegenConfig } from '@graphql-codegen/cli';
import * as process from 'process';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env['NX_SCHEMA_PATH'] as string]: {
        headers: {
          schema: 'true',
        },
      },
    },
  ],
  watch: true,
  generates: {
    'libs/ebanking/data-access/src/generated/types.ts': {
      documents: 'libs/ebanking/data-access/src/lib/**/*.graphql',
      plugins: [
        {
          add: {
            content: [
              '/* eslint-disable */',
              '//This Code is auto generated by graphql-codegen, DO NOT EDIT',
              '//You can update the queries or mutations in *.graphql to generate any new changes.',
            ],
          },
        },
        'typescript',
        'typescript-operations',
      ],
      config: {
        scalars: {
          Time: 'string',
          Any: 'unknown',
          Cursor: 'string',
          InvalidData: 'Record<string, Array<string>>',
          Map: 'Record<string, string>',
          Date: 'string',
          Localized: 'Record<"local"|"en"|"np",string>',
        },
        enumsAsConst: true,
        skipTypename: true,
      },
    },
    'libs/ebanking/data-access/src/generated/myra/graphql.ts': {
      documents: 'libs/ebanking/data-access/src/lib/myra/**/*.graphql',
      preset: 'import-types',
      presetConfig: {
        typesPath: '../types',
      },
      plugins: [
        {
          add: {
            content: [
              '/* eslint-disable */',
              '//This Code is auto generated by graphql-codegen, DO NOT EDIT',
              '//You can update the queries or mutations in *.graphql to generate any new changes.',
            ],
          },
        },
        'typescript-react-query',
      ],
      config: {
        scalars: {
          Time: 'string',
          Any: 'unknown',
          Cursor: 'string',
          InvalidData: 'Record<string, Array<string>>',
          Map: 'Record<string, string>',
          Date: 'string',
          Localized: 'Record<"local"|"en"|"np",string>',
        },
        skipTypename: true,
        enumsAsConst: true,
        inlineFragmentTypes: 'combine',
        fetcher: {
          func: './axiosHelper#useAxios',
          isReactHook: true,
        },
      },
    },
    'libs/ebanking/data-access/src/generated/coop/graphql.ts': {
      documents: 'libs/ebanking/data-access/src/lib/coop/**/*.graphql',
      preset: 'import-types',
      presetConfig: {
        typesPath: '../types',
      },
      plugins: [
        {
          add: {
            content: [
              '/* eslint-disable */',
              '//This Code is auto generated by graphql-codegen, DO NOT EDIT',
              '//You can update the queries or mutations in *.graphql to generate any new changes.',
            ],
          },
        },
        'typescript-react-query',
      ],
      config: {
        scalars: {
          Time: 'string',
          Any: 'unknown',
          Cursor: 'string',
          InvalidData: 'Record<string, Array<string>>',
          Map: 'Record<string, string>',
          Date: 'string',
          Localized: 'Record<"local"|"en"|"np",string>',
        },
        skipTypename: true,
        inlineFragmentTypes: 'combine',
        fetcher: {
          func: './axiosHelper#useAxios',
          isReactHook: true,
        },
      },
    },
    'libs/ebanking/data-access/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;

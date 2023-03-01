/* eslint-disable */
//This Code is auto generated by graphql-codegen, DO NOT EDIT
//You can update the queries or mutations in *.graphql to generate any new changes.
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useAxios } from './axiosHelper';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Map: Record<string, string>;
  Upload: any;
};

export type Credentials = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type ExtractionEnv = {
  dbName: Scalars['String'];
  dbPassword?: InputMaybe<Scalars['String']>;
  dbUserName?: InputMaybe<Scalars['String']>;
  driver?: InputMaybe<Scalars['String']>;
  ip?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['String']>;
};

export type ExtractionResponse = {
  data?: Maybe<Array<Maybe<Scalars['String']>>>;
  status: Scalars['String'];
};

export type FileUpload = {
  dbName: Scalars['String'];
  file: Scalars['Upload'];
  fileName: Scalars['String'];
  folder: Scalars['String'];
};

export type LedgerMapping = {
  name: Scalars['String'];
  newCode: Scalars['String'];
  oldCode: Scalars['String'];
  row: Scalars['String'];
};

export type LedgerMappingInput = {
  name: Scalars['String'];
  newCode: Scalars['String'];
  oldCode: Scalars['String'];
  row: Scalars['String'];
};

export type LedgerMappingInputList = {
  data?: InputMaybe<Array<InputMaybe<LedgerMappingInput>>>;
};

export type LedgerMappingList = {
  data?: Maybe<Array<Maybe<LedgerMapping>>>;
};

export type LoginResponse = {
  accessToken: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Mutation = {
  protectedMutation: ProtectedMutation;
  resetToken: LoginResponse;
  userLogin: LoginResponse;
};

export type MutationResetTokenArgs = {
  refreshToken: Scalars['String'];
};

export type MutationUserLoginArgs = {
  input: Credentials;
};

export type ProjectList = {
  data?: Maybe<Array<Maybe<Projects>>>;
};

export type Projects = {
  database?: Maybe<Scalars['String']>;
  mapperCSV?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceCSV?: Maybe<Array<Maybe<Scalars['String']>>>;
  transformedCSV?: Maybe<Scalars['Map']>;
};

export type ProtectedMutation = {
  createFinalTable: ExtractionResponse;
  sendMappingData: ExtractionResponse;
  startExtraction: ExtractionResponse;
  startTransform: ExtractionResponse;
  uploadCSV: Scalars['Boolean'];
};

export type ProtectedMutationSendMappingDataArgs = {
  dbName: Scalars['String'];
  input: Array<InputMaybe<LedgerMappingInput>>;
};

export type ProtectedMutationStartExtractionArgs = {
  input: ExtractionEnv;
};

export type ProtectedMutationStartTransformArgs = {
  input: Transform;
};

export type ProtectedMutationUploadCsvArgs = {
  input?: InputMaybe<FileUpload>;
};

export type ProtectedQuery = {
  getDirectoryStructure?: Maybe<ProjectList>;
  getExtractionData: ExtractionResponse;
  getMappingData: LedgerMappingList;
  getProjects: Array<Maybe<Scalars['String']>>;
  getTransformationData: ExtractionResponse;
};

export type ProtectedQueryGetDirectoryStructureArgs = {
  dbName: Scalars['String'];
};

export type ProtectedQueryGetExtractionDataArgs = {
  dbName: Scalars['String'];
};

export type ProtectedQueryGetMappingDataArgs = {
  dbName: Scalars['String'];
};

export type ProtectedQueryGetTransformationDataArgs = {
  dbName: Scalars['String'];
};

export type Query = {
  protectedQuery: ProtectedQuery;
};

export type Transform = {
  choices: Scalars['String'];
  databaseType: Scalars['String'];
  dbName: Scalars['String'];
};

export type SetAuthMutationVariables = Exact<{
  userName: Scalars['String'];
  password: Scalars['String'];
}>;

export type SetAuthMutation = {
  userLogin: { accessToken: string; refreshToken: string; name: string; email: string };
};

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;

export type RefreshMutation = {
  resetToken: { accessToken: string; refreshToken: string; name: string; email: string };
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProjectsQuery = { protectedQuery: { getProjects: Array<string | null> } };

export type GetDirectoryStructureQueryVariables = Exact<{
  dbName: Scalars['String'];
}>;

export type GetDirectoryStructureQuery = {
  protectedQuery: {
    getDirectoryStructure?: {
      data?: Array<{
        database?: string | null;
        mapperCSV?: Array<string | null> | null;
        sourceCSV?: Array<string | null> | null;
        transformedCSV?: Record<string, string> | null;
      } | null> | null;
    } | null;
  };
};

export const SetAuthDocument = `
    mutation setAuth($userName: String!, $password: String!) {
  userLogin(input: {userName: $userName, password: $password}) {
    accessToken
    refreshToken
    name
    email
  }
}
    `;
export const useSetAuthMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SetAuthMutation, TError, SetAuthMutationVariables, TContext>
) =>
  useMutation<SetAuthMutation, TError, SetAuthMutationVariables, TContext>(
    ['setAuth'],
    useAxios<SetAuthMutation, SetAuthMutationVariables>(SetAuthDocument),
    options
  );
export const RefreshDocument = `
    mutation refresh($refreshToken: String!) {
  resetToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
    name
    email
  }
}
    `;
export const useRefreshMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<RefreshMutation, TError, RefreshMutationVariables, TContext>
) =>
  useMutation<RefreshMutation, TError, RefreshMutationVariables, TContext>(
    ['refresh'],
    useAxios<RefreshMutation, RefreshMutationVariables>(RefreshDocument),
    options
  );
export const GetProjectsDocument = `
    query getProjects {
  protectedQuery {
    getProjects
  }
}
    `;
export const useGetProjectsQuery = <TData = GetProjectsQuery, TError = unknown>(
  variables?: GetProjectsQueryVariables,
  options?: UseQueryOptions<GetProjectsQuery, TError, TData>
) =>
  useQuery<GetProjectsQuery, TError, TData>(
    variables === undefined ? ['getProjects'] : ['getProjects', variables],
    useAxios<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument).bind(
      null,
      variables
    ),
    options
  );
export const GetDirectoryStructureDocument = `
    query getDirectoryStructure($dbName: String!) {
  protectedQuery {
    getDirectoryStructure(dbName: $dbName) {
      data {
        database
        mapperCSV
        sourceCSV
        transformedCSV
      }
    }
  }
}
    `;
export const useGetDirectoryStructureQuery = <TData = GetDirectoryStructureQuery, TError = unknown>(
  variables: GetDirectoryStructureQueryVariables,
  options?: UseQueryOptions<GetDirectoryStructureQuery, TError, TData>
) =>
  useQuery<GetDirectoryStructureQuery, TError, TData>(
    ['getDirectoryStructure', variables],
    useAxios<GetDirectoryStructureQuery, GetDirectoryStructureQueryVariables>(
      GetDirectoryStructureDocument
    ).bind(null, variables),
    options
  );

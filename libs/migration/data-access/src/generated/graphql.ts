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

export type CsvError = {
  count: Scalars['String'];
  files: Array<Maybe<Scalars['String']>>;
};

export type CsvFileDetails = {
  data?: Maybe<Scalars['Map']>;
  row?: Maybe<Scalars['String']>;
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

export type FileDetails = {
  data?: InputMaybe<Array<InputMaybe<InputCsvFileDetails>>>;
  dbName: Scalars['String'];
  fileName: Scalars['String'];
  folderName: Array<InputMaybe<Scalars['String']>>;
  pageNo: Scalars['String'];
};

export type FileUpload = {
  dbName: Scalars['String'];
  file: Scalars['Upload'];
  fileName: Scalars['String'];
  folder: Scalars['String'];
};

export type InputCsvFileDetails = {
  data?: InputMaybe<Scalars['Map']>;
  row?: InputMaybe<Scalars['String']>;
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
  generateReport: ExtractionResponse;
  sendFileData: ExtractionResponse;
  startExtraction: ExtractionResponse;
  startTransform: ExtractionResponse;
  uploadCSV: Scalars['Boolean'];
};

export type ProtectedMutationGenerateReportArgs = {
  input: ReportInput;
};

export type ProtectedMutationSendFileDataArgs = {
  input: FileDetails;
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
  checkErrors: CsvError;
  getDirectoryStructure?: Maybe<ProjectList>;
  getExtractionData: ExtractionResponse;
  getFileData?: Maybe<Array<Maybe<CsvFileDetails>>>;
  getProjects: Array<Maybe<Scalars['String']>>;
  getReportType: Array<Scalars['String']>;
  getTransformationData: ExtractionResponse;
  getTransformedDirStruct?: Maybe<Array<Scalars['String']>>;
  getreportStatus: ExtractionResponse;
};

export type ProtectedQueryCheckErrorsArgs = {
  input: Array<InputMaybe<Scalars['String']>>;
};

export type ProtectedQueryGetDirectoryStructureArgs = {
  dbName: Scalars['String'];
};

export type ProtectedQueryGetExtractionDataArgs = {
  dbName: Scalars['String'];
};

export type ProtectedQueryGetFileDataArgs = {
  input: FileDetails;
};

export type ProtectedQueryGetTransformationDataArgs = {
  dbName: Scalars['String'];
};

export type ProtectedQueryGetTransformedDirStructArgs = {
  folderPath: Array<InputMaybe<Scalars['String']>>;
};

export type ProtectedQueryGetreportStatusArgs = {
  dbName?: InputMaybe<Scalars['String']>;
};

export type Query = {
  protectedQuery: ProtectedQuery;
};

export type ReportInput = {
  date?: InputMaybe<Scalars['String']>;
  dbName: Scalars['String'];
  head?: InputMaybe<Scalars['String']>;
  title: Array<InputMaybe<Scalars['String']>>;
};

export type Transform = {
  choices: Scalars['String'];
  databaseType: Scalars['String'];
  dbName: Scalars['String'];
  newDB: Scalars['String'];
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

export type CreateProjectMutationVariables = Exact<{
  input: ExtractionEnv;
}>;

export type CreateProjectMutation = {
  protectedMutation: { startExtraction: { status: string; data?: Array<string | null> | null } };
};

export type StartTransformMutationVariables = Exact<{
  input: Transform;
}>;

export type StartTransformMutation = {
  protectedMutation: { startTransform: { status: string; data?: Array<string | null> | null } };
};

export type SetCsvDataMutationVariables = Exact<{
  input: FileDetails;
}>;

export type SetCsvDataMutation = {
  protectedMutation: { sendFileData: { status: string; data?: Array<string | null> | null } };
};

export type GenerateReportMutationVariables = Exact<{
  input: ReportInput;
}>;

export type GenerateReportMutation = {
  protectedMutation: { generateReport: { status: string; data?: Array<string | null> | null } };
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

export type GetExtractionDataQueryVariables = Exact<{
  dbName: Scalars['String'];
}>;

export type GetExtractionDataQuery = {
  protectedQuery: { getExtractionData: { status: string; data?: Array<string | null> | null } };
};

export type GetTransformationDataQueryVariables = Exact<{
  dbName: Scalars['String'];
}>;

export type GetTransformationDataQuery = {
  protectedQuery: { getTransformationData: { status: string; data?: Array<string | null> | null } };
};

export type GetCsvDataQueryVariables = Exact<{
  input: FileDetails;
}>;

export type GetCsvDataQuery = {
  protectedQuery: {
    getFileData?: Array<{
      row?: string | null;
      data?: Record<string, string> | null;
    } | null> | null;
  };
};

export type GetTransformedDirStructureQueryVariables = Exact<{
  folderPath: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
}>;

export type GetTransformedDirStructureQuery = {
  protectedQuery: { getTransformedDirStruct?: Array<string> | null };
};

export type GetErrorsQueryVariables = Exact<{
  input: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
}>;

export type GetErrorsQuery = {
  protectedQuery: { checkErrors: { files: Array<string | null>; count: string } };
};

export type GetReportTypesQueryVariables = Exact<{ [key: string]: never }>;

export type GetReportTypesQuery = { protectedQuery: { getReportType: Array<string> } };

export type GetReportStatusQueryVariables = Exact<{
  dbName?: InputMaybe<Scalars['String']>;
}>;

export type GetReportStatusQuery = {
  protectedQuery: { getreportStatus: { status: string; data?: Array<string | null> | null } };
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
export const CreateProjectDocument = `
    mutation createProject($input: ExtractionEnv!) {
  protectedMutation {
    startExtraction(input: $input) {
      status
      data
    }
  }
}
    `;
export const useCreateProjectMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateProjectMutation,
    TError,
    CreateProjectMutationVariables,
    TContext
  >
) =>
  useMutation<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>(
    ['createProject'],
    useAxios<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument),
    options
  );
export const StartTransformDocument = `
    mutation startTransform($input: Transform!) {
  protectedMutation {
    startTransform(input: $input) {
      status
      data
    }
  }
}
    `;
export const useStartTransformMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    StartTransformMutation,
    TError,
    StartTransformMutationVariables,
    TContext
  >
) =>
  useMutation<StartTransformMutation, TError, StartTransformMutationVariables, TContext>(
    ['startTransform'],
    useAxios<StartTransformMutation, StartTransformMutationVariables>(StartTransformDocument),
    options
  );
export const SetCsvDataDocument = `
    mutation setCSVData($input: FileDetails!) {
  protectedMutation {
    sendFileData(input: $input) {
      status
      data
    }
  }
}
    `;
export const useSetCsvDataMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SetCsvDataMutation, TError, SetCsvDataMutationVariables, TContext>
) =>
  useMutation<SetCsvDataMutation, TError, SetCsvDataMutationVariables, TContext>(
    ['setCSVData'],
    useAxios<SetCsvDataMutation, SetCsvDataMutationVariables>(SetCsvDataDocument),
    options
  );
export const GenerateReportDocument = `
    mutation generateReport($input: ReportInput!) {
  protectedMutation {
    generateReport(input: $input) {
      status
      data
    }
  }
}
    `;
export const useGenerateReportMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    GenerateReportMutation,
    TError,
    GenerateReportMutationVariables,
    TContext
  >
) =>
  useMutation<GenerateReportMutation, TError, GenerateReportMutationVariables, TContext>(
    ['generateReport'],
    useAxios<GenerateReportMutation, GenerateReportMutationVariables>(GenerateReportDocument),
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
export const GetExtractionDataDocument = `
    query getExtractionData($dbName: String!) {
  protectedQuery {
    getExtractionData(dbName: $dbName) {
      status
      data
    }
  }
}
    `;
export const useGetExtractionDataQuery = <TData = GetExtractionDataQuery, TError = unknown>(
  variables: GetExtractionDataQueryVariables,
  options?: UseQueryOptions<GetExtractionDataQuery, TError, TData>
) =>
  useQuery<GetExtractionDataQuery, TError, TData>(
    ['getExtractionData', variables],
    useAxios<GetExtractionDataQuery, GetExtractionDataQueryVariables>(
      GetExtractionDataDocument
    ).bind(null, variables),
    options
  );
export const GetTransformationDataDocument = `
    query getTransformationData($dbName: String!) {
  protectedQuery {
    getTransformationData(dbName: $dbName) {
      status
      data
    }
  }
}
    `;
export const useGetTransformationDataQuery = <TData = GetTransformationDataQuery, TError = unknown>(
  variables: GetTransformationDataQueryVariables,
  options?: UseQueryOptions<GetTransformationDataQuery, TError, TData>
) =>
  useQuery<GetTransformationDataQuery, TError, TData>(
    ['getTransformationData', variables],
    useAxios<GetTransformationDataQuery, GetTransformationDataQueryVariables>(
      GetTransformationDataDocument
    ).bind(null, variables),
    options
  );
export const GetCsvDataDocument = `
    query getCSVData($input: FileDetails!) {
  protectedQuery {
    getFileData(input: $input) {
      row
      data
    }
  }
}
    `;
export const useGetCsvDataQuery = <TData = GetCsvDataQuery, TError = unknown>(
  variables: GetCsvDataQueryVariables,
  options?: UseQueryOptions<GetCsvDataQuery, TError, TData>
) =>
  useQuery<GetCsvDataQuery, TError, TData>(
    ['getCSVData', variables],
    useAxios<GetCsvDataQuery, GetCsvDataQueryVariables>(GetCsvDataDocument).bind(null, variables),
    options
  );
export const GetTransformedDirStructureDocument = `
    query getTransformedDirStructure($folderPath: [String]!) {
  protectedQuery {
    getTransformedDirStruct(folderPath: $folderPath)
  }
}
    `;
export const useGetTransformedDirStructureQuery = <
  TData = GetTransformedDirStructureQuery,
  TError = unknown
>(
  variables: GetTransformedDirStructureQueryVariables,
  options?: UseQueryOptions<GetTransformedDirStructureQuery, TError, TData>
) =>
  useQuery<GetTransformedDirStructureQuery, TError, TData>(
    ['getTransformedDirStructure', variables],
    useAxios<GetTransformedDirStructureQuery, GetTransformedDirStructureQueryVariables>(
      GetTransformedDirStructureDocument
    ).bind(null, variables),
    options
  );
export const GetErrorsDocument = `
    query getErrors($input: [String]!) {
  protectedQuery {
    checkErrors(input: $input) {
      files
      count
    }
  }
}
    `;
export const useGetErrorsQuery = <TData = GetErrorsQuery, TError = unknown>(
  variables: GetErrorsQueryVariables,
  options?: UseQueryOptions<GetErrorsQuery, TError, TData>
) =>
  useQuery<GetErrorsQuery, TError, TData>(
    ['getErrors', variables],
    useAxios<GetErrorsQuery, GetErrorsQueryVariables>(GetErrorsDocument).bind(null, variables),
    options
  );
export const GetReportTypesDocument = `
    query getReportTypes {
  protectedQuery {
    getReportType
  }
}
    `;
export const useGetReportTypesQuery = <TData = GetReportTypesQuery, TError = unknown>(
  variables?: GetReportTypesQueryVariables,
  options?: UseQueryOptions<GetReportTypesQuery, TError, TData>
) =>
  useQuery<GetReportTypesQuery, TError, TData>(
    variables === undefined ? ['getReportTypes'] : ['getReportTypes', variables],
    useAxios<GetReportTypesQuery, GetReportTypesQueryVariables>(GetReportTypesDocument).bind(
      null,
      variables
    ),
    options
  );
export const GetReportStatusDocument = `
    query getReportStatus($dbName: String) {
  protectedQuery {
    getreportStatus(dbName: $dbName) {
      status
      data
    }
  }
}
    `;
export const useGetReportStatusQuery = <TData = GetReportStatusQuery, TError = unknown>(
  variables?: GetReportStatusQueryVariables,
  options?: UseQueryOptions<GetReportStatusQuery, TError, TData>
) =>
  useQuery<GetReportStatusQuery, TError, TData>(
    variables === undefined ? ['getReportStatus'] : ['getReportStatus', variables],
    useAxios<GetReportStatusQuery, GetReportStatusQueryVariables>(GetReportStatusDocument).bind(
      null,
      variables
    ),
    options
  );

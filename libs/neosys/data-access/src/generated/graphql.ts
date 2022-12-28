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
  Amount: any;
  Any: unknown;
  Cursor: string;
  Date: string;
  Email: any;
  InvalidData: Record<string, Array<string>>;
  Localized: Record<'local' | 'en' | 'np', string>;
  Map: Record<string, string>;
  Time: string;
};

export type AdministrationQuery = {
  all: Array<Province>;
  districts: Array<Result>;
  municipalities: Array<Result>;
  provinces: Array<Result>;
  wards: Array<Scalars['Int']>;
};

export type AdministrationQueryDistrictsArgs = {
  provinceId?: InputMaybe<Scalars['Int']>;
};

export type AdministrationQueryMunicipalitiesArgs = {
  districtId?: InputMaybe<Scalars['Int']>;
  provinceId?: InputMaybe<Scalars['Int']>;
};

export type AdministrationQueryWardsArgs = {
  districtId: Scalars['Int'];
  municipalityId: Scalars['Int'];
  provinceId: Scalars['Int'];
};

export type AdministrativeAddress = {
  district: District;
  locality?: Maybe<Scalars['String']>;
  municipality: Municipality;
  province: Province;
  wardNo: Scalars['Int'];
};

export enum AllModules {
  AccountingSystem = 'ACCOUNTING_SYSTEM',
  AlternativeChannels = 'ALTERNATIVE_CHANNELS',
  BusinessIntelligenceAndReporting = 'BUSINESS_INTELLIGENCE_AND_REPORTING',
  BusinessProcessManagement = 'BUSINESS_PROCESS_MANAGEMENT',
  CapacityAndTrainingManagement = 'CAPACITY_AND_TRAINING_MANAGEMENT',
  ComplianceManagement = 'COMPLIANCE_MANAGEMENT',
  CoreBankingSystem = 'CORE_BANKING_SYSTEM',
  DocumentManagement = 'DOCUMENT_MANAGEMENT',
  FixedAssetManagement = 'FIXED_ASSET_MANAGEMENT',
  HrManagement = 'HR_MANAGEMENT',
  InventoryManagement = 'INVENTORY_MANAGEMENT',
  MemberAndShareManagement = 'MEMBER_AND_SHARE_MANAGEMENT',
  QualityAssuranceForNefscun = 'QUALITY_ASSURANCE_FOR_NEFSCUN',
}

export enum Arrange {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type AuthorizationError = {
  code: Scalars['Int'];
  message: Scalars['String'];
};

export type BadRequestError = {
  code: Scalars['Int'];
  message: Scalars['String'];
};

export type Base = {
  createdAt: Scalars['Time'];
  createdBy: Identity;
  id: Scalars['ID'];
  modifiedAt: Scalars['Time'];
  modifiedBy: Identity;
  objState: ObjState;
};

export enum BranchCategory {
  BranchOffice = 'BRANCH_OFFICE',
  ContactOffice = 'CONTACT_OFFICE',
  ExtensionCounter = 'EXTENSION_COUNTER',
  HeadOffice = 'HEAD_OFFICE',
  RegionalOffice = 'REGIONAL_OFFICE',
  ServiceCenter = 'SERVICE_CENTER',
}

export enum ComparatorType {
  EqualTo = 'EqualTo',
  GreaterThan = 'GreaterThan',
  LessThan = 'LessThan',
}

export type Condition = {
  column: Scalars['String'];
  comparator: ComparatorType;
  value: Scalars['Any'];
};

export type ContactPerson = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNo?: Maybe<Scalars['String']>;
};

export type ContactPersonInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNo?: InputMaybe<Scalars['String']>;
};

export type Coordinate = {
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type CoordinateInput = {
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
};

export type DbCreateResult = {
  error?: Maybe<MutationError>;
  recordId?: Maybe<Scalars['ID']>;
};

export type District = {
  id: Scalars['Int'];
  municipalities: Array<Municipality>;
  name: Scalars['String'];
  nameNp: Scalars['String'];
};

export type Filter = {
  orConditions: Array<OrConditions>;
};

export type HeadOfficeDetailsInput = {
  emailAddress?: InputMaybe<Scalars['String']>;
  establishedDate?: InputMaybe<Scalars['Localized']>;
  headOfficeAddress?: InputMaybe<OrganizationAddressDetailsInput>;
  headOfficeName?: InputMaybe<Scalars['String']>;
  managerContactNo?: InputMaybe<Scalars['String']>;
  managerEmail?: InputMaybe<Scalars['String']>;
  managerName?: InputMaybe<Scalars['String']>;
  phoneNo?: InputMaybe<Scalars['String']>;
  serviceCentreCode?: InputMaybe<Scalars['String']>;
};

export enum Id_Type {
  Account = 'ACCOUNT',
  Address = 'ADDRESS',
  Bank = 'BANK',
  Bankbranch = 'BANKBRANCH',
  Branch = 'BRANCH',
  Chartsofaccount = 'CHARTSOFACCOUNT',
  Customfield = 'CUSTOMFIELD',
  Declaration = 'DECLARATION',
  Depositiro = 'DEPOSITIRO',
  Depositproduct = 'DEPOSITPRODUCT',
  Depositproductcriteria = 'DEPOSITPRODUCTCRITERIA',
  Deposittds = 'DEPOSITTDS',
  Document = 'DOCUMENT',
  Documentreference = 'DOCUMENTREFERENCE',
  Dynamicentry = 'DYNAMICENTRY',
  Formfield = 'FORMFIELD',
  Formoption = 'FORMOPTION',
  Formsection = 'FORMSECTION',
  Kymaccountoperatordetails = 'KYMACCOUNTOPERATORDETAILS',
  Kymcoopaccountoperatordetails = 'KYMCOOPACCOUNTOPERATORDETAILS',
  Kymcoopdirectordetails = 'KYMCOOPDIRECTORDETAILS',
  Kymcooperative = 'KYMCOOPERATIVE',
  Kymcooperativeunion = 'KYMCOOPERATIVEUNION',
  Kymcooperativeunionpers = 'KYMCOOPERATIVEUNIONPERS',
  Kymdocument = 'KYMDOCUMENT',
  Kymfield = 'KYMFIELD',
  Kymfieldoption = 'KYMFIELDOPTION',
  Kymidentification = 'KYMIDENTIFICATION',
  Kymindividual = 'KYMINDIVIDUAL',
  Kymindividualfamilymembers = 'KYMINDIVIDUALFAMILYMEMBERS',
  Kymindividualincomesource = 'KYMINDIVIDUALINCOMESOURCE',
  Kymindividualoccupation = 'KYMINDIVIDUALOCCUPATION',
  Kyminstitutions = 'KYMINSTITUTIONS',
  Kymsisterconcerndetails = 'KYMSISTERCONCERNDETAILS',
  Loanproduct = 'LOANPRODUCT',
  Loanproductcriteria = 'LOANPRODUCTCRITERIA',
  Member = 'MEMBER',
  Myrauser = 'MYRAUSER',
  Myrauseridetification = 'MYRAUSERIDETIFICATION',
  Organization = 'ORGANIZATION',
  Productdocument = 'PRODUCTDOCUMENT',
  Sharebalance = 'SHAREBALANCE',
  Shareextracharges = 'SHAREEXTRACHARGES',
  Sharenumbers = 'SHARENUMBERS',
  Shareregister = 'SHAREREGISTER',
  User = 'USER',
  Userpreference = 'USERPREFERENCE',
}

export type Identity = {
  id: Scalars['ID'];
  name: Scalars['String'];
  userType: UserType;
  username: Scalars['String'];
};

export type Municipality = {
  id: Scalars['Int'];
  name: Scalars['String'];
  nameNp: Scalars['String'];
  wards: Array<Scalars['Int']>;
};

export type Mutation = {
  neosys: NeosysMutation;
  presignedUrl: PresignedUrlMutation;
};

export type MutationError =
  | AuthorizationError
  | BadRequestError
  | NotFoundError
  | ServerError
  | ValidationError;

export enum NatureOfCooperative {
  AgricultureCooperative = 'AGRICULTURE_COOPERATIVE',
  HealthCooperative = 'HEALTH_COOPERATIVE',
  MultipurposeCooperative = 'MULTIPURPOSE_COOPERATIVE',
  Others = 'OTHERS',
  SavingAndCredit = 'SAVING_AND_CREDIT',
}

export type NeosysAuthMutation = {
  login?: Maybe<NeosysLoginResult>;
  token?: Maybe<NeosysAuthTokenResult>;
};

export type NeosysAuthMutationLoginArgs = {
  data: NeosysLoginInput;
};

export type NeosysAuthMutationTokenArgs = {
  refreshToken: Scalars['String'];
};

export type NeosysAuthQuery = {
  me: NeosysMeResult;
};

export type NeosysAuthToken = {
  access: Scalars['String'];
  refresh: Scalars['String'];
};

export type NeosysAuthTokenResult = {
  error?: Maybe<MutationError>;
  token?: Maybe<NeosysAuthToken>;
};

export type NeosysClientFilter = {
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ObjState>;
};

export type NeosysClientMinimalInfo = {
  clientName?: Maybe<Scalars['String']>;
  dateJoined?: Maybe<Scalars['String']>;
  dbCreated?: Maybe<Scalars['Boolean']>;
  districtId?: Maybe<Scalars['String']>;
  houseNo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  localGovernmentId?: Maybe<Scalars['String']>;
  locality?: Maybe<Scalars['String']>;
  provinceId?: Maybe<Scalars['String']>;
  wardNo?: Maybe<Scalars['Int']>;
};

export type NeosysClientMutation = {
  add?: Maybe<OrganizationClientAddResult>;
  createDB?: Maybe<DbCreateResult>;
};

export type NeosysClientMutationAddArgs = {
  data?: InputMaybe<OrganizationClientInput>;
};

export type NeosysClientMutationCreateDbArgs = {
  saccosId: Scalars['ID'];
};

export type NeosysClientQuery = {
  list?: Maybe<Array<Maybe<NeosysClientMinimalInfo>>>;
};

export type NeosysClientQueryListArgs = {
  filter?: InputMaybe<NeosysClientFilter>;
};

export type NeosysLoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type NeosysLoginRecord = {
  token: NeosysAuthToken;
  user: NeosysUser;
};

export type NeosysLoginResult = {
  error?: Maybe<MutationError>;
  record?: Maybe<NeosysLoginRecord>;
  recordId?: Maybe<Scalars['ID']>;
};

export type NeosysMeResult = {
  data?: Maybe<NeosysUser>;
  error?: Maybe<QueryError>;
};

export type NeosysMutation = {
  auth?: Maybe<NeosysAuthMutation>;
  client?: Maybe<NeosysClientMutation>;
};

export type NeosysQuery = {
  auth?: Maybe<NeosysAuthQuery>;
  client?: Maybe<NeosysClientQuery>;
};

export type NeosysUser = Base & {
  contact?: Maybe<Scalars['String']>;
  createdAt: Scalars['Time'];
  createdBy: Identity;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['Localized'];
  id: Scalars['ID'];
  lastName: Scalars['Localized'];
  middleName: Scalars['Localized'];
  modifiedAt: Scalars['Time'];
  modifiedBy: Identity;
  objState: ObjState;
  username: Scalars['String'];
};

export type NotFoundError = {
  code: Scalars['Int'];
  message: Scalars['String'];
};

export enum ObjState {
  Active = 'ACTIVE',
  Approved = 'APPROVED',
  Dormant = 'DORMANT',
  Draft = 'DRAFT',
  Inactive = 'INACTIVE',
  Submitted = 'SUBMITTED',
  Validated = 'VALIDATED',
}

export type OrConditions = {
  andConditions: Array<Condition>;
};

export type Order = {
  arrange: Arrange;
  column: Scalars['String'];
};

export type OrganizationAddressDetails = {
  coordinates?: Maybe<Coordinate>;
  districtId?: Maybe<Scalars['Int']>;
  houseNo?: Maybe<Scalars['String']>;
  localGovernmentId?: Maybe<Scalars['Int']>;
  locality?: Maybe<Scalars['String']>;
  provinceId?: Maybe<Scalars['Int']>;
  wardNo?: Maybe<Scalars['Int']>;
};

export type OrganizationAddressDetailsInput = {
  coordinates?: InputMaybe<CoordinateInput>;
  districtId?: InputMaybe<Scalars['Int']>;
  houseNo?: InputMaybe<Scalars['String']>;
  localGovernmentId?: InputMaybe<Scalars['Int']>;
  locality?: InputMaybe<Scalars['String']>;
  provinceId?: InputMaybe<Scalars['Int']>;
  wardNo?: InputMaybe<Scalars['Int']>;
};

export type OrganizationClient = {
  addressDetails?: Maybe<OrganizationAddressDetails>;
  contactDetails?: Maybe<OrganizationClientContactDetails>;
  documents?: Maybe<OrganizationClientDocuments>;
  license?: Maybe<OrganizationInstallmentLicense>;
  mainContactPerson?: Maybe<ContactPerson>;
  modules?: Maybe<Array<Maybe<AllModules>>>;
  natureOfCoop?: Maybe<NatureOfCooperative>;
  organizationCode?: Maybe<Scalars['String']>;
  organizationLogo?: Maybe<Scalars['String']>;
  organizationName?: Maybe<Scalars['String']>;
  organizationType?: Maybe<OrganizationType>;
  registrationDetails?: Maybe<Array<Maybe<OrganizationRegistrationDetails>>>;
  securitySetup?: Maybe<OrganizationSecuritySetup>;
  technicalContactPerson?: Maybe<ContactPerson>;
  urlSlug?: Maybe<Scalars['String']>;
  workingArea?: Maybe<Array<Maybe<OrganizationAddressDetails>>>;
};

export type OrganizationClientAddResult = {
  error?: Maybe<MutationError>;
  record?: Maybe<OrganizationClient>;
  recordId?: Maybe<Scalars['ID']>;
};

export type OrganizationClientContactDetails = {
  email?: Maybe<Scalars['String']>;
  officePhone?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type OrganizationClientDocuments = {
  agmOrBodDocument?: Maybe<Array<Maybe<Scalars['String']>>>;
  latestAuditReport?: Maybe<Array<Maybe<Scalars['String']>>>;
  logo?: Maybe<Array<Maybe<Scalars['String']>>>;
  minuteOfCentralRep?: Maybe<Array<Maybe<Scalars['String']>>>;
  moaOrAoa?: Maybe<Array<Maybe<Scalars['String']>>>;
  panCertificate?: Maybe<Array<Maybe<Scalars['String']>>>;
  registeredCertificate?: Maybe<Array<Maybe<Scalars['String']>>>;
  taxClearance?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type OrganizationClientDocumentsInput = {
  agmOrBodDocument?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  latestAuditReport?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  logo?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  minuteOfCentralRep?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  moaOrAoa?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  panCertificate?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  registeredCertificate?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  taxClearance?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OrganizationClientInput = {
  addressDetails?: InputMaybe<OrganizationAddressDetailsInput>;
  contactDetails?: InputMaybe<OrganizationContactDetailsInput>;
  documents?: InputMaybe<OrganizationClientDocumentsInput>;
  headOfficeDetails?: InputMaybe<HeadOfficeDetailsInput>;
  license?: InputMaybe<OrganizationInstallmentLicense>;
  mainContactPerson?: InputMaybe<ContactPersonInput>;
  modules?: InputMaybe<Array<InputMaybe<AllModules>>>;
  natureOfCoop?: InputMaybe<NatureOfCooperative>;
  organizationCode?: InputMaybe<Scalars['String']>;
  organizationLogo?: InputMaybe<Scalars['String']>;
  organizationName?: InputMaybe<Scalars['String']>;
  organizationType?: InputMaybe<OrganizationType>;
  registrationDetails?: InputMaybe<Array<InputMaybe<OrganizationRegistrationDetailsInput>>>;
  securitySetup?: InputMaybe<OrganizationSecuritySetup>;
  technicalContactPerson?: InputMaybe<ContactPersonInput>;
  urlSlug?: InputMaybe<Scalars['String']>;
  workingArea?: InputMaybe<Array<InputMaybe<OrganizationAddressDetailsInput>>>;
};

export type OrganizationClientRegistrationDetails = {
  panOrVatNo?: Maybe<Scalars['String']>;
  registeredAddress?: Maybe<Scalars['String']>;
  registeredDate?: Maybe<Scalars['String']>;
  registeredNo?: Maybe<Scalars['String']>;
  registeredOffice?: Maybe<Scalars['String']>;
};

export type OrganizationContactDetailsInput = {
  email?: InputMaybe<Scalars['String']>;
  officePhone?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export enum OrganizationInstallmentLicense {
  Basic = 'BASIC',
  Professional = 'PROFESSIONAL',
  Standard = 'STANDARD',
}

export type OrganizationRegistrationDetails = {
  panOrVat?: Maybe<Scalars['String']>;
  regdAddress?: Maybe<Scalars['String']>;
  regdNo?: Maybe<Scalars['String']>;
  regdOffice?: Maybe<Scalars['String']>;
};

export type OrganizationRegistrationDetailsInput = {
  panOrVatNo?: InputMaybe<Scalars['String']>;
  registeredAddress?: InputMaybe<Scalars['String']>;
  registeredDate?: InputMaybe<Scalars['String']>;
  registeredNo?: InputMaybe<Scalars['String']>;
  registeredOffice?: InputMaybe<Scalars['String']>;
};

export enum OrganizationSecuritySetup {
  PureSass = 'PURE_SASS',
  Vpn = 'VPN',
}

export enum OrganizationType {
  CooperativeUnion = 'COOPERATIVE_UNION',
  DistrictUnion = 'DISTRICT_UNION',
  Preliminary = 'PRELIMINARY',
  ProvinceUnion = 'PROVINCE_UNION',
}

export type PageInfo = {
  endCursor?: Maybe<Scalars['Cursor']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['Cursor']>;
};

export type Pagination = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Order>;
};

export type PresignedUrlMutation = {
  upload?: Maybe<PresignedUrlOutput>;
};

export type PresignedUrlMutationUploadArgs = {
  contentType?: InputMaybe<Scalars['String']>;
};

export type PresignedUrlOutput = {
  filename?: Maybe<Scalars['String']>;
  getUrl?: Maybe<Scalars['String']>;
  putUrl?: Maybe<Scalars['String']>;
};

export type Province = {
  districts: Array<District>;
  id: Scalars['Int'];
  name: Scalars['String'];
  nameNp: Scalars['String'];
};

export type Query = {
  administration: AdministrationQuery;
  neosys: NeosysQuery;
};

export type QueryError = AuthorizationError | BadRequestError | NotFoundError | ServerError;

export type Result = {
  id: Scalars['Int'];
  name: Scalars['String'];
  nameNp: Scalars['String'];
};

export type ServerError = {
  code: Scalars['Int'];
  message: Scalars['String'];
};

export enum Transaction_Direction {
  Purchased = 'PURCHASED',
  Sold = 'SOLD',
}

export enum TextFormat {
  Email = 'EMAIL',
  IPv4 = 'IPv4',
  IPv6 = 'IPv6',
}

export enum UserType {
  Human = 'HUMAN',
  System = 'SYSTEM',
}

export type ValidationError = {
  code: Scalars['Int'];
  message: Scalars['InvalidData'];
};

export type LoginMutationVariables = Exact<{
  data: NeosysLoginInput;
}>;

export type LoginMutation = {
  neosys: {
    auth?: {
      login?: {
        recordId?: string | null;
        record?: {
          token: { access: string; refresh: string };
          user: {
            id: string;
            objState: ObjState;
            username: string;
            firstName: Record<'local' | 'en' | 'np', string>;
            middleName: Record<'local' | 'en' | 'np', string>;
            lastName: Record<'local' | 'en' | 'np', string>;
          };
        } | null;
      } | null;
    } | null;
  };
};

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;

export type RefreshMutation = {
  neosys: {
    auth?: {
      token?: {
        token?: { access: string; refresh: string } | null;
        error?:
          | MutationError_AuthorizationError_Fragment
          | MutationError_BadRequestError_Fragment
          | MutationError_NotFoundError_Fragment
          | MutationError_ServerError_Fragment
          | MutationError_ValidationError_Fragment
          | null;
      } | null;
    } | null;
  };
};

export type AddNewClientMutationVariables = Exact<{
  data?: InputMaybe<OrganizationClientInput>;
}>;

export type AddNewClientMutation = {
  neosys: {
    client?: {
      add?: {
        recordId?: string | null;
        error?:
          | MutationError_AuthorizationError_Fragment
          | MutationError_BadRequestError_Fragment
          | MutationError_NotFoundError_Fragment
          | MutationError_ServerError_Fragment
          | MutationError_ValidationError_Fragment
          | null;
      } | null;
    } | null;
  };
};

export type CreateDbMutationVariables = Exact<{
  saccosID: Scalars['ID'];
}>;

export type CreateDbMutation = {
  neosys: {
    client?: {
      createDB?: {
        recordId?: string | null;
        error?:
          | MutationError_AuthorizationError_Fragment
          | MutationError_BadRequestError_Fragment
          | MutationError_NotFoundError_Fragment
          | MutationError_ServerError_Fragment
          | MutationError_ValidationError_Fragment
          | null;
      } | null;
    } | null;
  };
};

export type AllAdministrationQueryVariables = Exact<{ [key: string]: never }>;

export type AllAdministrationQuery = {
  administration: {
    all: Array<{
      id: number;
      name: string;
      districts: Array<{
        id: number;
        name: string;
        municipalities: Array<{ id: number; name: string; wards: Array<number> }>;
      }>;
    }>;
  };
};

export type GetAllProvinceQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProvinceQuery = {
  administration: { provinces: Array<{ id: number; name: string }> };
};

export type GetAllDistrictsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllDistrictsQuery = {
  administration: { districts: Array<{ id: number; name: string }> };
};

export type GetAllLocalGovernmentQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllLocalGovernmentQuery = {
  administration: { municipalities: Array<{ id: number; name: string }> };
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  neosys: {
    auth?: {
      me: {
        data?: { id: string; username: string; email?: string | null } | null;
        error?:
          | MutationError_AuthorizationError_Fragment
          | MutationError_BadRequestError_Fragment
          | MutationError_NotFoundError_Fragment
          | MutationError_ServerError_Fragment
          | null;
      };
    } | null;
  };
};

export type GetClientsListQueryVariables = Exact<{ [key: string]: never }>;

export type GetClientsListQuery = {
  neosys: {
    client?: {
      list?: Array<{
        id?: string | null;
        clientName?: string | null;
        provinceId?: string | null;
        districtId?: string | null;
        localGovernmentId?: string | null;
        locality?: string | null;
        houseNo?: string | null;
        wardNo?: number | null;
        dateJoined?: string | null;
        dbCreated?: boolean | null;
      } | null> | null;
    } | null;
  };
};

type MutationError_AuthorizationError_Fragment = {
  __typename: 'AuthorizationError';
  code: number;
  authorizationErrorMsg: string;
};

type MutationError_BadRequestError_Fragment = {
  __typename: 'BadRequestError';
  code: number;
  badRequestErrorMessage: string;
};

type MutationError_NotFoundError_Fragment = {
  __typename: 'NotFoundError';
  code: number;
  notFoundErrorMsg: string;
};

type MutationError_ServerError_Fragment = {
  __typename: 'ServerError';
  code: number;
  serverErrorMessage: string;
};

type MutationError_ValidationError_Fragment = {
  __typename: 'ValidationError';
  code: number;
  validationErrorMsg: Record<string, Array<string>>;
};

export type MutationErrorFragment =
  | MutationError_AuthorizationError_Fragment
  | MutationError_BadRequestError_Fragment
  | MutationError_NotFoundError_Fragment
  | MutationError_ServerError_Fragment
  | MutationError_ValidationError_Fragment;

type QueryError_AuthorizationError_Fragment = {
  __typename: 'AuthorizationError';
  code: number;
  authorizationErrorMsg: string;
};

type QueryError_BadRequestError_Fragment = {
  __typename: 'BadRequestError';
  code: number;
  badRequestErrorMessage: string;
};

type QueryError_NotFoundError_Fragment = {
  __typename: 'NotFoundError';
  code: number;
  notFoundErrorMsg: string;
};

type QueryError_ServerError_Fragment = {
  __typename: 'ServerError';
  code: number;
  serverErrorMessage: string;
};

export type QueryErrorFragment =
  | QueryError_AuthorizationError_Fragment
  | QueryError_BadRequestError_Fragment
  | QueryError_NotFoundError_Fragment
  | QueryError_ServerError_Fragment;

export type PaginationFragment = {
  startCursor?: string | null;
  endCursor?: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export const MutationErrorFragmentDoc = `
    fragment MutationError on MutationError {
  ... on BadRequestError {
    __typename
    badRequestErrorMessage: message
    code
  }
  ... on ServerError {
    __typename
    serverErrorMessage: message
    code
  }
  ... on AuthorizationError {
    __typename
    authorizationErrorMsg: message
    code
  }
  ... on ValidationError {
    __typename
    validationErrorMsg: message
    code
  }
  ... on NotFoundError {
    __typename
    notFoundErrorMsg: message
    code
  }
}
    `;
export const QueryErrorFragmentDoc = `
    fragment QueryError on QueryError {
  ... on BadRequestError {
    __typename
    badRequestErrorMessage: message
    code
  }
  ... on ServerError {
    __typename
    serverErrorMessage: message
    code
  }
  ... on AuthorizationError {
    __typename
    authorizationErrorMsg: message
    code
  }
  ... on NotFoundError {
    __typename
    notFoundErrorMsg: message
    code
  }
}
    `;
export const PaginationFragmentDoc = `
    fragment Pagination on PageInfo {
  startCursor
  endCursor
  hasNextPage
  hasPreviousPage
}
    `;
export const LoginDocument = `
    mutation login($data: NeosysLoginInput!) {
  neosys {
    auth {
      login(data: $data) {
        recordId
        record {
          token {
            access
            refresh
          }
          user {
            id
            objState
            username
            firstName
            middleName
            lastName
          }
        }
      }
    }
  }
}
    `;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ['login'],
    useAxios<LoginMutation, LoginMutationVariables>(LoginDocument),
    options
  );
export const RefreshDocument = `
    mutation refresh($refreshToken: String!) {
  neosys {
    auth {
      token(refreshToken: $refreshToken) {
        token {
          access
          refresh
        }
        error {
          ...MutationError
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useRefreshMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<RefreshMutation, TError, RefreshMutationVariables, TContext>
) =>
  useMutation<RefreshMutation, TError, RefreshMutationVariables, TContext>(
    ['refresh'],
    useAxios<RefreshMutation, RefreshMutationVariables>(RefreshDocument),
    options
  );
export const AddNewClientDocument = `
    mutation addNewClient($data: OrganizationClientInput) {
  neosys {
    client {
      add(data: $data) {
        error {
          ...MutationError
        }
        recordId
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useAddNewClientMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    AddNewClientMutation,
    TError,
    AddNewClientMutationVariables,
    TContext
  >
) =>
  useMutation<AddNewClientMutation, TError, AddNewClientMutationVariables, TContext>(
    ['addNewClient'],
    useAxios<AddNewClientMutation, AddNewClientMutationVariables>(AddNewClientDocument),
    options
  );
export const CreateDbDocument = `
    mutation createDB($saccosID: ID!) {
  neosys {
    client {
      createDB(saccosId: $saccosID) {
        recordId
        error {
          ...MutationError
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useCreateDbMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateDbMutation, TError, CreateDbMutationVariables, TContext>
) =>
  useMutation<CreateDbMutation, TError, CreateDbMutationVariables, TContext>(
    ['createDB'],
    useAxios<CreateDbMutation, CreateDbMutationVariables>(CreateDbDocument),
    options
  );
export const AllAdministrationDocument = `
    query allAdministration {
  administration {
    all {
      id
      name
      districts {
        id
        name
        municipalities {
          id
          name
          wards
        }
      }
    }
  }
}
    `;
export const useAllAdministrationQuery = <TData = AllAdministrationQuery, TError = unknown>(
  variables?: AllAdministrationQueryVariables,
  options?: UseQueryOptions<AllAdministrationQuery, TError, TData>
) =>
  useQuery<AllAdministrationQuery, TError, TData>(
    variables === undefined ? ['allAdministration'] : ['allAdministration', variables],
    useAxios<AllAdministrationQuery, AllAdministrationQueryVariables>(
      AllAdministrationDocument
    ).bind(null, variables),
    options
  );
export const GetAllProvinceDocument = `
    query getAllProvince {
  administration {
    provinces {
      id
      name
    }
  }
}
    `;
export const useGetAllProvinceQuery = <TData = GetAllProvinceQuery, TError = unknown>(
  variables?: GetAllProvinceQueryVariables,
  options?: UseQueryOptions<GetAllProvinceQuery, TError, TData>
) =>
  useQuery<GetAllProvinceQuery, TError, TData>(
    variables === undefined ? ['getAllProvince'] : ['getAllProvince', variables],
    useAxios<GetAllProvinceQuery, GetAllProvinceQueryVariables>(GetAllProvinceDocument).bind(
      null,
      variables
    ),
    options
  );
export const GetAllDistrictsDocument = `
    query getAllDistricts {
  administration {
    districts {
      id
      name
    }
  }
}
    `;
export const useGetAllDistrictsQuery = <TData = GetAllDistrictsQuery, TError = unknown>(
  variables?: GetAllDistrictsQueryVariables,
  options?: UseQueryOptions<GetAllDistrictsQuery, TError, TData>
) =>
  useQuery<GetAllDistrictsQuery, TError, TData>(
    variables === undefined ? ['getAllDistricts'] : ['getAllDistricts', variables],
    useAxios<GetAllDistrictsQuery, GetAllDistrictsQueryVariables>(GetAllDistrictsDocument).bind(
      null,
      variables
    ),
    options
  );
export const GetAllLocalGovernmentDocument = `
    query getAllLocalGovernment {
  administration {
    municipalities {
      id
      name
    }
  }
}
    `;
export const useGetAllLocalGovernmentQuery = <TData = GetAllLocalGovernmentQuery, TError = unknown>(
  variables?: GetAllLocalGovernmentQueryVariables,
  options?: UseQueryOptions<GetAllLocalGovernmentQuery, TError, TData>
) =>
  useQuery<GetAllLocalGovernmentQuery, TError, TData>(
    variables === undefined ? ['getAllLocalGovernment'] : ['getAllLocalGovernment', variables],
    useAxios<GetAllLocalGovernmentQuery, GetAllLocalGovernmentQueryVariables>(
      GetAllLocalGovernmentDocument
    ).bind(null, variables),
    options
  );
export const GetMeDocument = `
    query getMe {
  neosys {
    auth {
      me {
        data {
          id
          username
          email
        }
        error {
          ...MutationError
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useGetMeQuery = <TData = GetMeQuery, TError = unknown>(
  variables?: GetMeQueryVariables,
  options?: UseQueryOptions<GetMeQuery, TError, TData>
) =>
  useQuery<GetMeQuery, TError, TData>(
    variables === undefined ? ['getMe'] : ['getMe', variables],
    useAxios<GetMeQuery, GetMeQueryVariables>(GetMeDocument).bind(null, variables),
    options
  );
export const GetClientsListDocument = `
    query getClientsList {
  neosys {
    client {
      list {
        id
        clientName
        provinceId
        districtId
        localGovernmentId
        locality
        houseNo
        wardNo
        dateJoined
        dbCreated
      }
    }
  }
}
    `;
export const useGetClientsListQuery = <TData = GetClientsListQuery, TError = unknown>(
  variables?: GetClientsListQueryVariables,
  options?: UseQueryOptions<GetClientsListQuery, TError, TData>
) =>
  useQuery<GetClientsListQuery, TError, TData>(
    variables === undefined ? ['getClientsList'] : ['getClientsList', variables],
    useAxios<GetClientsListQuery, GetClientsListQueryVariables>(GetClientsListDocument).bind(
      null,
      variables
    ),
    options
  );

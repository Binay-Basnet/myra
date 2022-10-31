/* eslint-disable */
//This Code is auto generated by graphql-codegen, DO NOT EDIT
//You can update the queries or mutations in *.graphql to generate any new changes.
import * as Types from '../types';

import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
import { useAxios } from './axiosHelper';
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
export const SignUpDocument = `
    mutation signUp($mobileNo: String!) {
  eBanking {
    auth(type: EBANKING) {
      signUp(mobileNo: $mobileNo) {
        error {
          ...MutationError
        }
        recordId
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useSignUpMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.SignUpMutation,
    TError,
    Types.SignUpMutationVariables,
    TContext
  >
) =>
  useMutation<Types.SignUpMutation, TError, Types.SignUpMutationVariables, TContext>(
    ['signUp'],
    useAxios<Types.SignUpMutation, Types.SignUpMutationVariables>(SignUpDocument),
    options
  );
export const VerifyOtpDocument = `
    mutation verifyOTP($data: EbankingOtpInput!) {
  eBanking {
    auth(type: EBANKING) {
      verifyOtp(data: $data) {
        error {
          ...MutationError
        }
        success
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useVerifyOtpMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.VerifyOtpMutation,
    TError,
    Types.VerifyOtpMutationVariables,
    TContext
  >
) =>
  useMutation<Types.VerifyOtpMutation, TError, Types.VerifyOtpMutationVariables, TContext>(
    ['verifyOTP'],
    useAxios<Types.VerifyOtpMutation, Types.VerifyOtpMutationVariables>(VerifyOtpDocument),
    options
  );
export const SetPasswordDocument = `
    mutation setPassword($data: EbankingPasswordInput!, $userId: ID!) {
  eBanking {
    auth(type: EBANKING) {
      setPassword(data: $data, userID: $userId) {
        error {
          ...MutationError
        }
        recordId
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useSetPasswordMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.SetPasswordMutation,
    TError,
    Types.SetPasswordMutationVariables,
    TContext
  >
) =>
  useMutation<Types.SetPasswordMutation, TError, Types.SetPasswordMutationVariables, TContext>(
    ['setPassword'],
    useAxios<Types.SetPasswordMutation, Types.SetPasswordMutationVariables>(SetPasswordDocument),
    options
  );
export const EBankingLoginDocument = `
    mutation eBankingLogin($data: EbankingLoginInput!) {
  eBanking {
    auth(type: EBANKING) {
      login(data: $data) {
        recordId
        record {
          data {
            id
            cooperatives {
              id
              name
              logoUrl
              mobileNo
            }
            dob
            mobile
            name
          }
          token {
            access
            refresh
          }
        }
        error {
          ...MutationError
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useEBankingLoginMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.EBankingLoginMutation,
    TError,
    Types.EBankingLoginMutationVariables,
    TContext
  >
) =>
  useMutation<Types.EBankingLoginMutation, TError, Types.EBankingLoginMutationVariables, TContext>(
    ['eBankingLogin'],
    useAxios<Types.EBankingLoginMutation, Types.EBankingLoginMutationVariables>(
      EBankingLoginDocument
    ),
    options
  );
export const CheckAccountDocument = `
    mutation checkAccount($id: ID!, $mobileNumber: String!, $pin: Int!) {
  eBanking {
    auth(type: EBANKING) {
      checkAccount(coopId: $id, mobileNumber: $mobileNumber, pin: $pin) {
        success
        error {
          ...MutationError
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useCheckAccountMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.CheckAccountMutation,
    TError,
    Types.CheckAccountMutationVariables,
    TContext
  >
) =>
  useMutation<Types.CheckAccountMutation, TError, Types.CheckAccountMutationVariables, TContext>(
    ['checkAccount'],
    useAxios<Types.CheckAccountMutation, Types.CheckAccountMutationVariables>(CheckAccountDocument),
    options
  );
export const SetNewPinDocument = `
    mutation setNewPin($data: CooperativeConnectInput) {
  eBanking {
    auth(type: EBANKING) {
      setNewPin(data: $data) {
        record {
          name
          id
          mobile
          cooperatives {
            id
            mobileNo
          }
        }
        error {
          ...MutationError
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useSetNewPinMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.SetNewPinMutation,
    TError,
    Types.SetNewPinMutationVariables,
    TContext
  >
) =>
  useMutation<Types.SetNewPinMutation, TError, Types.SetNewPinMutationVariables, TContext>(
    ['setNewPin'],
    useAxios<Types.SetNewPinMutation, Types.SetNewPinMutationVariables>(SetNewPinDocument),
    options
  );
export const LoginToCooperativeDocument = `
    mutation loginToCooperative($cooperativeId: ID!, $pinCode: Int, $mobileNumber: String!) {
  eBanking {
    auth(type: EBANKING) {
      loginToCooperative(
        cooperativeId: $cooperativeId
        pinCode: $pinCode
        mobileNumber: $mobileNumber
      ) {
        error {
          ...MutationError
        }
        record {
          data {
            myraUserId
            cooperativeId
            cooperativeName
            cooperativeProvince
            cooperativeDistrict
            cooperativeWard
            cooperativeLocalGovt
            memberId
            memberName
            memberProfilePicId
            memberProfilePicUrl
            memberMobileNo
          }
          token {
            refresh
            access
          }
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useLoginToCooperativeMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.LoginToCooperativeMutation,
    TError,
    Types.LoginToCooperativeMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.LoginToCooperativeMutation,
    TError,
    Types.LoginToCooperativeMutationVariables,
    TContext
  >(
    ['loginToCooperative'],
    useAxios<Types.LoginToCooperativeMutation, Types.LoginToCooperativeMutationVariables>(
      LoginToCooperativeDocument
    ),
    options
  );
export const GetMyraMeDocument = `
    query getMyraMe {
  eBanking {
    auth {
      meMyraUser {
        data {
          id
          cooperatives {
            id
            name
            logoUrl
            mobileNo
          }
          name
          mobile
          dob
        }
      }
    }
  }
}
    `;
export const useGetMyraMeQuery = <TData = Types.GetMyraMeQuery, TError = unknown>(
  variables?: Types.GetMyraMeQueryVariables,
  options?: UseQueryOptions<Types.GetMyraMeQuery, TError, TData>
) =>
  useQuery<Types.GetMyraMeQuery, TError, TData>(
    variables === undefined ? ['getMyraMe'] : ['getMyraMe', variables],
    useAxios<Types.GetMyraMeQuery, Types.GetMyraMeQueryVariables>(GetMyraMeDocument).bind(
      null,
      variables
    ),
    options
  );
export const GetCoopListDocument = `
    query getCoopList {
  eBanking {
    neosysClientsList {
      id
      clientName
      localGovernmentId
    }
  }
}
    `;
export const useGetCoopListQuery = <TData = Types.GetCoopListQuery, TError = unknown>(
  variables?: Types.GetCoopListQueryVariables,
  options?: UseQueryOptions<Types.GetCoopListQuery, TError, TData>
) =>
  useQuery<Types.GetCoopListQuery, TError, TData>(
    variables === undefined ? ['getCoopList'] : ['getCoopList', variables],
    useAxios<Types.GetCoopListQuery, Types.GetCoopListQueryVariables>(GetCoopListDocument).bind(
      null,
      variables
    ),
    options
  );

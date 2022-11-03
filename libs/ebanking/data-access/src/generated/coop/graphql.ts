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
export const KymFieldDataFragmentDoc = `
    fragment KYMFieldData on KYMFieldData {
  id
  options {
    id
    value
  }
}
    `;
export const SetDefaultAccountDocument = `
    mutation setDefaultAccount($accountId: String!) {
  eBanking {
    account {
      setDefaultAccount(accountId: $accountId) {
        recordId
      }
    }
  }
}
    `;
export const useSetDefaultAccountMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.SetDefaultAccountMutation,
    TError,
    Types.SetDefaultAccountMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.SetDefaultAccountMutation,
    TError,
    Types.SetDefaultAccountMutationVariables,
    TContext
  >(
    ['setDefaultAccount'],
    useAxios<Types.SetDefaultAccountMutation, Types.SetDefaultAccountMutationVariables>(
      SetDefaultAccountDocument
    ),
    options
  );
export const ChangeCoopPinDocument = `
    mutation changeCoopPin($oldPin: String!, $newPin: String!) {
  eBanking {
    auth {
      changeCoopPin(newPin: $newPin, oldPin: $oldPin) {
        success
        error {
          ...MutationError
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useChangeCoopPinMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.ChangeCoopPinMutation,
    TError,
    Types.ChangeCoopPinMutationVariables,
    TContext
  >
) =>
  useMutation<Types.ChangeCoopPinMutation, TError, Types.ChangeCoopPinMutationVariables, TContext>(
    ['changeCoopPin'],
    useAxios<Types.ChangeCoopPinMutation, Types.ChangeCoopPinMutationVariables>(
      ChangeCoopPinDocument
    ),
    options
  );
export const ChangeMyraPasswordDocument = `
    mutation changeMyraPassword($newPassword: String!, $oldPassword: String!) {
  eBanking {
    auth {
      changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {
        success
        error {
          ...MutationError
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useChangeMyraPasswordMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.ChangeMyraPasswordMutation,
    TError,
    Types.ChangeMyraPasswordMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.ChangeMyraPasswordMutation,
    TError,
    Types.ChangeMyraPasswordMutationVariables,
    TContext
  >(
    ['changeMyraPassword'],
    useAxios<Types.ChangeMyraPasswordMutation, Types.ChangeMyraPasswordMutationVariables>(
      ChangeMyraPasswordDocument
    ),
    options
  );
export const SetChequeRequestDataDocument = `
    mutation setChequeRequestData($memberID: String!, $data: EBankingChequeRequestInput) {
  eBanking {
    cooperativeServices {
      cheque {
        request(memberID: $memberID, data: $data) {
          recordID
          error {
            ...MutationError
          }
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useSetChequeRequestDataMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.SetChequeRequestDataMutation,
    TError,
    Types.SetChequeRequestDataMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.SetChequeRequestDataMutation,
    TError,
    Types.SetChequeRequestDataMutationVariables,
    TContext
  >(
    ['setChequeRequestData'],
    useAxios<Types.SetChequeRequestDataMutation, Types.SetChequeRequestDataMutationVariables>(
      SetChequeRequestDataDocument
    ),
    options
  );
export const SetWithdrawViaCollectorRequestDataDocument = `
    mutation setWithdrawViaCollectorRequestData($memberID: String!, $data: EBankingChequeWithdrawViaCollectorInput) {
  eBanking {
    cooperativeServices {
      cheque {
        withdrawViaCollector(memberID: $memberID, data: $data) {
          recordID
        }
      }
    }
  }
}
    `;
export const useSetWithdrawViaCollectorRequestDataMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.SetWithdrawViaCollectorRequestDataMutation,
    TError,
    Types.SetWithdrawViaCollectorRequestDataMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.SetWithdrawViaCollectorRequestDataMutation,
    TError,
    Types.SetWithdrawViaCollectorRequestDataMutationVariables,
    TContext
  >(
    ['setWithdrawViaCollectorRequestData'],
    useAxios<
      Types.SetWithdrawViaCollectorRequestDataMutation,
      Types.SetWithdrawViaCollectorRequestDataMutationVariables
    >(SetWithdrawViaCollectorRequestDataDocument),
    options
  );
export const SetBlockChequeRequestDataDocument = `
    mutation setBlockChequeRequestData($memberID: String!, $data: EBankingChequeBlockInput) {
  eBanking {
    cooperativeServices {
      cheque {
        block(memberID: $memberID, data: $data) {
          recordID
        }
      }
    }
  }
}
    `;
export const useSetBlockChequeRequestDataMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.SetBlockChequeRequestDataMutation,
    TError,
    Types.SetBlockChequeRequestDataMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.SetBlockChequeRequestDataMutation,
    TError,
    Types.SetBlockChequeRequestDataMutationVariables,
    TContext
  >(
    ['setBlockChequeRequestData'],
    useAxios<
      Types.SetBlockChequeRequestDataMutation,
      Types.SetBlockChequeRequestDataMutationVariables
    >(SetBlockChequeRequestDataDocument),
    options
  );
export const ApplyForLoanDocument = `
    mutation applyForLoan($memberId: String!, $data: EBankingApplyLoanInput) {
  eBanking {
    cooperativeServices {
      loan {
        apply(memberID: $memberId, data: $data) {
          error {
            ...MutationError
          }
          recordID
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useApplyForLoanMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.ApplyForLoanMutation,
    TError,
    Types.ApplyForLoanMutationVariables,
    TContext
  >
) =>
  useMutation<Types.ApplyForLoanMutation, TError, Types.ApplyForLoanMutationVariables, TContext>(
    ['applyForLoan'],
    useAxios<Types.ApplyForLoanMutation, Types.ApplyForLoanMutationVariables>(ApplyForLoanDocument),
    options
  );
export const AddNewComplaintDocument = `
    mutation addNewComplaint($memberId: String!, $data: EBankingRegisterComplaintInput) {
  eBanking {
    cooperativeServices {
      complaint {
        register(memberID: $memberId, data: $data) {
          error {
            ...MutationError
          }
          recordID
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useAddNewComplaintMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.AddNewComplaintMutation,
    TError,
    Types.AddNewComplaintMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.AddNewComplaintMutation,
    TError,
    Types.AddNewComplaintMutationVariables,
    TContext
  >(
    ['addNewComplaint'],
    useAxios<Types.AddNewComplaintMutation, Types.AddNewComplaintMutationVariables>(
      AddNewComplaintDocument
    ),
    options
  );
export const AccountTransferDocument = `
    mutation accountTransfer($data: EbankingAccountTransferInput) {
  eBanking {
    webUtilityPayments {
      accountTransfer(data: $data) {
        record {
          amount
          destinationAccount
          remarks
          sourceAccount
          transactionCode
          transactionDate
        }
        recordId
        success
        error {
          ...MutationError
        }
      }
    }
  }
}
    ${MutationErrorFragmentDoc}`;
export const useAccountTransferMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.AccountTransferMutation,
    TError,
    Types.AccountTransferMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.AccountTransferMutation,
    TError,
    Types.AccountTransferMutationVariables,
    TContext
  >(
    ['accountTransfer'],
    useAxios<Types.AccountTransferMutation, Types.AccountTransferMutationVariables>(
      AccountTransferDocument
    ),
    options
  );
export const GetAccountListDocument = `
    query getAccountList($transactionPagination: Pagination) {
  eBanking {
    account {
      list {
        accounts {
          id
          name
          productName
          accountNumber
          isDefault
          balance
          interestRate
        }
        recentTransactions(paginate: $transactionPagination) {
          edges {
            cursor
            node {
              id
              accountId
              name
              date
              month
              transactionDirection
              amount
            }
          }
          pageInfo {
            ...Pagination
          }
        }
      }
    }
  }
}
    ${PaginationFragmentDoc}`;
export const useGetAccountListQuery = <TData = Types.GetAccountListQuery, TError = unknown>(
  variables?: Types.GetAccountListQueryVariables,
  options?: UseQueryOptions<Types.GetAccountListQuery, TError, TData>
) =>
  useQuery<Types.GetAccountListQuery, TError, TData>(
    variables === undefined ? ['getAccountList'] : ['getAccountList', variables],
    useAxios<Types.GetAccountListQuery, Types.GetAccountListQueryVariables>(
      GetAccountListDocument
    ).bind(null, variables),
    options
  );
export const GetAccountSummaryDocument = `
    query getAccountSummary {
  eBanking {
    account {
      summary {
        totalSaving
        totalLoan
      }
    }
  }
}
    `;
export const useGetAccountSummaryQuery = <TData = Types.GetAccountSummaryQuery, TError = unknown>(
  variables?: Types.GetAccountSummaryQueryVariables,
  options?: UseQueryOptions<Types.GetAccountSummaryQuery, TError, TData>
) =>
  useQuery<Types.GetAccountSummaryQuery, TError, TData>(
    variables === undefined ? ['getAccountSummary'] : ['getAccountSummary', variables],
    useAxios<Types.GetAccountSummaryQuery, Types.GetAccountSummaryQueryVariables>(
      GetAccountSummaryDocument
    ).bind(null, variables),
    options
  );
export const GetTransactionListsDocument = `
    query getTransactionLists($filter: EbankingTransactionFilter, $pagination: Pagination) {
  eBanking {
    account {
      list {
        accounts {
          id
          name
          accountNumber
        }
        recentTransactions(filter: $filter, paginate: $pagination) {
          edges {
            node {
              id
              accountId
              name
              date
              month
              transactionDirection
              amount
            }
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
  }
}
    `;
export const useGetTransactionListsQuery = <
  TData = Types.GetTransactionListsQuery,
  TError = unknown
>(
  variables?: Types.GetTransactionListsQueryVariables,
  options?: UseQueryOptions<Types.GetTransactionListsQuery, TError, TData>
) =>
  useQuery<Types.GetTransactionListsQuery, TError, TData>(
    variables === undefined ? ['getTransactionLists'] : ['getTransactionLists', variables],
    useAxios<Types.GetTransactionListsQuery, Types.GetTransactionListsQueryVariables>(
      GetTransactionListsDocument
    ).bind(null, variables),
    options
  );
export const GetAccountDetailsDocument = `
    query getAccountDetails($id: ID!, $transactionPagination: Pagination) {
  eBanking {
    account {
      get(id: $id) {
        data {
          id
          productId
          name
          accountNumber
          isDefault
          balance
          interestRate
          accountType
          accountSubType
          interestBooked
          interestEarned
          subscribedDate
          history {
            id
            balance
            date
          }
          transactions(paginate: $transactionPagination) {
            edges {
              node {
                id
                accountId
                name
                date
                month
                transactionDirection
                amount
              }
            }
            pageInfo {
              ...Pagination
            }
          }
        }
      }
    }
  }
}
    ${PaginationFragmentDoc}`;
export const useGetAccountDetailsQuery = <TData = Types.GetAccountDetailsQuery, TError = unknown>(
  variables: Types.GetAccountDetailsQueryVariables,
  options?: UseQueryOptions<Types.GetAccountDetailsQuery, TError, TData>
) =>
  useQuery<Types.GetAccountDetailsQuery, TError, TData>(
    ['getAccountDetails', variables],
    useAxios<Types.GetAccountDetailsQuery, Types.GetAccountDetailsQueryVariables>(
      GetAccountDetailsDocument
    ).bind(null, variables),
    options
  );
export const GetCoopMeDocument = `
    query getCoopMe {
  eBanking {
    auth {
      meCooperativeUser {
        data {
          defaultAccount
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
      }
    }
  }
}
    `;
export const useGetCoopMeQuery = <TData = Types.GetCoopMeQuery, TError = unknown>(
  variables?: Types.GetCoopMeQueryVariables,
  options?: UseQueryOptions<Types.GetCoopMeQuery, TError, TData>
) =>
  useQuery<Types.GetCoopMeQuery, TError, TData>(
    variables === undefined ? ['getCoopMe'] : ['getCoopMe', variables],
    useAxios<Types.GetCoopMeQuery, Types.GetCoopMeQueryVariables>(GetCoopMeDocument).bind(
      null,
      variables
    ),
    options
  );
export const GetCoopChequeServicesDocument = `
    query getCoopChequeServices {
  eBanking {
    cooperativeServices {
      cheque {
        options {
          name
          enabled
        }
      }
    }
  }
}
    `;
export const useGetCoopChequeServicesQuery = <
  TData = Types.GetCoopChequeServicesQuery,
  TError = unknown
>(
  variables?: Types.GetCoopChequeServicesQueryVariables,
  options?: UseQueryOptions<Types.GetCoopChequeServicesQuery, TError, TData>
) =>
  useQuery<Types.GetCoopChequeServicesQuery, TError, TData>(
    variables === undefined ? ['getCoopChequeServices'] : ['getCoopChequeServices', variables],
    useAxios<Types.GetCoopChequeServicesQuery, Types.GetCoopChequeServicesQueryVariables>(
      GetCoopChequeServicesDocument
    ).bind(null, variables),
    options
  );
export const GetCoopLoanServicesDocument = `
    query getCoopLoanServices {
  eBanking {
    cooperativeServices {
      loan {
        options {
          name
          enabled
          requestType
        }
      }
    }
  }
}
    `;
export const useGetCoopLoanServicesQuery = <
  TData = Types.GetCoopLoanServicesQuery,
  TError = unknown
>(
  variables?: Types.GetCoopLoanServicesQueryVariables,
  options?: UseQueryOptions<Types.GetCoopLoanServicesQuery, TError, TData>
) =>
  useQuery<Types.GetCoopLoanServicesQuery, TError, TData>(
    variables === undefined ? ['getCoopLoanServices'] : ['getCoopLoanServices', variables],
    useAxios<Types.GetCoopLoanServicesQuery, Types.GetCoopLoanServicesQueryVariables>(
      GetCoopLoanServicesDocument
    ).bind(null, variables),
    options
  );
export const GetCoopComplaintServicesDocument = `
    query getCoopComplaintServices {
  eBanking {
    cooperativeServices {
      complaint {
        options {
          name
          enabled
          requestType
        }
      }
    }
  }
}
    `;
export const useGetCoopComplaintServicesQuery = <
  TData = Types.GetCoopComplaintServicesQuery,
  TError = unknown
>(
  variables?: Types.GetCoopComplaintServicesQueryVariables,
  options?: UseQueryOptions<Types.GetCoopComplaintServicesQuery, TError, TData>
) =>
  useQuery<Types.GetCoopComplaintServicesQuery, TError, TData>(
    variables === undefined
      ? ['getCoopComplaintServices']
      : ['getCoopComplaintServices', variables],
    useAxios<Types.GetCoopComplaintServicesQuery, Types.GetCoopComplaintServicesQueryVariables>(
      GetCoopComplaintServicesDocument
    ).bind(null, variables),
    options
  );
export const GetCoopDownloadsDocument = `
    query getCoopDownloads {
  eBanking {
    cooperativeServices {
      downloads {
        options {
          name
          enabled
          requestType
        }
      }
    }
  }
}
    `;
export const useGetCoopDownloadsQuery = <TData = Types.GetCoopDownloadsQuery, TError = unknown>(
  variables?: Types.GetCoopDownloadsQueryVariables,
  options?: UseQueryOptions<Types.GetCoopDownloadsQuery, TError, TData>
) =>
  useQuery<Types.GetCoopDownloadsQuery, TError, TData>(
    variables === undefined ? ['getCoopDownloads'] : ['getCoopDownloads', variables],
    useAxios<Types.GetCoopDownloadsQuery, Types.GetCoopDownloadsQueryVariables>(
      GetCoopDownloadsDocument
    ).bind(null, variables),
    options
  );
export const GetCoopPastChequeRequestsDocument = `
    query getCoopPastChequeRequests($memberId: ID!, $filter: EBankingCooperativeServiceFilter) {
  eBanking {
    cooperativeServices {
      cheque {
        pastRequests(memberId: $memberId, filter: $filter) {
          id
          typeOfRequest
          chequeRequestType
          branch {
            name
          }
          createdDate
          serviceStatus
          collector {
            name
          }
          withdrawAmount
          withdrawDate
          chequeBlockReason
          chequeBlockNumber
          status
        }
      }
    }
  }
}
    `;
export const useGetCoopPastChequeRequestsQuery = <
  TData = Types.GetCoopPastChequeRequestsQuery,
  TError = unknown
>(
  variables: Types.GetCoopPastChequeRequestsQueryVariables,
  options?: UseQueryOptions<Types.GetCoopPastChequeRequestsQuery, TError, TData>
) =>
  useQuery<Types.GetCoopPastChequeRequestsQuery, TError, TData>(
    ['getCoopPastChequeRequests', variables],
    useAxios<Types.GetCoopPastChequeRequestsQuery, Types.GetCoopPastChequeRequestsQueryVariables>(
      GetCoopPastChequeRequestsDocument
    ).bind(null, variables),
    options
  );
export const GetComplaintsListDocument = `
    query getComplaintsList($memberId: ID!, $filter: EBankingCooperativeServiceFilter) {
  eBanking {
    cooperativeServices {
      complaint {
        history(memberID: $memberId, filter: $filter) {
          data {
            id
            feedbackDate
            detailedAccount
          }
        }
      }
    }
  }
}
    `;
export const useGetComplaintsListQuery = <TData = Types.GetComplaintsListQuery, TError = unknown>(
  variables: Types.GetComplaintsListQueryVariables,
  options?: UseQueryOptions<Types.GetComplaintsListQuery, TError, TData>
) =>
  useQuery<Types.GetComplaintsListQuery, TError, TData>(
    ['getComplaintsList', variables],
    useAxios<Types.GetComplaintsListQuery, Types.GetComplaintsListQueryVariables>(
      GetComplaintsListDocument
    ).bind(null, variables),
    options
  );
export const GetDownloadCoopListDocument = `
    query getDownloadCoopList($filter: EBankingDownloadsFilter) {
  eBanking {
    cooperativeServices {
      downloads {
        files(filter: $filter) {
          id
          name
          category
          extension
          size
          url
        }
      }
    }
  }
}
    `;
export const useGetDownloadCoopListQuery = <
  TData = Types.GetDownloadCoopListQuery,
  TError = unknown
>(
  variables?: Types.GetDownloadCoopListQueryVariables,
  options?: UseQueryOptions<Types.GetDownloadCoopListQuery, TError, TData>
) =>
  useQuery<Types.GetDownloadCoopListQuery, TError, TData>(
    variables === undefined ? ['getDownloadCoopList'] : ['getDownloadCoopList', variables],
    useAxios<Types.GetDownloadCoopListQuery, Types.GetDownloadCoopListQueryVariables>(
      GetDownloadCoopListDocument
    ).bind(null, variables),
    options
  );
export const GetLoanHistoryDocument = `
    query getLoanHistory($memberId: ID!, $filter: EBankingCooperativeServiceFilter) {
  eBanking {
    cooperativeServices {
      loan {
        history(memberId: $memberId, filter: $filter) {
          data {
            id
            activeLoanStatus
            amount
            branch {
              id
              branchCode
              name
            }
            type
          }
        }
      }
    }
  }
}
    `;
export const useGetLoanHistoryQuery = <TData = Types.GetLoanHistoryQuery, TError = unknown>(
  variables: Types.GetLoanHistoryQueryVariables,
  options?: UseQueryOptions<Types.GetLoanHistoryQuery, TError, TData>
) =>
  useQuery<Types.GetLoanHistoryQuery, TError, TData>(
    ['getLoanHistory', variables],
    useAxios<Types.GetLoanHistoryQuery, Types.GetLoanHistoryQueryVariables>(
      GetLoanHistoryDocument
    ).bind(null, variables),
    options
  );
export const GetAnnouncementListDocument = `
    query getAnnouncementList {
  eBanking {
    notification {
      announcements {
        list {
          id
          details
          summary
          title
          date
        }
      }
    }
  }
}
    `;
export const useGetAnnouncementListQuery = <
  TData = Types.GetAnnouncementListQuery,
  TError = unknown
>(
  variables?: Types.GetAnnouncementListQueryVariables,
  options?: UseQueryOptions<Types.GetAnnouncementListQuery, TError, TData>
) =>
  useQuery<Types.GetAnnouncementListQuery, TError, TData>(
    variables === undefined ? ['getAnnouncementList'] : ['getAnnouncementList', variables],
    useAxios<Types.GetAnnouncementListQuery, Types.GetAnnouncementListQueryVariables>(
      GetAnnouncementListDocument
    ).bind(null, variables),
    options
  );
export const GetEbankingDepositProductsDocument = `
    query getEbankingDepositProducts($filter: NatureOfDepositProduct!) {
  eBanking {
    products {
      depositProductList(filter: $filter) {
        data {
          id
          productName
        }
      }
    }
  }
}
    `;
export const useGetEbankingDepositProductsQuery = <
  TData = Types.GetEbankingDepositProductsQuery,
  TError = unknown
>(
  variables: Types.GetEbankingDepositProductsQueryVariables,
  options?: UseQueryOptions<Types.GetEbankingDepositProductsQuery, TError, TData>
) =>
  useQuery<Types.GetEbankingDepositProductsQuery, TError, TData>(
    ['getEbankingDepositProducts', variables],
    useAxios<Types.GetEbankingDepositProductsQuery, Types.GetEbankingDepositProductsQueryVariables>(
      GetEbankingDepositProductsDocument
    ).bind(null, variables),
    options
  );
export const GetEbankingDepositProductDocument = `
    query getEbankingDepositProduct($id: ID!) {
  eBanking {
    products {
      getDepositProduct(id: $id) {
        data {
          id
          productName
          nature
          description
          productCode {
            initialNo
            prefix
          }
          typeOfMember
          criteria
          minAge
          maxAge
          genderId
          maritalStatusId
          educationQualification
          ethnicity
          occupation
          foreignEmployment
          natureOfBusinessInstitution
          natureOFBusinessCoop
          cooperativeType
          transactionAllowed
          noOftransactionAllowed
          depositAmount {
            avgAmount
            maxAmount
            minAmount
          }
          withdrawAmountLimit {
            minAmount
            maxAmount
            avgAmount
          }
          fixedDepositAmountLimit {
            minAmount
            maxAmount
            avgAmount
          }
          depositFrequency
          penalty
          penaltyData {
            dayAfterInstallmentDate
            penaltyAmount
            penaltyLedgerMapping
            penaltyRate
          }
          rebate
          rebateData {
            dayBeforeInstallmentDate
            noOfInstallment
            rebateAmount
            rebateLedgerMapping
            rebateRate
          }
          isTenureApplicable
          tenureUnit
          minTenureUnitNumber
          maxTenureUnitNumber
          balanceLimit {
            avgAmount
            maxAmount
            minAmount
          }
          interest {
            additionalRate
            boardAuthority
            ceoAuthority
            defaultRate
            interestMethod
            maxRate
            minRate
          }
          ladderRate
          ladderRateData {
            amount
            rate
            type
          }
          postingFrequency
          maxPostingFreqDifference
          accountType
          serviceCharge {
            amount
            ledgerName
            serviceName
          }
          accountCloseCharge {
            serviceName
            amount
            ledgerName
          }
          dormantSetup {
            condition
            duration
          }
          autoOpen
          allowLoan
          percentageOfDeposit
          alternativeChannels
          alternativeChannelCharge {
            ledgerName
            amount
            serviceName
          }
          atmFacility
          atmCharge {
            ledgerName
            amount
            serviceName
          }
          isForMinors
          chequeIssue
          chequeCharge {
            ledgerName
            amount
            serviceName
          }
          supportMultiple
          staffProduct
          withdrawRestricted
          specifyWithdrawRestriction
          wealthBuildingProduct
          isMandatorySaving
          individualDocuments
          institutionDocuments
          isPrematurePenaltyApplicable
          prematurePenalty {
            penaltyRate
            penaltyLedgerMapping
            penaltyAmount
            penaltyDateType
          }
          withdrawPenalty {
            penaltyAmount
            penaltyLedgerMapping
            penaltyRate
          }
          ledgerMapping {
            interestAccuredDaily
            interestIncome
            principal
          }
        }
      }
    }
  }
}
    `;
export const useGetEbankingDepositProductQuery = <
  TData = Types.GetEbankingDepositProductQuery,
  TError = unknown
>(
  variables: Types.GetEbankingDepositProductQueryVariables,
  options?: UseQueryOptions<Types.GetEbankingDepositProductQuery, TError, TData>
) =>
  useQuery<Types.GetEbankingDepositProductQuery, TError, TData>(
    ['getEbankingDepositProduct', variables],
    useAxios<Types.GetEbankingDepositProductQuery, Types.GetEbankingDepositProductQueryVariables>(
      GetEbankingDepositProductDocument
    ).bind(null, variables),
    options
  );
export const GetEbankingDepositProductCriteriaDocument = `
    query getEbankingDepositProductCriteria($id: ID!) {
  eBanking {
    products {
      getDepositProductCriteria(productId: $id) {
        data {
          minAge
          maxAge
          gender
          maritalStatus
          occupation
          educationQualification
          ethnicity
          foreignEmployment
          institutionType
          cooperativeUnion
          cooperativeType
        }
      }
    }
  }
}
    `;
export const useGetEbankingDepositProductCriteriaQuery = <
  TData = Types.GetEbankingDepositProductCriteriaQuery,
  TError = unknown
>(
  variables: Types.GetEbankingDepositProductCriteriaQueryVariables,
  options?: UseQueryOptions<Types.GetEbankingDepositProductCriteriaQuery, TError, TData>
) =>
  useQuery<Types.GetEbankingDepositProductCriteriaQuery, TError, TData>(
    ['getEbankingDepositProductCriteria', variables],
    useAxios<
      Types.GetEbankingDepositProductCriteriaQuery,
      Types.GetEbankingDepositProductCriteriaQueryVariables
    >(GetEbankingDepositProductCriteriaDocument).bind(null, variables),
    options
  );
export const GetEbankingLoanProductTypeListDocument = `
    query getEbankingLoanProductTypeList {
  eBanking {
    products {
      loanProductTypes {
        id
        productType
        description
      }
    }
  }
}
    `;
export const useGetEbankingLoanProductTypeListQuery = <
  TData = Types.GetEbankingLoanProductTypeListQuery,
  TError = unknown
>(
  variables?: Types.GetEbankingLoanProductTypeListQueryVariables,
  options?: UseQueryOptions<Types.GetEbankingLoanProductTypeListQuery, TError, TData>
) =>
  useQuery<Types.GetEbankingLoanProductTypeListQuery, TError, TData>(
    variables === undefined
      ? ['getEbankingLoanProductTypeList']
      : ['getEbankingLoanProductTypeList', variables],
    useAxios<
      Types.GetEbankingLoanProductTypeListQuery,
      Types.GetEbankingLoanProductTypeListQueryVariables
    >(GetEbankingLoanProductTypeListDocument).bind(null, variables),
    options
  );
export const GetEbankingLoanProductSubTypeDocument = `
    query getEbankingLoanProductSubType {
  eBanking {
    products {
      loanProductSubTypes {
        id
        productSubType
        productTypeID
      }
    }
  }
}
    `;
export const useGetEbankingLoanProductSubTypeQuery = <
  TData = Types.GetEbankingLoanProductSubTypeQuery,
  TError = unknown
>(
  variables?: Types.GetEbankingLoanProductSubTypeQueryVariables,
  options?: UseQueryOptions<Types.GetEbankingLoanProductSubTypeQuery, TError, TData>
) =>
  useQuery<Types.GetEbankingLoanProductSubTypeQuery, TError, TData>(
    variables === undefined
      ? ['getEbankingLoanProductSubType']
      : ['getEbankingLoanProductSubType', variables],
    useAxios<
      Types.GetEbankingLoanProductSubTypeQuery,
      Types.GetEbankingLoanProductSubTypeQueryVariables
    >(GetEbankingLoanProductSubTypeDocument).bind(null, variables),
    options
  );
export const GetEbankingLoanProductsDocument = `
    query getEbankingLoanProducts($id: ID!) {
  eBanking {
    products {
      loanProductList(productSubTypeId: $id) {
        data {
          id
          productName
        }
      }
    }
  }
}
    `;
export const useGetEbankingLoanProductsQuery = <
  TData = Types.GetEbankingLoanProductsQuery,
  TError = unknown
>(
  variables: Types.GetEbankingLoanProductsQueryVariables,
  options?: UseQueryOptions<Types.GetEbankingLoanProductsQuery, TError, TData>
) =>
  useQuery<Types.GetEbankingLoanProductsQuery, TError, TData>(
    ['getEbankingLoanProducts', variables],
    useAxios<Types.GetEbankingLoanProductsQuery, Types.GetEbankingLoanProductsQueryVariables>(
      GetEbankingLoanProductsDocument
    ).bind(null, variables),
    options
  );
export const GetEbankingLoanProductDocument = `
    query getEbankingLoanProduct($id: ID!) {
  eBanking {
    products {
      getLoanProduct(id: $id) {
        data {
          id
          productName
          productType
          productSubType
          productNature
          description
          typeOfMember
          minAge
          maxAge
          isStaffProduct
          isInsuranceApplicable
          isTenureApplicable
          isMonthlyInstallmentCompulsory
          isPenaltyApplicable
          isRebateApplicable
          isCollateralRequired
          allowPartialInstallment
          supportMultipleAccounts
          minTenureUnitNumber
          maxTenureUnitNumber
          interest {
            minRate
            maxRate
            defaultRate
          }
        }
      }
    }
  }
}
    `;
export const useGetEbankingLoanProductQuery = <
  TData = Types.GetEbankingLoanProductQuery,
  TError = unknown
>(
  variables: Types.GetEbankingLoanProductQueryVariables,
  options?: UseQueryOptions<Types.GetEbankingLoanProductQuery, TError, TData>
) =>
  useQuery<Types.GetEbankingLoanProductQuery, TError, TData>(
    ['getEbankingLoanProduct', variables],
    useAxios<Types.GetEbankingLoanProductQuery, Types.GetEbankingLoanProductQueryVariables>(
      GetEbankingLoanProductDocument
    ).bind(null, variables),
    options
  );
export const GetEbankingLoanProductCriteriaDocument = `
    query getEbankingLoanProductCriteria($id: ID!) {
  eBanking {
    products {
      getLoanProductCriteria(productId: $id) {
        data {
          minAge
          maxAge
          gender
          ethnicity
          educationQualification
          maritalStatus
          foreignEmployment
          occupation
          institutionType
          cooperativeType
          cooperativeUnion
        }
      }
    }
  }
}
    `;
export const useGetEbankingLoanProductCriteriaQuery = <
  TData = Types.GetEbankingLoanProductCriteriaQuery,
  TError = unknown
>(
  variables: Types.GetEbankingLoanProductCriteriaQueryVariables,
  options?: UseQueryOptions<Types.GetEbankingLoanProductCriteriaQuery, TError, TData>
) =>
  useQuery<Types.GetEbankingLoanProductCriteriaQuery, TError, TData>(
    ['getEbankingLoanProductCriteria', variables],
    useAxios<
      Types.GetEbankingLoanProductCriteriaQuery,
      Types.GetEbankingLoanProductCriteriaQueryVariables
    >(GetEbankingLoanProductCriteriaDocument).bind(null, variables),
    options
  );
export const GetMemberProfileDocument = `
    query getMemberProfile {
  eBanking {
    profile {
      data {
        memberId
        name
        dobAD
        dobBS
        gender
        mobileNumber
        email
        temporaryAddress {
          district
          houseNo
          localGovernment
          locality
          state
          wardNo
          coordinates {
            latitude
            longitude
          }
        }
        permanentAddress {
          district
          houseNo
          localGovernment
          locality
          state
          wardNo
          coordinates {
            latitude
            longitude
          }
        }
        maritalStatus
        familyMembers {
          name
          relationship
        }
        photo {
          id
          url
        }
        citizenship {
          id
          url
        }
      }
    }
  }
}
    `;
export const useGetMemberProfileQuery = <TData = Types.GetMemberProfileQuery, TError = unknown>(
  variables?: Types.GetMemberProfileQueryVariables,
  options?: UseQueryOptions<Types.GetMemberProfileQuery, TError, TData>
) =>
  useQuery<Types.GetMemberProfileQuery, TError, TData>(
    variables === undefined ? ['getMemberProfile'] : ['getMemberProfile', variables],
    useAxios<Types.GetMemberProfileQuery, Types.GetMemberProfileQueryVariables>(
      GetMemberProfileDocument
    ).bind(null, variables),
    options
  );
export const GetHomeServiceListDocument = `
    query getHomeServiceList {
  eBanking {
    services {
      id
      name
      service_id
      icon
      enabled
    }
  }
}
    `;
export const useGetHomeServiceListQuery = <TData = Types.GetHomeServiceListQuery, TError = unknown>(
  variables?: Types.GetHomeServiceListQueryVariables,
  options?: UseQueryOptions<Types.GetHomeServiceListQuery, TError, TData>
) =>
  useQuery<Types.GetHomeServiceListQuery, TError, TData>(
    variables === undefined ? ['getHomeServiceList'] : ['getHomeServiceList', variables],
    useAxios<Types.GetHomeServiceListQuery, Types.GetHomeServiceListQueryVariables>(
      GetHomeServiceListDocument
    ).bind(null, variables),
    options
  );
export const GetShareSummaryDocument = `
    query getShareSummary {
  eBanking {
    share {
      summary {
        totalShare
        value
      }
    }
  }
}
    `;
export const useGetShareSummaryQuery = <TData = Types.GetShareSummaryQuery, TError = unknown>(
  variables?: Types.GetShareSummaryQueryVariables,
  options?: UseQueryOptions<Types.GetShareSummaryQuery, TError, TData>
) =>
  useQuery<Types.GetShareSummaryQuery, TError, TData>(
    variables === undefined ? ['getShareSummary'] : ['getShareSummary', variables],
    useAxios<Types.GetShareSummaryQuery, Types.GetShareSummaryQueryVariables>(
      GetShareSummaryDocument
    ).bind(null, variables),
    options
  );
export const GetEbankingShareHistoryDocument = `
    query getEbankingShareHistory {
  eBanking {
    share {
      history {
        id
        title
        date
        amount
        transactionDirection
        numberOfShares
      }
    }
  }
}
    `;
export const useGetEbankingShareHistoryQuery = <
  TData = Types.GetEbankingShareHistoryQuery,
  TError = unknown
>(
  variables?: Types.GetEbankingShareHistoryQueryVariables,
  options?: UseQueryOptions<Types.GetEbankingShareHistoryQuery, TError, TData>
) =>
  useQuery<Types.GetEbankingShareHistoryQuery, TError, TData>(
    variables === undefined ? ['getEbankingShareHistory'] : ['getEbankingShareHistory', variables],
    useAxios<Types.GetEbankingShareHistoryQuery, Types.GetEbankingShareHistoryQueryVariables>(
      GetEbankingShareHistoryDocument
    ).bind(null, variables),
    options
  );
export const GetUtilityListDocument = `
    query getUtilityList {
  eBanking {
    utilityPayments {
      id
      name
      enabled
      icon
      service_id
    }
  }
}
    `;
export const useGetUtilityListQuery = <TData = Types.GetUtilityListQuery, TError = unknown>(
  variables?: Types.GetUtilityListQueryVariables,
  options?: UseQueryOptions<Types.GetUtilityListQuery, TError, TData>
) =>
  useQuery<Types.GetUtilityListQuery, TError, TData>(
    variables === undefined ? ['getUtilityList'] : ['getUtilityList', variables],
    useAxios<Types.GetUtilityListQuery, Types.GetUtilityListQueryVariables>(
      GetUtilityListDocument
    ).bind(null, variables),
    options
  );
export const GetNewIdDocument = `
    mutation getNewId($idType: ID_TYPE) {
  newId(idType: $idType)
}
    `;
export const useGetNewIdMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.GetNewIdMutation,
    TError,
    Types.GetNewIdMutationVariables,
    TContext
  >
) =>
  useMutation<Types.GetNewIdMutation, TError, Types.GetNewIdMutationVariables, TContext>(
    ['getNewId'],
    useAxios<Types.GetNewIdMutation, Types.GetNewIdMutationVariables>(GetNewIdDocument),
    options
  );

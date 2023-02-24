import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberKymDetailsLoanQuery,
  useGetMemberKymDetailsOverviewQuery,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { LoanTable } from './LoanAccountTable';

type LoanProps = {
  isClosedAccount?: boolean;
};

export const LoanAccountList = ({ isClosedAccount }: LoanProps) => {
  const router = useRouter();

  const memberDetails = useGetMemberKymDetailsLoanQuery({
    id: router.query['id'] as string,
  });

  const memberDetailsBasic = useGetMemberKymDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberType =
    memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'IndividualBasicMinInfo';

  const memberInfo =
    memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'IndividualBasicMinInfo'
      ? (memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as IndividualBasicMinInfo)
      : null;

  const memberBasicInstitution =
    memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'InstitutionBasicMinInfo'
      ? (memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as InstitutionBasicMinInfo)
      : null;

  const memberBasicCooperative =
    memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'CooperativeBasicMinInfo'
      ? (memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as CooperativeBasicMinInfo)
      : null;

  const memberBasicCooperativeUnion =
    memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'CooperativeUnionBasicMinInfo'
      ? (memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as CooperativeUnionBasicMinInfo)
      : null;

  const memberAccountDetails = memberDetails?.data?.members?.memberOverviewV2?.loan?.data?.accounts;
  const memberCloseAccountDetails =
    memberDetails?.data?.members?.memberOverviewV2?.loan?.data?.closedAccounts;

  const memberBasicDetails =
    memberInfo ?? memberBasicInstitution ?? memberBasicCooperative ?? memberBasicCooperativeUnion;

  const contactNo = memberType ? memberInfo?.contactNumber : 'N/A';

  const memberName = memberBasicDetails?.memberName;
  const memberLength = memberAccountDetails?.length;
  const closedAccountLength = memberCloseAccountDetails?.length;
  const title = !isClosedAccount
    ? `Loan Accounts List(${memberLength})`
    : `Closed Account List(${closedAccountLength})`;

  const memberListData =
    memberAccountDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      id: data?.accountNumber,
      accountType: data?.productType,
      accountName: data?.accountName,
      totalBalance: amountConverter(data?.totalBalance as string),
      remainingPrincipal: amountConverter(data?.remainingPrincipal as string),
      interestRate: data?.interestRate,
      accountNumber: data?.accountNumber,
      subscriptionDate: localizedDate(data?.subscriptionDate),
    })) || [];

  const closedAccountData =
    memberCloseAccountDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      id: data?.accountNumber,
      accountType: data?.productType,
      accountName: data?.accountName,
      totalBalance: amountConverter(data?.totalBalance as string),
      interestRate: data?.interestRate,
      accountNumber: data?.accountNumber,
      subscriptionDate: localizedDate(data?.closedDate),
    })) || [];

  return (
    <>
      {!isClosedAccount && (
        <DetailsCard hasTable bg="white" title={memberLength ? title : 'Loan Accounts List (0)'}>
          <LoanTable
            data={memberListData}
            memberName={memberName as string}
            contactNo={contactNo as string}
          />
        </DetailsCard>
      )}

      {isClosedAccount && (
        <DetailsCard
          hasTable
          bg="white"
          title={closedAccountLength ? title : 'Closed Accounts (0)'}
        >
          <LoanTable
            isClosedAccount
            data={closedAccountData}
            memberName={memberName as string}
            contactNo={contactNo as string}
          />
        </DetailsCard>
      )}
    </>
  );
};

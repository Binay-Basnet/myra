import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsLoanQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

import { LoanTable } from './LoanAccountTable';

export const LoanAccountList = () => {
  const router = useRouter();

  const memberDetails = useGetMemberKymDetailsLoanQuery({
    id: router.query['id'] as string,
  });
  // const memberDetailsBasic = useGetMemberKymDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const typename = memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data
  //   ?.basicInformation?.__typename as string;

  // const memberInfo =
  //   memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
  //     ?.__typename === 'IndividualBasicMinInfo'
  //     ? (memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data
  //         ?.basicInformation as IndividualBasicMinInfo)
  //     : null;

  // const memberBasicInstitution =
  //   memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
  //     ?.__typename === 'InstitutionBasicMinInfo'
  //     ? (memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data
  //         ?.basicInformation as InstitutionBasicMinInfo)
  //     : null;

  // const memberBasicCooperative =
  //   memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
  //     ?.__typename === 'CooperativeBasicMinInfo'
  //     ? (memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data
  //         ?.basicInformation as CooperativeBasicMinInfo)
  //     : null;
  // const memberBasicCooperativeUnion =
  //   memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
  //     ?.__typename === 'CooperativeUnionBasicMinInfo'
  //     ? (memberDetailsBasic?.data?.members?.memberOverviewV2?.overview?.data
  //         ?.basicInformation as CooperativeUnionBasicMinInfo)
  //     : null;

  const memberAccountDetails = memberDetails?.data?.members?.memberOverviewV2?.loan?.data?.accounts;

  // const memberBasicDetails =
  //   memberInfo ?? memberBasicInstitution ?? memberBasicCooperative ?? memberBasicCooperativeUnion;

  // const contactNo = {
  //   IndividualBasicMinInfo: memberInfo?.contactNumber,
  //   InstitutionBasicMinInfo: '-',
  //   CooperativeBasicMinInfo: '-',
  //   CooperativeUnionBasicMinInfo: '-',
  // };

  // const memberName = memberBasicDetails?.memberName;
  const memberLength = memberAccountDetails?.length;
  const title = `Loan Accounts List(${memberLength})`;

  const memberListData =
    memberAccountDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      id: data?.accountNumber,
      accountType: data?.productType,
      accountName: data?.accountName,
      totalBalance: amountConverter(data?.totalBalance as string),
      interestRate: data?.interestRate,
      accountNumber: data?.accountNumber,
    })) || [];

  return (
    <DetailsCard hasTable bg="white" title={memberLength ? title : 'Loan Accounts List (0)'}>
      <LoanTable
        data={memberListData}
        // memberName={memberName as string}
        // accountNumber={item?.accountNumber as string}
        // contactNo={contactNo[typename] as string}
        // accountName={item?.accountName as string}
      />
    </DetailsCard>
  );
};

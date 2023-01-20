import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const TransactionProfileDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitution =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.transactionProfileDetails
      : null;

  return (
    // const router = useRouter();
    // const memberDetails = useGetMemberDetailsOverviewQuery({
    //   id: router.query['id'] as string,
    // });

    // const memberBasicInfo =
    //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
    <DetailsCard title="Transaction Profile Details" bg="white" hasThreeRows>
      <DetailCardContent title="Nature of Transaction" subtitle={bioDataInstitution?.nature} />
      <DetailCardContent title="Annual Transaction" subtitle={bioDataInstitution?.annualTurnover} />
      <DetailCardContent
        title="Initial Deposit Amount"
        subtitle={bioDataInstitution?.initialDepositAmount}
      />
      <DetailCardContent
        title="Expected Monthly Turnover"
        subtitle={bioDataInstitution?.expectedMonthlyTurnover}
      />
      <DetailCardContent
        title="Expected Monthly Transaction"
        subtitle={bioDataInstitution?.expectedMonthlyTransaction}
      />
    </DetailsCard>
  );
};

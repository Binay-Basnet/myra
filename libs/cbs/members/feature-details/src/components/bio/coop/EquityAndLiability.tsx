import { DetailCardContent, DetailsCard } from '@myra-ui';

export const EquityAndLiabilityCOOP = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Equity and Liabilities" bg="white" hasThreeRows>
    <DetailCardContent title="Share Capital" subtitle="" />
    <DetailCardContent title="Reserve and Surplus" subtitle="" />
    <DetailCardContent title="Saving/Deposit" subtitle="" />
    <DetailCardContent title="Loan Account (External Loan)" subtitle="" />
    <DetailCardContent title="Capital Grant" subtitle="" />
  </DetailsCard>
);

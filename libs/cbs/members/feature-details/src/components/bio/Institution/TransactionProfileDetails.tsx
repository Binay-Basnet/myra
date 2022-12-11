import { DetailCardContent, DetailsCard } from '@myra-ui';

export const TransactionProfileDetails = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Transaction Profile Details" bg="white" hasThreeRows>
    <DetailCardContent title="Nature of Transaction" subtitle="" />
    <DetailCardContent title="Annual Transaction" subtitle="" />
    <DetailCardContent title="Initial Deposit Amount" subtitle="" />
    <DetailCardContent title="Expected Monthly Turnover" subtitle="" />
    <DetailCardContent title="Expected Monthly Transaction" subtitle="" />
  </DetailsCard>
);

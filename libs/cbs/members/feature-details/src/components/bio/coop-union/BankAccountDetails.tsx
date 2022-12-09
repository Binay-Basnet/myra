import { DetailCardContent, DetailsCard } from '@myra-ui';

export const BankAccountDetails = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Basic Account Details" bg="white" hasThreeRows>
    <DetailCardContent title="Name of Bank " subtitle="" />
    <DetailCardContent title="Account Number" subtitle="" />
    <DetailCardContent title="Account Name" subtitle="" />
  </DetailsCard>
);

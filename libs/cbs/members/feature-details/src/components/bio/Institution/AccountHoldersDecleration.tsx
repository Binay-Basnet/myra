import { DetailCardContent, DetailsCard } from '@myra-ui';

export const AccountHolderDecleration = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Account Holder Declaration" bg="white" hasThreeRows>
    <DetailCardContent title="Name" subtitle="" />
    <DetailCardContent title="Phone" subtitle="" />
    <DetailCardContent title="Email" subtitle="" />
  </DetailsCard>
);

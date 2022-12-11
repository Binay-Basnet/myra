import { DetailCardContent, DetailsCard } from '@myra-ui';

export const AdditionalCoopDetails = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Additional Cooperative Details " bg="white" hasThreeRows>
    <DetailCardContent title="Cooperative Type" subtitle="" />
    <DetailCardContent title="Main Service / Product" subtitle="" />
  </DetailsCard>
);

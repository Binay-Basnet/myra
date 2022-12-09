import { DetailCardContent, DetailsCard } from '@myra-ui';

export const ServiceCenterAddress = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Service Centre Office Address" bg="white" hasThreeRows>
    <DetailCardContent title="Province" subtitle="" />
    <DetailCardContent title="District" subtitle="" />
    <DetailCardContent title="Local Government" subtitle="" />
    <DetailCardContent title="Ward No" subtitle="" />
    <DetailCardContent title="Locality" subtitle="" />
    <DetailCardContent title="House No" subtitle="" />
  </DetailsCard>
);

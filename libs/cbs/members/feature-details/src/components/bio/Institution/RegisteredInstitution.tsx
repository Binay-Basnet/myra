import { DetailCardContent, DetailsCard } from '@myra-ui';

export const RegisteredDetails = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Registered Details" bg="white" hasThreeRows>
    <DetailCardContent title="Registered Number" subtitle="" />
    <DetailCardContent title="Issuing Office" subtitle="" />
    <DetailCardContent title="Province" subtitle="" />
    <DetailCardContent title="District" subtitle="" />
    <DetailCardContent title="Local Government" subtitle="" />
    <DetailCardContent title="Ward No" subtitle="" />
    <DetailCardContent title="Locality" subtitle="" />
    <DetailCardContent title="House No" subtitle="" />
  </DetailsCard>
);

import { DetailCardContent, DetailsCard } from '@myra-ui';

export const NumberOfEmployeesCoop = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="No of Employees" bg="white" hasThreeRows>
    <DetailCardContent title="Male" subtitle="" />
    <DetailCardContent title="Female" subtitle="" />
    <DetailCardContent title="Total" subtitle="" />
  </DetailsCard>
);

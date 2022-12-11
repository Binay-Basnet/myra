import { DetailCardContent, DetailsCard } from '@myra-ui';

export const AccountOperationInstruction = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Account Operation Instruction Details" bg="white" hasThreeRows>
    <DetailCardContent title="Account" subtitle="" />
    <DetailCardContent title="Company Stamp Compulsory" subtitle="" />
    <DetailCardContent title="Special Instruction" subtitle="" />
  </DetailsCard>
);

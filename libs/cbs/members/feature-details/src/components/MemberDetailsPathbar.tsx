import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { Box, DetailPageHeader } from '@myra-ui';

interface PathBarProps {
  title: string;
}

export const MemberDetailsPathBar = ({ title }: PathBarProps) => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });
  const memberBasicInfo =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;

  return (
    <Box position="sticky" top="110px" w="100%" zIndex={10}>
      <DetailPageHeader
        title={title}
        member={{
          name: memberBasicInfo?.memberName as string,
          profilePicUrl: memberBasicInfo?.profilePic as string,
        }}
      />
    </Box>
  );
};

import { useRouter } from 'next/router';

import { Box, DetailPageQuickLinks, Text } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { ShareInfo, ShareTable } from '../components';

export const MemberShareInfo = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

  const links = [
    {
      title: 'New Share Issue',
      link: `${ROUTES.CBS_SHARE_ISSUE_ADD}?memberId=${id}`,
    },
    {
      title: 'New Share Return',
      link: `${ROUTES.CBS_SHARE_RETURN_ADD}?memberId=${id}`,
    },
    {
      title: 'Share Register',
      link: `${ROUTES.CBS_SHARE_REGISTER}`,
    },
  ];
  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Share
      </Text>
      <Box display="flex" flexDirection="column" gap="s16">
        <DetailPageQuickLinks links={links} />
      </Box>
      <ShareInfo />
      {/* <ShareRegister /> */}
      <ShareTable />
    </>
  );
};

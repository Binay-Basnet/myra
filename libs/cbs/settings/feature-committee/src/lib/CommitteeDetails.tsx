import { useMemo } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Icon, IconButton, PathBar, Scrollable } from '@myra-ui';

import { useGetCommitteeListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

import { CommitteeDetailSidebar } from '../components/DetailsPageSidebar';
import { CommitteeMembersTab } from '../tabs/Members';
import { OverViewTab } from '../tabs/OverView';

export const CommitteeDetails = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;
  const id = router?.query?.['id'];
  const { data } = useGetCommitteeListQuery();
  const rowData = useMemo(() => data?.settings?.general?.organization?.committee ?? [], [data]);

  const detailData = rowData?.find((d) => d?.id === id);

  return (
    <>
      {' '}
      <Box position="sticky" bg="white" top="0" zIndex="10" width="100%">
        <PathBar
          paths={[
            { label: 'Committee', link: ROUTES.SETTINGS_GENERAL_COMMITTEE },
            { label: detailData?.name ?? '', link: '' },
          ]}
          button={
            <IconButton
              variant="ghost"
              aria-label="close"
              color="gray.500"
              height="40px"
              icon={<Icon as={IoClose} size="lg" />}
              onClick={() => {
                router.push(ROUTES.SETTINGS_GENERAL_COMMITTEE);
              }}
            />
          }
        />
      </Box>
      <Box display="flex">
        <Box
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
          overflowY="auto"
        >
          <CommitteeDetailSidebar />
        </Box>
        <Scrollable detailPage>
          <Box
            display="flex"
            p="s16"
            flexDir="column"
            gap="s16"
            ml="320px"
            bg="background.500"
            minH="calc(100vh - 170px)"
          >
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverViewTab />}

            {tabQuery === 'members' && <CommitteeMembersTab />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

import { useRouter } from 'next/router';

import { Box, PageHeader, Scrollable } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { MeetingDetailsSideBar } from './components/MeetingsDetailsSidebar';
import { useMeetingDetailsHook } from './hooks/useMeetingDetails';
import { Minutes } from './tabs/Minutes';
import { Overview } from './tabs/OVerview';

export const BPMMeetingsDetails = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;
  const { detailData } = useMeetingDetailsHook();
  const paths = [
    {
      label: 'Meetings',
      link: ROUTES.BPM_PROGRAMS_MEETINGS_LIST,
    },

    {
      label: `${detailData?.overview?.title}`,
      link: `${ROUTES.BPM_PROGRAMS_MEETINGS_DETAILS}?id=${router?.query['id']}`,
    },
  ];

  return (
    <>
      <PageHeader paths={paths} />

      <Box display="flex">
        <Box
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
          overflowY="auto"
        >
          <MeetingDetailsSideBar />
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
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}
            {tabQuery === 'minutes' && <Minutes />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

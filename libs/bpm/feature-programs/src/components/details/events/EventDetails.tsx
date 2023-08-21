import { useRouter } from 'next/router';

import { Box, PageHeader, Scrollable } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { EventDetailsSideBar } from './components/EventDetailsSidebar';
import { useEventsDetailsHook } from './hooks/useEventsDetails';
import { AnnouncementTab } from './tabs/Announcements';
import { Overview } from './tabs/OVerview';

export const BPMEventsDetails = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;
  const { detailData } = useEventsDetailsHook();
  const paths = [
    {
      label: 'Events',
      link: ROUTES.BPM_PROGRAMS_EVENTS_LIST,
    },

    {
      label: `${detailData?.overview?.eventName}`,
      link: `${ROUTES.BPM_PROGRAMS_EVENTS_DETAILS}?id=${router?.query['id']}`,
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
          <EventDetailsSideBar />
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
            {tabQuery === 'announcements' && <AnnouncementTab />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

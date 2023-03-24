import { useRouter } from 'next/router';

import { Box, DetailPageTabs, Scrollable } from '@myra-ui';

import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';

import {
  DailyInterestBooking,
  DormantCheck,
  InterestPosting,
  LoanInterestBooking,
  LoanRepayment,
  MaturityCheck,
} from '../tabs';

/* eslint-disable-next-line */
export interface EodHistoryDetailProps {}

const tabItems = [
  { title: 'Errors', key: 'errors' },
  { title: 'Success', key: 'success' },
];

export const EodHistoryDetail = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      <SettingsPageHeader heading="Day End" tabItems={tabItems} />

      <Box display="flex">
        <Box
          bg="gray.0"
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <DetailPageTabs
            tabs={[
              'Daily Interest Booking',
              'Interest Posting',
              'Loan Interest Booking',
              'Maturity Check',
              'Dormant Check',
              'Loan Repayment',
              // 'ACTIVITY', 'DOCUMENTS', 'TASKS'
            ]}
          />
        </Box>

        <Scrollable detailPage>
          <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
            {(tabQuery === 'daily interest booking' || tabQuery === 'undefined' || !tabQuery) && (
              <DailyInterestBooking />
            )}
            {tabQuery === 'interest posting' && <InterestPosting />}
            {tabQuery === 'loan interest booking' && <LoanInterestBooking />}
            {tabQuery === 'maturity check' && <MaturityCheck />}
            {tabQuery === 'dormant check' && <DormantCheck />}
            {tabQuery === 'loan repayment' && <LoanRepayment />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

export default EodHistoryDetail;

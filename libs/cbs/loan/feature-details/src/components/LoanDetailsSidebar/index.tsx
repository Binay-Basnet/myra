import { Box, DetailPageMemberCard, DetailPageTabs } from '@coop/shared/ui';

import { LoanProductSummary } from '../LoanProductSummary';
import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanDetailsSidebar = () => {
  const { member } = useLoanDetails();

  return (
    <>
      <Box borderBottom="1px" borderBottomColor="border.layout">
        <DetailPageMemberCard
          id={member?.id.slice(0, 16) as string}
          name={member?.name?.local as string}
          profilePicUrl={member?.profilePicUrl as string}
        />
      </Box>
      <LoanProductSummary />
      <DetailPageTabs tabs={['OVERVIEW', 'DOCUMENTS', 'ACTIVITY', 'REPORTS', 'TASKS']} />
    </>
  );
};

import { Box, DetailPageMemberCard, DetailPageTabs } from '@myra-ui';

import { LoanProductSummary } from '../LoanProductSummary';
import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanDetailsSidebar = () => {
  const { loanPreview } = useLoanDetails();

  return (
    <>
      <Box borderBottom="1px" borderBottomColor="border.layout">
        <DetailPageMemberCard
          id={loanPreview?.member?.code as string}
          name={loanPreview?.member?.name?.local as string}
          profilePicUrl={loanPreview?.member?.profilePicUrl as string}
        />
      </Box>
      <LoanProductSummary />
      <DetailPageTabs
        tabs={[
          'OVERVIEW',
          // 'DOCUMENTS', 'ACTIVITY', 'REPORTS', 'TASKS'
        ]}
      />
    </>
  );
};

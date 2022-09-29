import { DetailCardContent, DetailsCard, Grid } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanStatistics = () => {
  const { loanPreview } = useLoanDetails();

  return (
    <DetailsCard title="Statistics" hasTable>
      <Grid templateColumns="repeat(3, 1fr)">
        <DetailCardContent
          title="Total Payable Amount"
          subtitle={`Rs. ${loanPreview?.statistics?.totalPayableAmount ?? 0}`}
        />
        <DetailCardContent
          title="Total Paid Amount"
          subtitle={`Rs. ${loanPreview?.statistics?.totalPaidAmount ?? 0}`}
        />
        <DetailCardContent
          title="Remaining Payable Amount"
          subtitle={`Rs. ${loanPreview?.statistics?.remainingPayableAmount ?? 0}`}
        />
      </Grid>
    </DetailsCard>
  );
};

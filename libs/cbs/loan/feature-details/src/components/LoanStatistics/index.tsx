import { DetailCardContent, DetailsCard, Grid } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanStatistics = () => {
  const { loanPreview } = useLoanDetails();

  return (
    <DetailsCard title="Statistics" hasTable>
      <Grid templateColumns="repeat(3, 1fr)">
        <DetailCardContent
          title="Total Payable Amount"
          subtitle={`Rs. ${amountConverter(loanPreview?.statistics?.totalPayableAmount ?? 0)}`}
        />
        <DetailCardContent
          title="Total Paid Amount"
          subtitle={`Rs. ${amountConverter(loanPreview?.statistics?.totalPaidAmount ?? 0)}`}
        />
        <DetailCardContent
          title="Remaining Payable Amount"
          subtitle={`Rs. ${amountConverter(loanPreview?.statistics?.remainingPayableAmount ?? 0)}`}
        />
      </Grid>
    </DetailsCard>
  );
};

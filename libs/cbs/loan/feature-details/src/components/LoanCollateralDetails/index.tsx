import { Table } from '@coop/shared/table';
import { DetailsCard } from '@myra-ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanCollateralDetails = () => {
  const { loanPreview } = useLoanDetails();

  if (!loanPreview?.collateralAndGuarantees || loanPreview?.collateralAndGuarantees?.length === 0) {
    return null;
  }

  return (
    <DetailsCard
      hasTable
      title="Collateral and Guarantee Details"
      subTitle="Details about the valuation for loan amount"
    >
      {loanPreview?.collateralAndGuarantees && loanPreview?.collateralAndGuarantees?.length !== 0 && (
        <Table
          data={loanPreview?.collateralAndGuarantees.map((d, index) => ({ ...d, id: index + 1 }))}
          variant="report"
          size="small"
          isStatic
          columns={[
            { header: 'S.No', accessorKey: 'id', meta: { width: '100px' } },
            { header: 'Name', accessorKey: 'name', meta: { width: '200px' } },
            { header: 'Valuation', accessorKey: 'valuation', meta: { isNumeric: true } },
          ]}
        />
      )}
    </DetailsCard>
  );
};

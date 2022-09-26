import { Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanCollateralDetails = () => {
  const { loan } = useLoanDetails();

  const collaterals =
    loan?.collateralData?.map((collateral) => ({
      name: collateral?.ownerName,
      valuation: collateral?.valuationAmount,
    })) ?? [];

  const guarentees =
    loan?.gurantee_details?.map((guarantee) => ({
      name: guarantee?.accountName,
      valuation: guarantee?.guranteeAmount,
    })) ?? [];

  const finalData = [...collaterals, ...guarentees].map((d, index) => ({ id: index + 1, ...d }));

  return (
    <DetailsCard
      hasTable
      title="Collateral and Guarantee Details"
      subTitle="Details about the valuation for loan amount"
    >
      {finalData.length !== 0 && (
        <Table
          data={finalData}
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

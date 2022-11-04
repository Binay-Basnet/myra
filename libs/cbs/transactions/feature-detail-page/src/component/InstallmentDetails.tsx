import { useMemo } from 'react';

import { Column, Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type InstallmentDetailsProps = {
  data:
    | ({
        installmentNo?: number | null | undefined;
        payment?: string | null | undefined;
        principalAmount?: string | null | undefined;
        interestAmount?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
};

export const InstallmentDetails = ({ data }: InstallmentDetailsProps) => {
  const { t } = useTranslation();

  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['transDetailSN'],
        accessorFn: (row) => row?.installmentNo,
      },
      {
        header: t['transDetailInstallmentNo'],
        accessorFn: (row) => row?.installmentNo,
      },
      {
        header: t['transDetailPayment'],
        accessorFn: (row) => row?.payment,
      },
      {
        header: t['transDetailPrincipalAmount'],
        accessorFn: (row) => row?.principalAmount,
      },
      {
        header: t['transDetailInterestAmount'],
        accessorFn: (row) => row?.interestAmount,
      },
    ],
    []
  );
  return (
    <DetailsCard title={t['transDetailInstallmentDetails']} hasTable>
      <Table showFooter isStatic isLoading={false} data={rowData ?? []} columns={columns} />
    </DetailsCard>
  );
};

import { useMemo } from 'react';

import { DetailsCard } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { amountConverter, useTranslation } from '@coop/shared/utils';

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
        id: '1',
        header: t['transDetailSN'],
        accessorFn: (row) => row?.installmentNo,
      },
      {
        id: '2',
        header: t['transDetailInstallmentNo'],
        accessorFn: (row) => row?.installmentNo,
      },
      {
        id: '3',
        header: t['transDetailPayment'],
        accessorFn: (row) => row?.payment,
      },
      {
        id: '4',
        header: t['transDetailPrincipalAmount'],
        accessorFn: (row) => amountConverter(row?.principalAmount ?? 0),
      },
      {
        id: '5',
        header: t['transDetailInterestAmount'],
        accessorFn: (row) => amountConverter(row?.interestAmount ?? 0),
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

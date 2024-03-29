import { useMemo } from 'react';

import { DetailsCard, Text, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { BalanceType } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { usePurchaseDetailsHook } from '../hooks/usePurchaseEntry';

type GlTransactionDetailProps = {
  data:
    | ({
        account: string;
        serviceCenter?: string | null | undefined;
        debit?: string | null | undefined;
        credit?: string | null | undefined;
        ledgerId?: string | null | undefined;
        balance?: string | null | undefined;
        balanceType?: BalanceType | null | undefined;
      } | null)[]
    | null
    | undefined;
  totalDebit: string;
  totalCredit: string;
};

const GlTransaction = ({ data, totalDebit, totalCredit }: GlTransactionDetailProps) => {
  const { t } = useTranslation();
  const rowData = useMemo(() => data ?? [], [data]);

  const getTypeProps = (typeVariant: BalanceType | null | undefined) => {
    switch (typeVariant) {
      case 'DR':
        return { text: typeVariant };

      case 'CR':
        return { text: typeVariant };

      default:
        return { text: '-' };
    }
  };

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Ledger',
        footer: t['transDetailTotal'],
        id: 'ledgerName',
        accessorFn: (row) => row?.account,
        cell: (props) => {
          const accountId = props.getValue() as string;
          return (
            <RedirectButton
              link={`${ROUTES.CBS_TRANS_ALL_LEDGERS_DETAIL}?id=${props?.row?.original?.ledgerId}`}
              label={<Tooltip title={accountId} />}
            />
          );
        },
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Service Center',
        id: 'serviceCenterName',

        accessorFn: (row) => row?.serviceCenter,
      },
      {
        header: t['transDetailDebit'],
        footer: totalDebit,
        id: 'debit',

        accessorFn: (row) => amountConverter(row?.debit ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: t['transDetailCredit'],
        footer: totalCredit,
        id: 'credit',

        accessorFn: (row) => amountConverter(row?.credit ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Balance',
        id: 'balance',
        accessorFn: (row) => amountConverter(row?.balance ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: ' ',
        accessorFn: (row) => row?.balanceType,
        cell: (props) => (
          <Text fontSize="s3" fontWeight="Regular">
            {getTypeProps(props?.row?.original?.balanceType)?.text}
          </Text>
        ),
      },
    ],
    [totalDebit, totalCredit]
  );

  if (data?.length === 0) return null;
  return (
    <DetailsCard
      title="GL Transaction"
      hasTable
      // leftBtn={
      //   <Button variant="ghost" leftIcon={<IoPrintOutline />}>
      //     {t['transDetailPrintPdf']}
      //   </Button>
      // }
    >
      <Table
        isDetailPageTable
        showFooter
        isStatic
        isLoading={false}
        data={rowData ?? []}
        columns={columns}
      />
    </DetailsCard>
  );
};

export const GLTRansactionTable = () => {
  const { detailData } = usePurchaseDetailsHook();

  return (
    <GlTransaction
      data={detailData?.glTransaction}
      totalCredit={detailData?.totalCredit as string}
      totalDebit={detailData?.totalDebit as string}
    />
  );
};

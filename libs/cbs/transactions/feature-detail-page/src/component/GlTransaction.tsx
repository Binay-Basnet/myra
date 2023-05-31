import { useMemo } from 'react';

import { Box, DetailsCard, Text, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { BalanceType } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

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

export const GlTransaction = ({ data, totalDebit, totalCredit }: GlTransactionDetailProps) => {
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
            <>
              <Box
                sx={{
                  '@media print': {
                    display: 'none',
                  },
                }}
              >
                <RedirectButton
                  link={`${ROUTES.CBS_TRANS_ALL_LEDGERS_DETAIL}?id=${props?.row?.original?.ledgerId}`}
                  label={<Tooltip title={accountId} />}
                />
              </Box>
              <Box
                whiteSpace="pre-line"
                my="s4"
                display="none"
                sx={{
                  '@media print': {
                    display: 'flex',
                  },
                }}
              >
                <Text>{accountId}</Text>
              </Box>
            </>
          );
        },
        meta: {
          width: '150px',
        },
      },
      {
        header: 'Service Center',
        id: 'serviceCenterName',

        accessorFn: (row) => row?.serviceCenter,
        meta: {
          // width: '5%',
        },
      },
      {
        header: t['transDetailDebit'],
        footer: totalDebit,
        id: 'debit',

        accessorFn: (row) => amountConverter(row?.debit ?? 0),
        meta: {
          isNumeric: true,
          // width: '5%',
        },
      },
      {
        header: t['transDetailCredit'],
        footer: totalCredit,
        id: 'credit',

        accessorFn: (row) => amountConverter(row?.credit ?? 0),
        meta: {
          isNumeric: true,
          // width: '5%',
        },
      },
      {
        header: 'Balance',
        id: 'balance',
        cell: (props) => (
          <Box whiteSpace="pre-line" my="s4">
            {amountConverter(props?.row?.original?.balance ?? 0)}
          </Box>
        ),
        meta: {
          isNumeric: true,
          // width: '5%',
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
        meta: {
          width: '10px',
        },
      },
    ],
    [totalDebit, totalCredit]
  );

  if (data?.length === 0) return null;
  return (
    <DetailsCard
      title={t['transDetailGLTransactions']}
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

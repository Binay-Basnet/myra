import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { CoaView, useDeleteCoaMutation, useGetCoaFullViewQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@myra-ui/table';
import { asyncToast, TablePopover } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { arrayToTreeCOA, getArrLeafNodes } from '../../utils/arrayToTree';

const accountClass = {
  EQUITY_AND_LIABILITIES: 'Equity and Liabilities',
  ASSETS: 'Assets',
  EXPENDITURE: 'Expenditure',
  INCOME: 'Income',
};

export const COAListView = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { mutateAsync: deleteCOA } = useDeleteCoaMutation();

  const { data: fullView, isFetching } = useGetCoaFullViewQuery();

  const coaLiabilitiesFullView = useMemo(
    () =>
      fullView?.settings?.chartsOfAccount?.fullView.data
        ?.filter((account) => account?.accountClass === 'EQUITY_AND_LIABILITIES')
        .sort((a, b) =>
          Number(
            a?.accountCode?.localeCompare(b?.accountCode as string, undefined, {
              numeric: true,
              sensitivity: 'base',
            })
          )
        ) ?? [],
    [isFetching]
  );

  const coaLiabilitiesTree = useMemo(
    () => arrayToTreeCOA(coaLiabilitiesFullView as CoaView[]),
    [coaLiabilitiesFullView.length]
  );

  const coaLiablilitesLeafs = getArrLeafNodes(coaLiabilitiesTree);

  const coaAssetsFullView = useMemo(
    () =>
      fullView?.settings?.chartsOfAccount?.fullView.data
        ?.filter((account) => account?.accountClass === 'ASSETS')
        .sort((a, b) =>
          Number(
            a?.accountCode?.localeCompare(b?.accountCode as string, undefined, {
              numeric: true,
              sensitivity: 'base',
            })
          )
        ) ?? [],

    [isFetching]
  );

  const coaAssetsTree = useMemo(
    () => arrayToTreeCOA(coaAssetsFullView as CoaView[]),
    [coaAssetsFullView.length]
  );

  const coaAssetsLeafs = getArrLeafNodes(coaAssetsTree);

  const coaExpenditureFullView = useMemo(
    () =>
      fullView?.settings?.chartsOfAccount?.fullView.data
        ?.filter((account) => account?.accountClass === 'EXPENDITURE')
        .sort((a, b) => (String(a?.accountCode) > String(b?.accountCode) ? 1 : -1)) ?? [],

    [isFetching]
  );

  const coaExpenditureTree = useMemo(
    () => arrayToTreeCOA(coaExpenditureFullView as CoaView[]),
    [coaExpenditureFullView.length]
  );

  const coaExpenditureLeafs = getArrLeafNodes(coaExpenditureTree);

  const coaIncomeFullView = useMemo(
    () =>
      fullView?.settings?.chartsOfAccount?.fullView.data
        ?.filter((account) => account?.accountClass === 'INCOME')
        .sort((a, b) => (String(a?.accountCode) > String(b?.accountCode) ? 1 : -1)) ?? [],

    [isFetching]
  );

  const coaIncomeTree = useMemo(
    () => arrayToTreeCOA(coaIncomeFullView as CoaView[]),
    [coaIncomeFullView.length]
  );

  const coaIncomeLeafs = getArrLeafNodes(coaIncomeTree);

  const rowData = [
    ...coaLiablilitesLeafs,
    ...coaAssetsLeafs,
    ...coaExpenditureLeafs,
    ...coaIncomeLeafs,
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['settingsCoaTableAccountCode'],
        accessorFn: (row) => row?.accountCode,
      },
      {
        header: t['settingsCoaTableAccountName'],
        accessorFn: (row) => row?.name?.en,
        meta: {
          width: '50%',
        },
      },
      {
        header: t['settingsCoaTableAccountClass'],
        accessorFn: (row) => row?.accountClass,
        cell: (props) => (
          <span>
            {props.getValue()
              ? `${accountClass[props.getValue() as keyof typeof accountClass] as string}`
              : '-'}
          </span>
        ),
        meta: {
          width: '200px',
        },
      },

      {
        header: t['settingsCoaTableAccountParentGroup'],
        accessorFn: (row) =>
          fullView?.settings?.chartsOfAccount?.fullView.data?.find(
            (account) => account?.id === row?.under
          )?.name?.local,
        meta: {
          width: '200px',
        },
      },

      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        meta: {
          width: '60px',
        },
        cell: (props) =>
          props?.row?.original?.category === 'USER_DEFINED' ? (
            <TablePopover
              items={[
                { title: 'View Details' },
                { title: 'Edit Account' },
                {
                  title: 'Delete Account',
                  onClick: async (node) =>
                    asyncToast({
                      id: 'delete-coa',
                      msgs: {
                        loading: 'Deleting',
                        success: 'Deleted Successfully',
                      },
                      promise: deleteCOA({ id: node?.id as string }),
                      onSuccess: () => queryClient.invalidateQueries(['getCoaFullView']),
                    }),
                },
              ]}
              node={props.row.original}
            />
          ) : (
            <TablePopover
              items={[{ title: 'View Details' }, { title: 'Edit Account' }]}
              node={props.row.original}
            />
          ),
      },
    ],
    [t]
  );

  return (
    <>
      <Table data={rowData} columns={columns} isLoading={isFetching} />{' '}
    </>
  );
};

import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { CellContext } from '@tanstack/react-table';

import { useGetNewIdMutation, useGetValuatorListQuery, ValuatorEdge } from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { formatAddress } from '@coop/cbs/utils';
import { Column, Table } from '@coop/shared/table';
import { Box, TablePopover } from '@coop/shared/ui';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

const CBSSettingsValuatorPopover = ({ cell }: CellContext<ValuatorEdge, unknown>) => {
  const router = useRouter();
  return (
    <TablePopover
      node={cell?.row?.original}
      items={[
        {
          title: 'settingsValuatorViewProfile',
          onClick: (row) => {
            router.push(`/settings/general/valuator/edit/${row.node?.id}`);
          },
        },
        {
          title: 'settingsValuatorEdit',
          onClick: (row) => {
            router.push(`/settings/general/valuator/edit/${row.node?.id}`);
          },
        },
      ]}
    />
  );
};

export const CbsSettingsFeatureValuatorList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mutateAsync } = useGetNewIdMutation();

  const { data, isFetching } = useGetValuatorListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo<ValuatorEdge[]>(
    () => (data?.settings?.general?.valuator?.list?.edges as ValuatorEdge[]) ?? [],
    [data]
  );

  const columns = useMemo<Column<ValuatorEdge>[]>(
    () => [
      {
        header: t['settingsGeneralValuatorId'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.valuatorName,
        header: t['settingsGeneralValuatorValuatorName'],

        meta: {
          width: '60%',
        },
      },
      {
        header: t['settingsGeneralValuatorValuatorType'],
        cell: (row) => (
          <Box textTransform="capitalize">
            {row?.row?.original?.node?.valuatorType?.toLowerCase()}
          </Box>
        ),
      },
      {
        header: t['settingsGeneralValuatorAddress'],
        accessorFn: (row) => formatAddress(row?.node?.address),
        meta: {
          width: '50%',
        },
      },
      {
        header: t['settingsGeneralValuatorContractDate'],
        accessorFn: (row) => row?.node?.contractDate,
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: CBSSettingsValuatorPopover,
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <SettingsPageHeader
        heading={`${t['settingsGeneralValuatorValuator']} - ${featureCode?.settingsValuator}`}
        buttonLabel={t['settingsGeneralValuatorNewValuator']}
        buttonHandler={() => {
          mutateAsync({}).then((res) => {
            router.push(`/settings/general/loan/valuator/add/${res?.newId}`);
          });
        }}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.settings?.general?.valuator?.list?.totalCount ?? 'Many',
          pageInfo: data?.settings?.general?.valuator?.list?.pageInfo,
        }}
      />
    </>
  );
};

export default CbsSettingsFeatureValuatorList;

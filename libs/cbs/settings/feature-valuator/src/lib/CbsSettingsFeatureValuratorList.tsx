import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { CellContext } from '@tanstack/react-table';

import { Box, TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetNewIdMutation, useGetValuatorListQuery, ValuatorEdge } from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { formatAddress, ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

const CBSSettingsValuatorPopover = ({ cell }: CellContext<ValuatorEdge, unknown>) => {
  const router = useRouter();
  return (
    <TablePopover
      node={cell?.row?.original}
      items={[
        {
          title: 'settingsValuatorViewProfile',
        },
        {
          title: 'settingsValuatorEdit',
          onClick: (row) => {
            router.push(`${ROUTES.SETTINGS_GENERAL_LOAN_VALUATOR_EDIT}?id=${row.node?.id}`);
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
        heading={`${t['settingsGeneralValuatorValuator']} - ${featureCode?.valuatorSetting}`}
        buttonLabel={t['settingsGeneralValuatorNewValuator']}
        buttonHandler={() => {
          mutateAsync({}).then((res) => {
            router.push(`${ROUTES.SETTINGS_GENERAL_LOAN_VALUATOR_ADD}?id=${res?.newId}`);
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

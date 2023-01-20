import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetBranchListQuery } from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

export const SettingsServiceCenterTable = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = useGetBranchListQuery(
    {
      paginate: {
        ...getRouterQuery({ type: ['PAGINATION'] }),
        order: null,
      },
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.settings?.general?.branch?.list?.edges ?? [], [data]);

  // TODO (Update this, API HAS BEEN CHANGED)
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['serviceCenterCode'],
        accessorFn: (row) => row?.node?.branchCode,
      },
      {
        header: 'Service Center Name',
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: t['settingsBranchAddress'],
        accessorFn: (row) => row?.node?.address?.locality?.local,
        cell: (props) => (
          <span>
            {props?.row?.original?.node?.address?.localGovernment?.local?.split(' ')[0]} - &nbsp;
            {props?.row?.original?.node?.address?.wardNo}
          </span>
        ),
      },
      {
        header: t['settingsBranchDistrict'],
        accessorFn: (row) => row?.node?.address?.district?.local,
      },
      {
        header: t['settingsBranchManager'],
        accessorFn: (row) => row?.node?.managerName,
      },
      {
        header: t['settingsBranchContactNumber'],
        accessorFn: (row) => row?.node?.contactNumber,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original?.node}
            items={[
              {
                title: t['depositProductEdit'],
                onClick: (node) =>
                  router.push(`${ROUTES.SETTINGS_GENERAL_SERVICE_CENTER_LIST_EDIT}?id=${node?.id}`),
              },
            ]}
          />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [router.locale]
  );

  return (
    <>
      <SettingsPageHeader
        heading={`${t['serviceCenterSettings']} - ${featureCode?.serviceCenterList}`}
        buttonLabel={t['serviceCenterNew']}
        buttonHandler={() => router.push(`${ROUTES.SETTINGS_GENERAL_SERVICE_CENTER_LIST_ADD}`)}
      />

      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        pagination={{
          total: data?.settings?.general?.branch?.list?.totalCount ?? 'Many',
          pageInfo: data?.settings?.general?.branch?.list?.pageInfo,
        }}
      />
    </>
  );
};

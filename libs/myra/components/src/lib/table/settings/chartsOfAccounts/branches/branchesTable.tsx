import { useMemo } from 'react';

import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
import { useGetBranchesListQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { useRouter } from 'next/router';

export const SettingsBranchesTable = () => {
  const { t } = useTranslation();
  const route = useRouter();
  const { data, isLoading } = useGetBranchesListQuery();

  const rowData = useMemo(
    () => data?.settings?.general?.branch?.list?.edges ?? [],
    [data]
  );

  const popoverTitle = [
    'settingsBranchViewDetail',
    'settingsBranchViewBranchProfile',
  ];

  // TODO (Update this, API HAS BEEN CHANGED)
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: t['settingsBranchBranchCode'],
        accessor: 'node.branchCode',
      },

      {
        Header: t['settingsBranchAddress'],
        accessor: 'node.address.provinceId',
        maxWidth: 4,
      },

      {
        Header: t['settingsBranchDistrict'],
        accessor: 'node.address.districtId',
      },
      {
        Header: t['settingsBranchManager'],
        accessor: 'node.manager.id',
        width: '25%',
      },

      {
        Header: t['settingsBranchContactNumber'],
        accessor: 'node.contactNumber',
        maxWidth: 48,
      },

      {
        accessor: 'actions',
        width: '10%',
        Cell: () => <PopoverComponent title={popoverTitle} />,
      },
    ],
    [route.locale]
  );

  return (
    <>
      <TableListPageHeader heading={'settingsBranch'} />

      <Table
        isLoading={isLoading}
        data={rowData ?? []}
        columns={columns}
        sort={true}
      />
    </>
  );
};

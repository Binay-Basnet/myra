import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { PopoverComponent } from '@coop/myra/components';
import { useGetBranchesListQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const SettingsBranchesTable = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isFetching } = useGetBranchesListQuery();

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
        accessor: 'node.address.locality.local',
        maxWidth: 4,
      },

      {
        Header: t['settingsBranchDistrict'],
        accessor: 'node.address.district.local',
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
    [router.locale]
  );

  return (
    <>
      <SettingsPageHeader
        heading={t['settingsBranch']}
        buttonLabel={t['settingsBranchNew']}
        buttonHandler={() => router.push('/settings/general/branches/add')}
      />

      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        sort={true}
      />
    </>
  );
};

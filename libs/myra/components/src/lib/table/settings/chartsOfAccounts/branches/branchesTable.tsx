import { useMemo } from 'react';
import { useRouter } from 'next/router';

import {
  Id_Type,
  useGetBranchListQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

export const SettingsBranchesTable = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const newId = useGetNewIdMutation();

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

  const rowData = useMemo(
    () => data?.settings?.general?.branch?.list?.edges ?? [],
    [data]
  );

  const popoverTitle = [
    {
      title: 'depositProductEdit',
      onClick: (id: string) =>
        router.push(`/settings/general/branches/edit/${id}`),
    },
  ];

  // TODO (Update this, API HAS BEEN CHANGED)
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['settingsBranchBranchCode'],
        accessorFn: (row) => row?.node?.branchCode,
      },
      {
        header: t['settingsBranchAddress'],
        accessorFn: (row) => row?.node?.address?.locality?.local,
        cell: (props) => (
          <span>
            {props?.row?.original?.node?.address?.locality?.local} - &nbsp;
            {props?.row?.original?.node?.address?.wardNo}
          </span>
        ),
      },

      {
        header: t['settingsBranchDistrict'],
        accessorFn: (row) => row?.node?.address?.district?.local,
        meta: {
          width: '40%',
        },
      },
      {
        header: t['settingsBranchManager'],
        accessorFn: (row) => row?.node?.managerName,
        meta: {
          width: '30%',
        },
      },

      {
        header: t['settingsBranchContactNumber'],
        accessorFn: (row) => row?.node?.contactNumber,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <ActionPopoverComponent
            items={popoverTitle}
            id={props?.row?.original?.node?.id as string}
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
        heading={t['settingsBranch']}
        buttonLabel={t['settingsBranchNew']}
        buttonHandler={() =>
          newId
            .mutateAsync({ idType: Id_Type.Branch })
            .then((res) =>
              router.push(`/settings/general/branches/add/${res?.newId}`)
            )
        }
      />

      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        pagination={{
          total: data?.settings.general?.branch?.list?.totalCount ?? 'Many',
          pageInfo: data?.settings.general?.branch?.list?.pageInfo,
        }}
      />
    </>
  );
};

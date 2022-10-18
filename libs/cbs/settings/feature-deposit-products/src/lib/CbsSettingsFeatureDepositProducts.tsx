import { useMemo } from 'react';
import { useRouter } from 'next/router';

import {
  Id_Type,
  NatureOfDepositProduct,
  useGetDepositProductSettingsListQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { PageHeader } from '@coop/shared/ui';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

const DEPOSIT_TAB_ITEMS = [
  {
    title: 'depositProductActive',
    key: 'ACTIVE',
  },
  {
    title: 'depositProductInactive',
    key: 'INACTIVE',
  },
];

export const SettingsDepositProducts = () => <DepositProductTable />;

export const DepositProductTable = () => {
  const newId = useGetNewIdMutation();
  const router = useRouter();
  const { t } = useTranslation();
  const { data, isLoading } = useGetDepositProductSettingsListQuery(
    {
      paginate: {
        ...getRouterQuery({ type: ['PAGINATION'], query: router.query }),
        order: null,
      },
      // filter: {
      //   objState: (router.query['objState'] ?? ObjState.Active) as ObjState,
      // },
    },
    {
      staleTime: 0,
    }
  );
  const rowData = useMemo(() => data?.settings?.general?.depositProduct?.list?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'depositProductInactive',
    },
  ];
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['depositProductCode'],
        accessorFn: (row) => row?.node?.productCode,
      },

      {
        header: t['depositProductName'],
        accessorFn: (row) => row?.node?.productName,
      },
      {
        header: t['depositNature'],
        accessorFn: (row) => row?.node?.nature,
        cell: (props) => {
          const nature = props?.row?.original?.node?.nature;
          return (
            <span>
              {nature === NatureOfDepositProduct.Current && t['depositProductCurrent']}
              {nature === NatureOfDepositProduct.RecurringSaving &&
                t['depositProductRecurringSaving']}
              {nature === NatureOfDepositProduct.TermSavingOrFd && t['depositProductTermSaving']}
              {nature === NatureOfDepositProduct.Saving && t['depositProductSaving']}
            </span>
          );
        },
      },
      {
        header: t['depositInterest'],
        accessorFn: (row) => row?.node?.interest,
        cell: (props) => <span>{props?.row?.original?.node?.interest} %</span>,
      },
      {
        header: t['depositCreatedDate'],
        accessorFn: (row) => row?.node?.createdDate,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <ActionPopoverComponent items={popoverTitle} id={props?.row?.original?.node?.id} />
        ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t]
  );

  const onSubmit = () => {
    newId
      .mutateAsync({ idType: Id_Type.Depositproduct })
      .then((res) => router.push(`/settings/general/deposit-products/add/${res?.newId}`));
  };

  return (
    <>
      <PageHeader
        heading={`${t['settingsDepositProducts']} - ${featureCode?.settingsDepositProduct}`}
        tabItems={DEPOSIT_TAB_ITEMS}
        onClick={onSubmit}
        button
        buttonTitle={t['settingsDepositProductNew']}
      />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.settings?.general?.depositProduct?.list?.totalCount ?? 'Many',
          pageInfo: data?.settings?.general?.depositProduct?.list?.pageInfo,
        }}
      />
    </>
  );
};

export default SettingsDepositProducts;

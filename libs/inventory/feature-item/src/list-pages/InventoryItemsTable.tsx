import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetInventoryItemsListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const InventoryItemTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryItemsListQuery({
    pagination: getPaginationQuery(),
  });
  const router = useRouter();

  const rowItems = data?.inventory?.items?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: t['itemListID'],
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: t['itemListName'],
        accessorFn: (row) => row?.node?.name,
        meta: {
          width: '70%',
        },
      },
      {
        header: t['itemListType'],
        accessorFn: (row) => row?.node?.type,
      },

      {
        id: 'total-cost',
        header: t['itemListTotalCost'],
        accessorFn: (row) => row?.node?.costPrice,
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },

      {
        header: t['itemListItemQuantity'],
        accessorFn: (row) => row?.node?.itemQuantity,
        cell: (props) => amountConverter(props.getValue() as string),
        meta: {
          isNumeric: true,
        },
      },
      // {
      //   accessorKey: 'actions',
      //   cell: () => (
      //     <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
      //   ),
      // },
      {
        id: '_actions',
        header: '',

        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: 'Edit Items',
                  aclKey: 'CBS_MEMBERS_MEMBER',
                  action: 'VIEW',
                  onClick: () => {
                    if (props?.row?.original?.node?.isVariantItem) {
                      router.push(
                        `${ROUTES?.INVENTORY_ITEMS_VARIANT_EDIT}?id=${props?.row?.original?.node?.id}`
                      );
                    } else if (!props?.row?.original?.node?.isVariantItem) {
                      router.push(
                        `${ROUTES?.INVENTORY_ITEMS_EDIT}?id=${props?.row?.original?.node?.id}`
                      );
                    }
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '20px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading="Items" />
      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`${ROUTES.INVENTORY_ITEM_DETAILS}?id=${row?.node?.id}`);
        }}
        pagination={{
          total: data?.inventory?.items?.list?.totalCount ?? 'Many',
          pageInfo: data?.inventory?.items?.list?.pageInfo,
        }}
      />
    </>
  );
};

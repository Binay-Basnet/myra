import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { ActionPopoverComponent } from '@coop/myra/components';
import {
  NatureOfDepositProduct,
  useGetDepositProductSettingsListQuery,
  useGetNewIdMutation,
} from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box, Button, DEFAULT_PAGE_SIZE, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface SettingsDepositProductsProps {}

export function SettingsDepositProducts(props: SettingsDepositProductsProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const newId = useGetNewIdMutation();

  const { data, isLoading } = useGetDepositProductSettingsListQuery(
    router.query['before']
      ? {
          paginate: {
            last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            before: router.query['before'] as string,
          },
        }
      : {
          paginate: {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
          },
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(
    () => data?.settings?.general?.depositProduct?.list?.edges ?? [],
    [data]
  );

  const popoverTitle = [
    {
      title: 'depositProductEdit',
      onClick: (id: string) =>
        router.push(`/settings/general/deposit-products/edit/${id}`),
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
          return (
            <span>
              {props?.row?.original?.node?.nature ===
              NatureOfDepositProduct.Mandatory
                ? t['depositProductMandatory']
                : props?.row?.original?.node?.nature ===
                  NatureOfDepositProduct.RecurringSaving
                ? t['depositProductRecurringSaving']
                : props?.row?.original?.node?.nature ===
                  NatureOfDepositProduct.TermSavingOrFd
                ? t['depositProductTermSaving']
                : props?.row?.original?.node?.nature ===
                  NatureOfDepositProduct.VoluntaryOrOptional
                ? t['depositProductVoluntaryOptional']
                : ' '}
            </span>
          );
        },
      },
      {
        header: t['depositInterest'],
        accessorFn: (row) => row?.node?.interest,
        cell: (props) => {
          return <span>{props?.row?.original?.node?.interest} %</span>;
        },
      },
      {
        header: t['depositCreatedDate'],
        accessorFn: (row) => row?.node?.createdDate,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <ActionPopoverComponent
            items={popoverTitle}
            id={props?.row?.original?.node?.id}
          />
        ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <Box borderBottom="1px solid #E6E6E6" p="8px 16px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          h="100%"
        >
          <Text fontSize="r2" fontWeight="600" color="gray.800">
            {t['settingsDepositProducts']}
          </Text>
          <Button
            leftIcon={<AddIcon h="11px" />}
            onClick={() =>
              newId
                .mutateAsync({})
                .then((res) =>
                  router.push(
                    `/settings/general/deposit-products/add/${res?.newId}`
                  )
                )
            }
          >
            {t['settingsDepositProductNew']}
          </Button>
        </Box>
      </Box>

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: 1200,
          endCursor:
            data?.settings?.general?.depositProduct?.list?.pageInfo
              ?.startCursor ?? '',
          startCursor:
            data?.settings?.general?.depositProduct?.list?.pageInfo
              ?.endCursor ?? '',
        }}
      />
    </>
  );
}

export default SettingsDepositProducts;

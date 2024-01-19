import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Column, Scrollable, Table, TablePopover, Text } from '@myra-ui';

import { useViewLoanProductWithAccountQuery } from '@coop/cbs/data-access';

import { SideBar, UpdateLoanMultipleInterestRateModal } from '../components';

export const InterestBreakdownPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  const {
    isOpen: isUpdateModalOpen,
    onClose: onUpdateModalClose,
    onToggle: onUpdateModalToggle,
  } = useDisclosure();

  const { data: interestRateListData, isFetching } = useViewLoanProductWithAccountQuery(
    {
      productId: id as string,
    },
    { enabled: !!id }
  );

  const rowData = useMemo(
    () => interestRateListData?.settings?.general?.loanProducts?.ViewProductWithAccount?.data ?? [],
    [interestRateListData]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Organization Premium (%)',
        accessorKey: 'organizationPremium',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Product Premium (%)',
        accessorKey: 'productPremium',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Account Premium (%)',
        accessorKey: 'accountPremium',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Effective Interest Rate (%)',
        accessorKey: 'effectiveInterestRate',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Count',
        accessorKey: 'count',
        meta: {
          isNumeric: true,
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
          props?.row && (
            <TablePopover
              items={[
                {
                  title: 'Update Account Premium',
                  aclKey: 'CBS_LOAN_LOAN_ACCOUNT',
                  action: 'UPDATE',
                  onClick: (row) => {
                    setSelectedAccounts(row?.accountIds as string[]);
                    onUpdateModalToggle();
                  },
                },
              ]}
              node={props.row.original}
            />
          ),
      },
    ],
    []
  );

  return (
    <>
      <Box display="flex">
        <Box
          bg="gray.0"
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <SideBar />
        </Box>

        <Scrollable detailPage>
          <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
            <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
              <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
                Interest Breakdown
              </Text>
            </Box>
          </Box>
          <Box bg="background.500" ml="320px" p="s16" minH="100vh">
            <Table isStatic isLoading={isFetching} data={rowData} columns={columns} />
          </Box>
        </Scrollable>
      </Box>

      <UpdateLoanMultipleInterestRateModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setSelectedAccounts([]);
          onUpdateModalClose();
        }}
        accountIds={selectedAccounts}
      />
    </>
  );
};

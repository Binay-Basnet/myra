import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Column, Drawer, Grid, Table, Text } from '@myra-ui';

import {
  useGetEmployeeTransferDetailsQuery,
  useGetHrEmployeeTransferHistoryQuery,
} from '@coop/cbs/data-access';

const GridKeyValuePair = (props: { itemKey: string; itemValue: string; colorOfValue?: string }) => {
  const { itemKey, itemValue, colorOfValue = 'gray.800' } = props;
  return (
    <Box>
      <Text fontSize="r1" color="gray.600">
        {itemKey}
      </Text>
      <Text fontSize="r1" fontWeight="semibold" color={colorOfValue}>
        {itemValue}
      </Text>
    </Box>
  );
};

export const Transfer = () => {
  const router = useRouter();
  const [selectedTransferId, setSelectedTransferId] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data } = useGetHrEmployeeTransferHistoryQuery({
    employeeId: router?.query?.['id'] as string,
  });

  const { data: transferDetailsData } = useGetEmployeeTransferDetailsQuery(
    { transferId: selectedTransferId },
    { enabled: !!selectedTransferId }
  );

  const transferDetails =
    transferDetailsData?.hr?.employeelifecycle?.employeeTransfer?.getTransferDetails?.data;
  const transferDetailsArray = [
    {
      itemKey: 'Employee',
      itemValue: transferDetails?.employee,
      color: 'red.500',
    },
    {
      itemKey: 'Designation',
      itemValue: transferDetails?.designation,
    },

    {
      itemKey: 'Joining Date',
      itemValue: transferDetails?.joiningDate?.local,
    },

    {
      itemKey: 'Transfer Type',
      itemValue: transferDetails?.transferType,
    },

    {
      itemKey: 'New Type',
      itemValue: transferDetails?.newType,
    },
    {
      itemKey: 'Previous Type',
      itemValue: transferDetails?.previousType,
    },
    {
      itemKey: 'Transfer Date',
      itemValue: transferDetails?.transferDate?.local,
    },
    {
      itemKey: 'Transfered By',
      itemValue: transferDetails?.transferedBy,
    },
  ];

  const branchRowData = useMemo(
    () => data?.hr?.employeelifecycle?.employeeTransfer?.queryEmployeeTransfer?.branchArray ?? [],
    [data]
  );

  const departmentRowData = useMemo(
    () => data?.hr?.employeelifecycle?.employeeTransfer?.queryEmployeeTransfer?.departArray ?? [],
    [data]
  );

  const branchColumns = useMemo<Column<typeof branchRowData[0]>[]>(
    () => [
      {
        header: 'S.N',
        accessorFn: (_, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'New Type',
        accessorFn: (row) => row?.transferredTo,
      },
      {
        header: 'Previous Type',
        accessorFn: (row) => row?.transferredFrom,
      },
      {
        header: 'Date of Transfer',
        accessorFn: (row) => row?.transferDate?.local,
      },
    ],
    []
  );

  const departmentColumns = useMemo<Column<typeof departmentRowData[0]>[]>(
    () => [
      {
        header: 'S.N',
        accessorFn: (_, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'New Type',
        accessorFn: (row) => row?.transferredTo,
      },
      {
        header: 'Previous Type',
        accessorFn: (row) => row?.transferredFrom,
      },
      {
        header: 'Date of Transfer',
        accessorFn: (row) => row?.transferredDate?.local,
      },
    ],
    []
  );

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTransferId('');
  };

  return (
    <>
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Branch Transfer History
        </Text>
        <Table
          data={branchRowData}
          columns={branchColumns}
          variant="report"
          size="report"
          isStatic
          rowOnClick={(row) => {
            setSelectedTransferId(row?.id);
            setIsDrawerOpen(true);
          }}
        />
      </Box>
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Department Transfer History
        </Text>
        <Table
          data={departmentRowData}
          columns={departmentColumns}
          variant="report"
          size="report"
          isStatic
          rowOnClick={(row) => {
            setSelectedTransferId(row?.id);
            setIsDrawerOpen(true);
          }}
        />
      </Box>
      <Drawer title="Transfer History" open={isDrawerOpen} onClose={onCloseDrawer}>
        <Grid templateColumns="repeat(2,1fr)" gap="s16">
          {transferDetailsArray?.map((item) => (
            <GridKeyValuePair
              itemKey={item?.itemKey}
              itemValue={item?.itemValue}
              colorOfValue={item?.color}
            />
          ))}
        </Grid>
        <Text
          fontSize="r1"
          fontWeight="medium"
          color="red.500"
          mt="s20"
          cursor="pointer"
          onClick={onCloseDrawer}
        >
          View Transfer History
        </Text>
      </Drawer>
    </>
  );
};

export default Transfer;

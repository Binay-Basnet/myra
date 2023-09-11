import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { GridKeyValuePair } from '@hr/common';

import { Box, Column, Drawer, Grid, Table, Text } from '@myra-ui';

import {
  useGetEmployeePromotionHistoryQuery,
  useGetPromotionDetailQuery,
} from '@coop/cbs/data-access';

export const Promotion = () => {
  const router = useRouter();
  const [selectedPromotionId, setSelectedPromotionId] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data } = useGetEmployeePromotionHistoryQuery({
    employeeId: router?.query?.['id'] as string,
  });

  const { data: promotionDetailsData } = useGetPromotionDetailQuery(
    { promotionId: selectedPromotionId },
    { enabled: !!selectedPromotionId }
  );

  const promotionDetails =
    promotionDetailsData?.hr?.employeelifecycle?.employeePromotion?.GetAPromotionDetail
      ?.promotionDetails;

  const promotionDetailsArray = [
    {
      itemKey: 'Employee',
      itemValue: promotionDetails?.employeeName,
      color: 'red.500',
    },
    {
      itemKey: 'Designation',
      itemValue: promotionDetails?.designation,
    },

    {
      itemKey: 'Joining Date',
      itemValue: promotionDetails?.joiningDate?.local,
    },

    {
      itemKey: 'Promotion Type',
      itemValue: promotionDetails?.promotionType,
    },

    {
      itemKey: 'New Designation',
      itemValue: promotionDetails?.newPromotionType,
    },
    {
      itemKey: 'Current Designation',
      itemValue: promotionDetails?.oldPromotionType,
    },
    {
      itemKey: 'Promotion Date',
      itemValue: promotionDetails?.promotionDate?.local,
    },
  ];

  const designationRowData = useMemo(
    () =>
      data?.hr?.employeelifecycle?.employeePromotion?.getEmployeePromotions?.data
        ?.designationPromotions ?? [],
    [data]
  );

  const designationColumns = useMemo<Column<typeof designationRowData[0]>[]>(
    () => [
      {
        header: 'S.N',
        accessorFn: (_, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'New Promotion Type',
        accessorFn: (row) => row?.newType,
      },
      {
        header: 'Current Promotion Type',
        accessorFn: (row) => row?.currentType,
      },
      {
        header: 'Date of Promotion',
        accessorFn: (row) => row?.dateOfPromotion?.local,
      },
    ],
    []
  );

  const levelRowData = useMemo(
    () =>
      data?.hr?.employeelifecycle?.employeePromotion?.getEmployeePromotions?.data
        ?.levelPromotions ?? [],
    [data]
  );

  const levelColumns = useMemo<Column<typeof designationRowData[0]>[]>(
    () => [
      {
        header: 'S.N',
        accessorFn: (_, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'New Promotion Type',
        accessorFn: (row) => row?.newType,
      },
      {
        header: 'Current Promotion Type',
        accessorFn: (row) => row?.currentType,
      },
      {
        header: 'Date of Promotion',
        accessorFn: (row) => row?.dateOfPromotion?.local,
      },
    ],
    []
  );

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedPromotionId('');
  };

  return (
    <>
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Designation Promotion History
        </Text>
        <Table
          data={designationRowData}
          columns={designationColumns}
          variant="report"
          size="report"
          isStatic
          rowOnClick={(row) => {
            setSelectedPromotionId(row?.employeePromotionId);
            setIsDrawerOpen(true);
          }}
        />
      </Box>
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Level Promotion History
        </Text>
        <Table
          data={levelRowData}
          columns={levelColumns}
          variant="report"
          size="report"
          isStatic
          rowOnClick={(row) => {
            setSelectedPromotionId(row?.employeePromotionId);
            setIsDrawerOpen(true);
          }}
        />
      </Box>
      <Drawer title="Promotion History" open={isDrawerOpen} onClose={onCloseDrawer}>
        <Grid templateColumns="repeat(2,1fr)" gap="s16">
          {promotionDetailsArray?.map((item) => (
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
          View Promotion History
        </Text>
      </Drawer>
    </>
  );
};

export default Promotion;

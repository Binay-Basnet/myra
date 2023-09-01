import { useMemo } from 'react';
import Link from 'next/link';
import { useGetDepartmentOptions, useGetDesignationOptions } from '@hr/common';

import { Avatar, Box, Column, Divider, Drawer, Table, Text } from '@myra-ui';

import { useGetSalarySlipListQuery, useGetSingleEmployeeDetailsQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

interface SalarySlipDrawerProps {
  selectedEmployeeId?: string;
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
}

const SalarySlipDrawer = (props: SalarySlipDrawerProps) => {
  const { selectedEmployeeId, isDrawerOpen, onCloseDrawer } = props;

  const { departmentOptions } = useGetDepartmentOptions();
  const { designationOptions } = useGetDesignationOptions();

  const { data: employeeData } = useGetSingleEmployeeDetailsQuery(
    { id: selectedEmployeeId },
    { enabled: !!selectedEmployeeId }
  );

  const selectedEmployeeData = employeeData?.hr?.employee?.employee?.getEmployee?.record;
  const selectedDepartment =
    departmentOptions?.filter((item) => item?.value === selectedEmployeeData?.departmentId)?.[0]
      ?.label || '-';

  const selectedDesignation =
    designationOptions?.filter((item) => item?.value === selectedEmployeeData?.designationId)?.[0]
      ?.label || '-';

  const { data: salarySlipList, isFetching } = useGetSalarySlipListQuery(
    {
      pagination: getPaginationQuery(),
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'employeeid',
                comparator: 'EqualTo',
                value: selectedEmployeeId,
              },
            ],
          },
        ],
      },
    },
    {
      enabled: !!selectedEmployeeId,
    }
  );

  const salarySlipRowData = useMemo(
    () => salarySlipList?.hr?.payroll?.payrollRun?.listSalarySlip?.edges ?? [],
    [salarySlipList]
  );
  const salarySlipColumns = useMemo<Column<typeof salarySlipRowData[0]>[]>(
    () => [
      {
        header: 'No',
        accessorFn: (row, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'Payroll',
        cell: (node) => {
          const payrollPeriod = node?.row?.original?.node?.payrollPeriod;
          return (
            <Text>
              {payrollPeriod?.from?.local
                ? `${payrollPeriod?.from?.local} - ${payrollPeriod?.to?.local}`
                : '-'}
            </Text>
          );
        },
      },
      {
        header: 'Salary Slip',
        cell: (node) => (
          <Link target="_blank" href={node?.row?.original?.node?.salarySlipUrl}>
            <Text fontSize="s3" color="primary.500" fontWeight={500} cursor="pointer">
              View PDF
            </Text>
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <Drawer
      title={`Salary Slips for ${selectedEmployeeData?.firstName} ${selectedEmployeeData?.middleName} ${selectedEmployeeData?.lastName}`}
      open={isDrawerOpen}
      onClose={onCloseDrawer}
    >
      <Box
        display="flex"
        flexDir="column"
        border="1px"
        borderColor="border.layout"
        borderRadius={5}
      >
        <Box p="s8" display="flex" gap="s8" alignItems="center">
          <Avatar
            size="md"
            src={selectedEmployeeData?.documents?.[0]?.identifiers?.[0]?.url}
            name={selectedEmployeeData?.firstName}
          />
          <Box>
            <Text fontSize="r1" fontWeight="medium">
              {selectedEmployeeData?.firstName} {selectedEmployeeData?.middleName}{' '}
              {selectedEmployeeData?.lastName}
            </Text>
            <Text fontSize="s3" color="gray.600">
              ID: {selectedEmployeeData?.id}
            </Text>
          </Box>
        </Box>
        <Divider />
        <Box p="s8">
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="s3">Designation: {selectedDesignation}</Text>
            <Text fontSize="s3">Phone no: {selectedEmployeeData?.personalPhoneNumber}</Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="s3">Department: {selectedDepartment}</Text>
            <Text fontSize="s3">Email Address: {selectedEmployeeData?.workEmailAddress}</Text>
          </Box>
        </Box>
      </Box>
      <Divider mt="s8" mb="s16" />
      <Text fontSize="r1" fontWeight="medium">
        Salary Slip History
      </Text>

      <Table
        data={salarySlipRowData}
        columns={salarySlipColumns}
        variant="report"
        size="report"
        isStatic
        isLoading={isFetching}
      />
    </Drawer>
  );
};

export default SalarySlipDrawer;

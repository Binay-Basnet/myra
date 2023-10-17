import { useMemo, useState } from 'react';
import { isEmpty } from 'lodash';

import { Box, Collapse, Column, Drawer, Table, Text } from '@myra-ui';

import {
  UsedTypeEnum,
  useReturnAssignmentMapsEPrePostQuery,
  useReturnSalAdjustReviseMapsEPrePostQuery,
} from '@coop/cbs/data-access';
import { decimalAdjust } from '@coop/shared/utils';

interface EmployeeDrawerProps {
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
  usedType?: UsedTypeEnum;
  usedTypeId?: string;
  employeeName?: string;
}

export const EmployeeDrawer = (props: EmployeeDrawerProps) => {
  const { isDrawerOpen, onCloseDrawer, usedType, usedTypeId, employeeName } = props;

  const [earningComponentCollapse, setEarningComponentCollapse] = useState(true);
  const [deductionComponentCollapse, setDeductionComponentCollapse] = useState(true);

  const { data: salaryAssignmentData, isFetching: salaryAssignmentFetching } =
    useReturnAssignmentMapsEPrePostQuery(
      { assignmentId: usedTypeId },
      { enabled: !!usedTypeId && usedType === UsedTypeEnum?.Assignment }
    );
  const salaryAssignment =
    salaryAssignmentData?.hr?.payroll?.payrollRun?.returnAssignmentMapsEPrePost?.data;

  const { data: salaryRevisionAssignmentData, isFetching: salaryRevisionAssignmentFetching } =
    useReturnSalAdjustReviseMapsEPrePostQuery(
      { salAdjustReviseId: usedTypeId },
      { enabled: !!usedTypeId && usedType === UsedTypeEnum?.RevisionOrAdjustment }
    );

  const salaryRevisionAssignment =
    salaryRevisionAssignmentData?.hr?.payroll?.payrollRun?.returnSalAdjustReviseMapsEPrePost?.data;

  const data =
    (!isEmpty(salaryAssignment) && salaryAssignment) ||
    (!isEmpty(salaryRevisionAssignment) && salaryRevisionAssignment);

  const isFetching = salaryAssignmentFetching || salaryRevisionAssignmentFetching;

  const earningData =
    (!isEmpty(data?.earnings) &&
      Object?.entries(data?.earnings)?.map(([component, amount]) => ({
        component,
        amount,
      }))) ||
    [];

  const earningRowData = useMemo(() => earningData ?? [], [JSON.stringify(earningData)]);

  const earningColumns = useMemo<Column<typeof earningData[0]>[]>(
    () => [
      {
        header: 'Component',
        accessorFn: (row) => row?.component,
      },
      {
        header: 'Amount',
        cell: (row) => <>{decimalAdjust('round', row?.row?.original?.amount as number, -2)}</>,
      },
    ],
    [JSON.stringify(earningData)]
  );

  const deductionData =
    (!isEmpty(data?.earnings) &&
      Object?.entries(data?.earnings)?.map(([component, amount]) => ({
        component,
        amount,
      }))) ||
    [];

  const deductionRowData = useMemo(() => deductionData ?? [], [JSON.stringify(deductionData)]);

  const deductionColumns = useMemo<Column<typeof deductionRowData[0]>[]>(
    () => [
      {
        header: 'Component',
        accessorFn: (row) => row?.component,
      },
      {
        header: 'Amount',
        cell: (row) => <>{decimalAdjust('round', row?.row?.original?.amount as number, -2)}</>,
      },
    ],
    [JSON.stringify(deductionData)]
  );

  return (
    <Drawer title={employeeName} open={isDrawerOpen} onClose={onCloseDrawer}>
      <Box border="1px" borderColor="border.layout" borderRadius={5} p="s12" mb="s18">
        <Text
          mb="s28"
          fontSize="r1"
          fontWeight="medium"
          color="gray.800"
          cursor="pointer"
          onClick={() => setEarningComponentCollapse(!earningComponentCollapse)}
        >
          Earnings
        </Text>
        <Collapse in={earningComponentCollapse}>
          <Table
            data={earningRowData}
            columns={earningColumns}
            variant="report"
            size="report"
            isStatic
            isLoading={isFetching}
          />
        </Collapse>
      </Box>
      <Box border="1px" borderColor="border.layout" borderRadius={5} p="s12">
        <Text
          mb="s28"
          fontSize="r1"
          fontWeight="medium"
          color="gray.800"
          cursor="pointer"
          onClick={() => setDeductionComponentCollapse(!deductionComponentCollapse)}
        >
          Deductions
        </Text>
        <Collapse in={deductionComponentCollapse}>
          <Table
            data={deductionRowData}
            columns={deductionColumns}
            variant="report"
            size="report"
            isStatic
            isLoading={isFetching}
          />
        </Collapse>
      </Box>
    </Drawer>
  );
};

export default EmployeeDrawer;

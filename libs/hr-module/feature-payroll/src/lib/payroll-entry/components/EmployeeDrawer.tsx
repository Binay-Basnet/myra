import { useMemo, useState } from 'react';
import { isEmpty } from 'lodash';

import { Box, Collapse, Column, Drawer, Table, Text } from '@myra-ui';

import {
  UsedTypeEnum,
  useGetDeductionComponentListQuery,
  useGetEarningComponentListQuery,
  useGetSalaryStructureAssignmentQuery,
  useGetSalStructureAdjustRevisionQuery,
} from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

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

  const { data: earningComponentData } = useGetEarningComponentListQuery({
    pagination: getPaginationQuery(),
  });

  const earningComponentList =
    earningComponentData?.settings?.general?.HCM?.payroll?.earningComponent?.listEarningComponent
      ?.edges;

  const { data: deductionComponentData } = useGetDeductionComponentListQuery({
    pagination: getPaginationQuery(),
  });

  const deductionComponentList =
    deductionComponentData?.settings?.general?.HCM?.payroll?.deductionComponent
      ?.listDeductionComponent?.edges;

  const { data: salaryAssignmentData, isFetching: salaryAssignmentFetching } =
    useGetSalaryStructureAssignmentQuery(
      { id: usedTypeId },
      { enabled: !!usedTypeId && usedType === UsedTypeEnum?.Assignment }
    );
  const salaryAssignment =
    salaryAssignmentData?.hr?.payroll?.salaryStructureAssignment?.getSalaryStructureAssignment
      ?.data;

  const { data: salaryRevisionAssignmentData, isFetching: salaryRevisionAssignmentFetching } =
    useGetSalStructureAdjustRevisionQuery(
      { id: usedTypeId },
      { enabled: !!usedTypeId && usedType === UsedTypeEnum?.RevisionOrAdjustment }
    );

  const salaryRevisionAssignment =
    salaryRevisionAssignmentData?.hr?.payroll?.salStrucAdjustRevision?.getSalStructureAdjustRevision
      ?.data;

  const data =
    (!isEmpty(salaryAssignment) && salaryAssignment) ||
    (!isEmpty(salaryRevisionAssignment) && salaryRevisionAssignment);

  const isFetching = salaryAssignmentFetching || salaryRevisionAssignmentFetching;

  const earningRowData = useMemo(() => data?.earnings ?? [], [data]);

  const earningColumns = useMemo<Column<typeof earningRowData[0]>[]>(
    () => [
      {
        header: 'Component',
        accessorFn: (row) => row?.id,
        cell: (row) => {
          const filteredRowWithName = earningComponentList?.filter(
            (item) => item?.node?.id === row?.row?.original?.id
          );
          return <Text>{filteredRowWithName?.[0]?.node?.name}</Text>;
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.amount,
      },
    ],
    [JSON.stringify(earningComponentList)]
  );

  const deductionRowData = useMemo(() => data?.deductions ?? [], [data]);

  const deductionColumns = useMemo<Column<typeof earningRowData[0]>[]>(
    () => [
      {
        header: 'Component',
        accessorFn: (row) => row?.id,
        cell: (row) => {
          const filteredRowWithName = deductionComponentList?.filter(
            (item) => item?.node?.id === row?.row?.original?.id
          );
          return <Text>{filteredRowWithName?.[0]?.node?.name}</Text>;
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.amount,
      },
    ],
    [JSON.stringify(deductionComponentList)]
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

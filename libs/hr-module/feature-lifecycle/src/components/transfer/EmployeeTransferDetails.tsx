import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection, Text } from '@myra-ui';

import {
  EmployeeTransferInput,
  EmployeeTransferType,
  useGetHrEmployeeTransferHistoryQuery,
} from '@coop/cbs/data-access';

import { EmployeeTransferHistoryTable } from './EmployeeeTransferTable';

export const TransferDetailsHistory = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const { watch } = useFormContext<EmployeeTransferInput>();

  const transferType = watch('transferType');
  const employeeID = watch('employeeId');
  const { data: employeeHistory } = useGetHrEmployeeTransferHistoryQuery(
    {
      employeeId: employeeID as string,
    },
    {
      enabled: triggerQuery && !!employeeID,
    }
  );

  useEffect(() => {
    if (employeeID) {
      setTriggerQuery(true);
    }
  }, [employeeID]);
  const rowData = useMemo(
    () => employeeHistory?.hr?.employeelifecycle?.employeeTransfer?.queryEmployeeTransfer,
    [employeeHistory]
  );

  const branchHistory =
    employeeHistory?.hr?.employeelifecycle?.employeeTransfer?.queryEmployeeTransfer?.branchArray?.map(
      (data, index) => ({
        sn: Number(index) + 1,
        transferredFrom: data?.transferredFrom,
        transferredTo: data?.transferredTo,
        transferDate: data?.transferDate,
      })
    ) || [];
  const departmentHistory =
    employeeHistory?.hr?.employeelifecycle?.employeeTransfer?.queryEmployeeTransfer?.departArray?.map(
      (data, index) => ({
        sn: Number(index) + 1,
        transferredFrom: data?.transferredFrom,
        transferredTo: data?.transferredTo,
        transferDate: data?.transferredDate,
      })
    ) || [];
  return (
    <FormSection
      header={` ${
        transferType === EmployeeTransferType.Department ? 'Department' : 'Service Center'
      } Transfer History`}
      flexLayout
    >
      {(transferType === EmployeeTransferType.Department
        ? rowData?.departArray
        : rowData?.branchArray) && (
        <EmployeeTransferHistoryTable
          transferType={
            transferType === EmployeeTransferType.Department ? 'Department' : 'Service Center'
          }
          data={
            transferType === EmployeeTransferType.Department ? departmentHistory : branchHistory
          }
        />
      )}{' '}
      {!(rowData?.branchArray || rowData?.departArray) && <Text>No History Found</Text>}
    </FormSection>
  );
};

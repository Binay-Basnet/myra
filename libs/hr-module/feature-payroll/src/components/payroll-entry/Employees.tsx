import { useEffect, useState } from 'react';
import {
  useGetDepartmentOptions,
  useGetDesignationOptions,
  useGetSalaryAssignmentsWithExtraDetails,
} from '@hr/common';
import { isEmpty } from 'lodash';

import { Button, FormSection, GridItem } from '@myra-ui';

import { useGetBranchListQuery } from '@coop/cbs/data-access';
import { FormEditableTable, FormSelect } from '@coop/shared/form';

interface PayrollEmployeeType {
  methods: any;
}

export const PayrollEntryEmployees = (props: PayrollEmployeeType) => {
  const [showTable, setShowTable] = useState(false);
  const { methods } = props;
  const { watch, setValue } = methods;
  const { departmentOptions } = useGetDepartmentOptions();
  const { designationOptions } = useGetDesignationOptions();

  const { data: branchData } = useGetBranchListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const serviceCenterOptions = branchData?.settings?.general?.branch?.list?.edges?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));

  const serviceCenterWatch = watch('serviceCenter');
  const departmentWatch = watch('department');
  const designationWatch = watch('designation');

  const salaryAssignmentData = useGetSalaryAssignmentsWithExtraDetails({
    serviceCenter: serviceCenterWatch,
    department: departmentWatch,
    designation: designationWatch,
  });

  useEffect(() => {
    if (!isEmpty(salaryAssignmentData)) {
      setValue('salaryAssignments', salaryAssignmentData);
    }
  }, [JSON.stringify(salaryAssignmentData)]);

  return (
    <>
      <FormSection header="Employees" divider>
        <FormSelect name="serviceCenter" label="Service Center" options={serviceCenterOptions} />
        <FormSelect name="department" label="Department" options={departmentOptions} />
        <FormSelect name="designation" label="Designation" options={designationOptions} />
        <Button variant="outline" onClick={() => setShowTable(true)}>
          Get Employees
        </Button>
      </FormSection>
      {showTable && (
        <FormSection header="Employees" divider>
          <GridItem colSpan={4}>
            <FormEditableTable
              name="salaryAssignments"
              columns={[
                {
                  accessor: 'employeeName',
                  header: 'Employee Name',
                  cellWidth: 'lg',
                },
                {
                  accessor: 'paidDays',
                  header: 'Paid Days',
                },
                {
                  accessor: 'grossPay',
                  header: 'Gross Pay',
                },
                {
                  accessor: 'deductions',
                  header: 'Deductions',
                },
                {
                  accessor: 'netPay',
                  header: 'Net Pay',
                },
              ]}
            />
          </GridItem>
        </FormSection>
      )}
    </>
  );
};

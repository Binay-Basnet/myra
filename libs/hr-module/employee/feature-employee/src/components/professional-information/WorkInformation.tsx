import { FormSection } from '@myra-ui';

import {
  EmployeeStatus,
  EmployeeTypeEnum,
  SourceOfHire,
  useGetDepartmentListQuery,
  useGetDesignationListQuery,
  useGetEmployeeLevelListQuery,
} from '@coop/cbs/data-access';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const EmployeeWorkInformation = () => {
  const { data: departmentData } = useGetDepartmentListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const { data: designationData } = useGetDesignationListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const { data: employeeLevelData } = useGetEmployeeLevelListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const employeeLevelOptions =
    employeeLevelData?.settings?.general?.HCM?.employee?.employee?.listEmployeeLevel?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  const departmentOptions =
    departmentData?.settings?.general?.HCM?.employee?.employee?.listDepartment?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  const designationOptions =
    designationData?.settings?.general?.HCM?.employee?.employee?.listDesignation?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );
  const employeeTypeOptions = [
    { label: 'Permanent', value: EmployeeTypeEnum?.Permanent },
    { label: 'Contract', value: EmployeeTypeEnum?.Contract },
    { label: 'Temporary', value: EmployeeTypeEnum?.Temporary },
    { label: 'Trainee', value: EmployeeTypeEnum?.Trainee },
  ];
  const employeeStatusOptions = [
    { label: 'Inactive', value: EmployeeStatus?.Inactive },
    { label: 'Active', value: EmployeeStatus?.Active },
    { label: 'Terminated', value: EmployeeStatus?.Terminated },
    { label: 'Deceased', value: EmployeeStatus?.Deceased },
    { label: 'Resigned', value: EmployeeStatus?.Resigned },
    { label: 'Probation', value: EmployeeStatus?.Probation },
    { label: 'Notice Peroid', value: EmployeeStatus?.NoticePeriod },
  ];

  const sourceOfHireOptions = [
    { label: 'Direct', value: SourceOfHire?.Direct },
    { label: 'Referral', value: SourceOfHire?.Referel },
    { label: 'Vacancy', value: SourceOfHire?.Vacancy },
  ];

  return (
    <FormSection id="Work Information" header="Work Information">
      <FormSelect name="employeeLevelId" label="Employee Level" options={employeeLevelOptions} />
      <FormSelect name="departmentId" label="Department" options={departmentOptions} />
      <FormSelect name="designationId" label="Designation" options={designationOptions} />
      <FormBranchSelect name="serviceCenter" label="Service Center" />
      <FormSelect name="employmentType" label="Employment Type" options={employeeTypeOptions} />
      <FormSelect name="employeeStatus" label="Employment Status" options={employeeStatusOptions} />
      <FormSelect name="sourceOfHire" label="Source of Hire" options={sourceOfHireOptions} />
    </FormSection>
  );
};

import {
  useGetDepartmentOptions,
  useGetDesignationOptions,
  useGetEployeeLevelOptions,
} from '@hr/common';

import { FormSection } from '@myra-ui';

import {
  EmployeeClass,
  EmployeeStatus,
  EmployeeTypeEnum,
  SourceOfHire,
} from '@coop/cbs/data-access';
import { FormBranchSelect, FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';

export const EmployeeWorkInformation = () => {
  const { departmentOptions } = useGetDepartmentOptions();
  const { designationOptions } = useGetDesignationOptions();
  const { employeeLevelOptions } = useGetEployeeLevelOptions();

  const employeeClassOptions = [
    { label: EmployeeClass?.Class_1, value: EmployeeClass?.Class_1 },
    { label: EmployeeClass?.Class_2, value: EmployeeClass?.Class_2 },
    { label: EmployeeClass?.Class_3, value: EmployeeClass?.Class_3 },
  ];

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
      <FormBranchSelect name="serviceCenter" label="Service Center" />
      <FormSelect name="departmentId" label="Department" options={departmentOptions} />
      <FormSelect name="designationId" label="Designation" options={designationOptions} />
      <FormSelect name="employeeClass" label="Employee Class" options={employeeClassOptions} />
      <FormSelect name="employeeLevelId" label="Employee Level" options={employeeLevelOptions} />
      <FormSelect name="employmentType" label="Employment Type" options={employeeTypeOptions} />
      <FormSelect name="employeeStatus" label="Employment Status" options={employeeStatusOptions} />
      <FormSelect name="sourceOfHire" label="Source of Hire" options={sourceOfHireOptions} />
      <FormInput name="referralBy" label="Referral By" />
      <FormDatePicker name="joiningDate" label="Joining Date" />
    </FormSection>
  );
};

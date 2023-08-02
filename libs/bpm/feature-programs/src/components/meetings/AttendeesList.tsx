import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';

import { Box, FormSection } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { Priority, useGetEmployeeListQuery } from '@coop/cbs/data-access';
import { FormCheckbox, FormEditableTable, FormRadioGroup } from '@coop/shared/form';

export type AttendeeType = {
  attendee?: string;
  department?: string;
};

const pirorityType = [
  {
    label: 'High',
    value: Priority?.High,
  },
  {
    label: 'Medium',
    value: Priority?.Medium,
  },
  {
    label: 'Low',
    value: Priority?.Low,
  },
];
export const BPMAttendanceTable = () => {
  const methods = useFormContext();
  const { watch, setValue } = methods;
  const department = watch('department');
  const departmentId = watch('departmentIds') as { label: string; value: string }[];
  const departmentIDs =
    departmentId && departmentId?.length !== 0 ? departmentId?.map((t) => t.value) : [];

  const { data: getEmployeeList } = useGetEmployeeListQuery(
    {
      pagination: {
        after: '',
        first: -1,
      },
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'department',
                value: departmentIDs,
                comparator: 'IN',
              },
            ],
          },
        ],
      },
    },
    {
      enabled: !!department && !!departmentId,
    }
  );
  const employeeList = useMemo(
    () => getEmployeeList?.hr?.employee?.employee?.listEmployee?.edges ?? [],
    [getEmployeeList]
  );
  const employeeOptions = employeeList?.map((data) => ({
    label: data?.node?.employeeName as string,
    value: data?.node?.id as string,
  }));

  // const { data: employeeData } = useGetDepartmentListQuery({
  //   pagination: {
  //     after: '',
  //     first: -1,
  //   },
  // });

  // const employeeDepartmentList = useMemo(
  //   () => employeeData?.settings?.general?.HCM?.employee?.employee?.listDepartment?.edges ?? [],
  //   [employeeData]
  // );
  // const departOptions = employeeDepartmentList?.map((data) => ({
  //   label: data?.node?.name as string,
  //   value: data?.node?.id as string,
  // }));

  // const departmentValue = departOptions?.find((d) => d?.value === departmentId)?.label;

  const { data: fullEmployee } = useGetEmployeeListQuery(
    {
      pagination: {
        after: '',
        first: -1,
      },
    },
    {
      enabled: !department,
    }
  );

  const fullEmployeeList = useMemo(
    () => fullEmployee?.hr?.employee?.employee?.listEmployee?.edges ?? [],
    [fullEmployee]
  );
  const fullEmployeeOptions = fullEmployeeList?.map((data) => ({
    label: data?.node?.employeeName as string,
    value: data?.node?.id as string,
  }));

  const tableColumns: Column<AttendeeType>[] = [
    {
      accessor: 'attendee',
      header: 'Name',
      cellWidth: 'auto',
      fieldType: 'select',
      selectOptions: department ? employeeOptions : fullEmployeeOptions,
    },
    {
      accessor: 'department',
      header: 'Position',
      // hidden: true,
      getDisabled: () => true,
    },
  ];

  const itemDetails = watch('itemDetails');

  useDeepCompareEffect(() => {
    if (itemDetails?.length) {
      setValue(
        'itemDetails',
        itemDetails?.map((items: AttendeeType) => {
          const employeeDeginationName = department
            ? employeeList?.find((d) => d?.node?.id === items?.attendee)?.node?.designation
            : fullEmployeeList?.find((d) => d?.node?.id === items?.attendee)?.node?.designation;

          return {
            attendee: items?.attendee,
            department: employeeDeginationName as string,
          };
        })
      );
    }
  }, [itemDetails, employeeList, fullEmployeeList]);

  return (
    <FormSection flexLayout>
      <FormEditableTable<AttendeeType> name="itemDetails" columns={tableColumns} />
      <Box display="flex" pt="s32" flexDirection="column" gap="s32">
        <FormCheckbox name="sendInvitaionEmail" label="Send Invitation Via Email" />
        <FormRadioGroup name="priority" label="Pirority" options={pirorityType} direction="row" />
      </Box>
    </FormSection>
  );
};

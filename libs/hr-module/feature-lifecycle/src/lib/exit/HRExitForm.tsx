import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';
import { ad2bs } from '@myra-ui/date-picker';

import {
  EmployeeExitInput,
  useGetHrSeperationListQuery,
  useSetEmployeeExitUpsertMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { EmployeeCard } from '../../components';
import { ExitBasicDetails, ExitChecklists, ExitQuetionnare } from '../../components/exit';

export const HrExitUpsert = () => {
  const methods = useForm<EmployeeExitInput>();
  const router = useRouter();

  const { mutateAsync } = useSetEmployeeExitUpsertMutation();

  const submitForm = () => {
    const data = methods.getValues();

    const activityDetails =
      data?.checklists?.map((item) => ({
        done: item?.done,
        activityName: item?.activityName,
        user: item?.user,
        role: item?.role,
        beginsOn: convertDate(item?.beginsOn as unknown as string),
        duration: item?.duration,
      })) || [];
    asyncToast({
      id: 'employee-transfer',
      msgs: {
        success: 'Employee Exit Succesfull',
        loading: 'Exiting Employee',
      },

      promise: mutateAsync({
        input: {
          ...data,
          checklists: { ...activityDetails },
        },
      }),
      onSuccess: () => {
        router.push(ROUTES?.HR_LIFECYCLE_EMPLOYEE_EXIT_LIST);
      },
    });
  };
  const { watch } = methods;
  const seperationId = watch('separationId');
  const { data: seperationData } = useGetHrSeperationListQuery({
    pagination: {
      first: -1,
      after: '',
    },
  });
  const employeeId = useMemo(
    () =>
      seperationData?.hr?.employeelifecycle?.employeeSeparation?.listEmployeeSeparation?.edges?.find(
        (k) => seperationId === k?.node?.id
      )?.node?.employeeId,
    [seperationId, seperationData]
  );

  return (
    <FormLayout methods={methods} hasSidebar={!!seperationId}>
      <FormLayout.Header title="Employee Exit" />

      <FormLayout.Content>
        <FormLayout.Form>
          <ExitBasicDetails />
          <ExitQuetionnare />
          <ExitChecklists />
        </FormLayout.Form>
        {seperationId && (
          <FormLayout.Sidebar borderPosition="left">
            <EmployeeCard employeeId={employeeId as string} />
          </FormLayout.Sidebar>
        )}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};
const convertDate = (dateString: string) => {
  const date = new Date(dateString);

  const convertedDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
  const bsDate = ad2bs(convertedDate.year, Number(convertedDate.month), Number(convertedDate.day));
  const nepaliDate = `${bsDate?.year}-${bsDate?.month.toString().padStart(2, '0')}-${bsDate?.day
    .toString()
    .padStart(2, '0')}`;

  const dateObj = { np: nepaliDate, en: dateString, local: '' };
  return dateObj;
};

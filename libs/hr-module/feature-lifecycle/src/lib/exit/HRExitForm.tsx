import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import {
  EmployeeExitInput,
  FieldsInput,
  useGetHrExistFormStateQuery,
  useGetHrSeperationListQuery,
  useSetEmployeeExitUpsertMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { EmployeeCard } from '../../components';
import { ExitBasicDetails, ExitChecklists, ExitQuetionnare } from '../../components/exit';

type CustomExitInput = Omit<EmployeeExitInput, 'checklists'> & {
  checklists?: {
    done: boolean;
    activityName: string;
    user: string;
    role: string;
    beginsOn: string;
    duration: string;
  }[];
};

export const HrExitUpsert = () => {
  const methods = useForm<CustomExitInput>();
  const router = useRouter();
  const id = router?.query['id'];

  const { mutateAsync } = useSetEmployeeExitUpsertMutation();

  const submitForm = () => {
    const data = methods.getValues();

    const activityDetails =
      data?.checklists?.map((item) => ({
        done: item?.done,
        activityName: item?.activityName,
        user: item?.user,
        role: item?.role,
        beginsOn: item?.beginsOn as unknown as string,
        duration: item?.duration,
      })) || [];
    asyncToast({
      id: 'employee-transfer',
      msgs: {
        success: 'Employee Exit Succesfull',
        loading: 'Exiting Employee',
      },

      promise: mutateAsync({
        id: id ? (id as string) : null,
        input: {
          ...data,
          checklists: activityDetails as unknown as FieldsInput[],
        } as EmployeeExitInput,
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

  const itemData = useGetHrExistFormStateQuery({
    id: id as string,
  });
  const itemFormData = itemData?.data?.hr?.employeelifecycle?.employeeExit?.getEmployeeExit?.data;

  useEffect(() => {
    if (itemFormData) {
      methods?.reset({
        ...itemFormData,
        checklists: itemFormData?.checklists?.map((items) => ({
          done: items?.done as boolean,
          activityName: items?.activityName as string,
          user: items?.user as string,
          role: items?.role as string,
          beginsOn: items?.beginsOn?.en as string,
          duration: items?.duration as string,
        })),
      });
    }
  }, [id, itemFormData, methods]);

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

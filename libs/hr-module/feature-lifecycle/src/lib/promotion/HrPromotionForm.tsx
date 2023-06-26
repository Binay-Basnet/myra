import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import { asyncToast } from '@myra-ui';

import {
  EmployeePromotionInput,
  useSetEmployeePromotionUpsertMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { EmployeeCard, PromotionBasicDetails, PromotionTable } from '../../components';

type CustomPromotionInput = {
  activity_details?: {
    fromThis?: string;
    toThis: string;
  }[];
} & EmployeePromotionInput;

export const HrPromotionUpsert = () => {
  const methods = useForm<CustomPromotionInput>({
    defaultValues: {
      activity_details: [
        {
          fromThis: '',
          toThis: '',
        },
      ],
    },
  });
  const router = useRouter();

  const { mutateAsync } = useSetEmployeePromotionUpsertMutation();

  const submitForm = () => {
    const data = methods.getValues();

    const filteredValues = omit({ ...data }, ['activity_details']);

    asyncToast({
      id: 'employee-Promotion',
      msgs: {
        success: 'Employee Promotion Succesfull',
        loading: 'Promotion Successful',
      },

      promise: mutateAsync({
        input: {
          ...filteredValues,
          fromThis: data?.activity_details?.[0]?.fromThis as unknown as string,
          toThis: data?.activity_details?.[0]?.toThis as unknown as string,
        },
      }),
      onSuccess: () => {
        router.push(ROUTES?.HR_LIFECYCLE_EMPLOYEE_PROMOTION_LIST);
      },
    });
  };
  const { watch } = methods;
  const employeeId = watch('employeeId');

  return (
    <FormLayout methods={methods} hasSidebar={!!employeeId}>
      <FormLayout.Header title="Employee Promotion" />

      <FormLayout.Content>
        <FormLayout.Form>
          <PromotionBasicDetails />
          <PromotionTable />
        </FormLayout.Form>
        {employeeId && (
          <FormLayout.Sidebar borderPosition="left">
            <EmployeeCard employeeId={employeeId} />
          </FormLayout.Sidebar>
        )}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

import { useForm } from 'react-hook-form';

import { asyncToast } from '@myra-ui';

import { useSetEmployeeOnboardingUpsertMutation } from '@coop/cbs/data-access';
import { FormLayout } from '@coop/shared/form';

import {
  OnboardingActivity,
  OnboardingBasicDetails,
  OnboardingJoiningDetails,
} from '../components';

export const HrLifecycleOnboardingAdd = () => {
  const methods = useForm();
  const { getValues } = methods;

  const { mutateAsync } = useSetEmployeeOnboardingUpsertMutation();

  const submitForm = () => {
    asyncToast({
      id: 'employee-onboarding',
      msgs: {
        success: 'Employee Onboarding Successful',
        loading: 'Onboarding Employee',
      },
      onSuccess: () => {},
      promise: mutateAsync({
        id: null,
        input: {
          ...getValues,
        },
      }),
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Add New Employee Onboarding" />

      <FormLayout.Content>
        <FormLayout.Form>
          <OnboardingBasicDetails />
          <OnboardingJoiningDetails />
          <OnboardingActivity />
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default HrLifecycleOnboardingAdd;

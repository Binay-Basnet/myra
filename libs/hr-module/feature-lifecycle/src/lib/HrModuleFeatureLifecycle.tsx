import { useForm } from 'react-hook-form';
import { omit } from 'lodash';

import { asyncToast } from '@myra-ui';
import { ad2bs } from '@myra-ui/date-picker';

import {
  EmployeeOnboardingInput,
  useSetEmployeeOnboardingUpsertMutation,
} from '@coop/cbs/data-access';
import { FormLayout } from '@coop/shared/form';

import {
  OnboardingActivity,
  OnboardingBasicDetails,
  OnboardingJoiningDetails,
} from '../components';

export const HrLifecycleOnboardingAdd = () => {
  const methods = useForm<EmployeeOnboardingInput>();

  const { mutateAsync } = useSetEmployeeOnboardingUpsertMutation();

  const submitForm = () => {
    const data = methods.getValues();
    const activityDetails =
      data?.activity_details?.map((item) => ({
        isDone: item?.isDone,
        name: item?.name,
        userName: item?.userName,
        role: item?.role,
        beginsOn: convertDate(item?.beginsOn as unknown as string),
        duration: item?.duration,
      })) || [];

    const filteredValues = omit({ ...data }, ['activity_details']);

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
          ...filteredValues,
          activity_details: activityDetails,
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

function convertDate(dateString: string) {
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
}

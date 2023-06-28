import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import { asyncToast } from '@myra-ui';
import { ad2bs } from '@myra-ui/date-picker';

import {
  EmployeeOnboardingInput,
  useGetHrOnboardingFormStateQuery,
  useSetEmployeeOnboardingUpsertMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import {
  OnboardingActivity,
  OnboardingBasicDetails,
  OnboardingJoiningDetails,
} from '../../components';

// type CustomOnboardingInput = Omit<EmployeeOnboardingInput, 'activity_details'> & {
//   activity_details?: {
//     isDone: boolean;
//     name: string;
//     userName: string;
//     role: string;
//     beginsOn: string;
//     duration: string;
//   }[];
// };

export const HrLifecycleOnboardingAdd = () => {
  const methods = useForm<EmployeeOnboardingInput>();
  const router = useRouter();
  const id = router?.query['id'];

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
      onSuccess: () => {
        router.push(ROUTES?.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_LIST);
      },
      promise: mutateAsync({
        id: id ? (id as string) : null,
        input: {
          ...filteredValues,

          activity_details: activityDetails,
        } as EmployeeOnboardingInput,
      }),
    });
  };

  const itemData = useGetHrOnboardingFormStateQuery({
    id: id as string,
  });
  const itemFormData =
    itemData?.data?.hr?.employeelifecycle?.employeeOnboarding?.getEmployeeOnboarding?.data;

  useEffect(() => {
    if (itemFormData) {
      methods?.reset({
        ...itemFormData,
        activity_details: itemFormData?.activity_details?.map((items) => ({
          isDone: items?.isDone as boolean,
          name: items?.name as string,
          userName: items?.userName as string,
          role: items?.role as string,
          beginsOn: items?.beginsOn,
          duration: items?.duration as string,
        })),
      });
    }
  }, [id, itemFormData, methods]);

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

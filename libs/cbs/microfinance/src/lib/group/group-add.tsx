import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import { LeaveInput, useGetLeaveQuery, useSetNewLeaveMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormLayout } from '@coop/shared/form';

export const GroupAdd = () => {
  const methods = useForm();
  const router = useRouter();
  const { getValues, reset, watch, setValue } = methods;

  const { mutateAsync } = useSetNewLeaveMutation();
  const { data: leaveData } = useGetLeaveQuery(
    {
      id: router?.query?.['id'] as string,
    },
    { enabled: !!router?.query?.['id'] }
  );

  const leaveEditData = leaveData?.hr?.employee?.leave?.getLeave?.record;

  useEffect(() => {
    if (leaveEditData) {
      reset(leaveEditData);
    }
  }, [JSON.stringify(leaveEditData)]);

  const submitForm = () => {
    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-new-leave',
        msgs: {
          success: 'leave edited succesfully',
          loading: 'editing leave',
        },
        onSuccess: () => {
          router.push(ROUTES?.HRMODULE_LEAVE_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: getValues() as LeaveInput,
        }),
      });
    } else {
      asyncToast({
        id: 'add-new-leave',
        msgs: {
          success: 'new leave added succesfully',
          loading: 'adding new leave',
        },
        onSuccess: () => {
          router.push(ROUTES?.HRMODULE_LEAVE_LIST);
        },
        promise: mutateAsync({
          id: null,
          input: getValues() as LeaveInput,
        }),
      });
    }
  };
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Microfinance Group" />
      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={3}>
              <FormInput label="MF Center Name" name="centerName" />
            </GridItem>
            <FormInput label="MF Center ID" name="centerCode" />
            {/* <FormRadioGroup /> */}
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default GroupAdd;

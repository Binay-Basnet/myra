import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import { BpmMinorInput, useSetBpmOperationsAddMinorMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { MinorBasicDetails, MinorNotes } from '../../components/events';

export const BPMOperationsMinorAdd = () => {
  const methods = useForm<BpmMinorInput>();
  const router = useRouter();

  const { mutateAsync } = useSetBpmOperationsAddMinorMutation();

  const submitForm = () => {
    const data = methods.getValues();

    asyncToast({
      id: 'bpm-event',
      msgs: {
        success: 'Minor Added Successfully',
        loading: 'Adding Minor',
      },
      onSuccess: () => {
        router.push(ROUTES?.BPM_OPERATIONS_MINOR_ADDITION_LIST);
      },
      promise: mutateAsync({
        data: {
          ...data,
        } as BpmMinorInput,
      }),
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Minor Addition" />

      <FormLayout.Content>
        <FormLayout.Form>
          <MinorBasicDetails />
          <MinorNotes />
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default BPMOperationsMinorAdd;

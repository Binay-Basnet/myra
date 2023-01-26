import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Box, Button, Text } from '@myra-ui';

import {
  EodExceptionInput,
  useEodExceptionSetupMutation,
  useGetEodExceptionsQuery,
} from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';

const YesNo = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export const EodExceptions = () => {
  const methods = useForm({
    defaultValues: {
      branchReadiness: false,
      dormantCheck: false,
      maturityCheck: false,
      cashInHand: false,
    },
  });
  const { getValues, reset } = methods;
  const { mutateAsync } = useEodExceptionSetupMutation();
  const { data } = useGetEodExceptionsQuery();

  const eodExceptions = data?.settings?.general?.setup?.eodException;

  useEffect(() => {
    if (eodExceptions) {
      reset({ ...eodExceptions });
    }
  }, [eodExceptions]);

  const submitButton = () => {
    const values = getValues();
    asyncToast({
      id: 'eod-exceptions-id',
      msgs: {
        success: 'EOD Exception Added',
        loading: 'Adding EOD Exception',
      },
      promise: mutateAsync({ value: values }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof EodExceptionInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Box p="s16">
        <Box
          display="flex"
          flexDirection="column"
          borderRadius="br2"
          border="1px solid"
          borderColor="border.layout"
        >
          <Box
            display="flex"
            flexDirection="column"
            p="s16"
            borderBottom="1px solid"
            borderBottomColor="border.layout"
          >
            <Text fontWeight="SemiBold" color="gray.800" fontSize="r1" lineHeight="125%">
              EOD Exceptions
            </Text>
            <Text fontWeight="Medium" color="gray.600" fontSize="s3" lineHeight="125%">
              Manage exceptions that may arise during the day-end process by using options that can
              be easily toggled.
            </Text>
          </Box>

          <Box display="flex" p="s16" borderBottom="1px solid" borderBottomColor="border.layout">
            <Box display="flex" flexDirection="column" gap="s16">
              <FormSwitchTab name="branchReadiness" label="Branch Readiness" options={YesNo} />

              <FormSwitchTab name="dormantCheck" label="Dormant Check" options={YesNo} />

              <FormSwitchTab name="maturityCheck" label="Maturity Check" options={YesNo} />

              <FormSwitchTab name="cashInHand" label="Cash in Hand" options={YesNo} />
            </Box>
          </Box>

          <Box h="60px" px="s16" display="flex" gap="s16" justifyContent="end" alignItems="center">
            <Button onClick={() => reset()} variant="ghost">
              Discard Changes
            </Button>
            <Button onClick={submitButton}>Save Changes</Button>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};

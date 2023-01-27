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
  { label: 'Skip', value: true },
  { label: 'Don’t Skip', value: false },
];

const eodExeptionList = [
  {
    title: 'Branch Readiness',
    subTitle:
      'Pressing “Skip” will allow skipping the check to see if all branches are ready for EOD Process.',
    fieldName: 'branchReadiness',
    border: true,
  },

  {
    title: 'Dormant Check',
    subTitle: 'Pressing “Skip” will allow skipping dormant account check for EOD Process.',
    fieldName: 'dormantCheck',
    border: true,
  },

  {
    title: 'Maturity Check',
    subTitle:
      'Pressing “Skip” will allow skipping maturity check whether all the account that are matured are processed.',
    fieldName: 'maturityCheck',
    border: true,
  },

  {
    title: 'Cash in Hand',
    subTitle: 'Pressing “Skip” will allow skipping Cash in Hand check during EOD Process.',
    fieldName: 'cashInHand',
    border: false,
  },
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
              Define the Day End Process exceptions. In essence, that will let the Myra system skip
              the check.
            </Text>
          </Box>

          <Box
            display="flex"
            px="s16"
            paddingTop="s16"
            borderBottom="1px solid"
            borderBottomColor="border.layout"
          >
            <Box display="flex" flexDirection="column" gap="s16" w="100%">
              {eodExeptionList?.map((item) => (
                <Box
                  pb="s24"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={item.border ? '1px solid' : ' '}
                  borderBottomColor={item.border ? 'border.layout' : ' '}
                >
                  <Box display="flex" flexDirection="column">
                    <Text fontWeight="SemiBold" color="gray.800" fontSize="r1" lineHeight="17px">
                      {item.title}
                    </Text>
                    <Text fontWeight="Regular" color="gray.600" fontSize="s3" lineHeight="150%">
                      {item.subTitle}
                    </Text>
                  </Box>
                  <FormSwitchTab name={item.fieldName} options={YesNo} />
                </Box>
              ))}
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

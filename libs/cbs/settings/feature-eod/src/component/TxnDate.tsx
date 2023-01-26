import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Box, Button, Grid, GridItem, Text } from '@myra-ui';

import {
  SetupMutation,
  useEodDateSetupMutation,
  useGetEndOfDayDateDataQuery,
  useGetEodExceptionsQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker } from '@coop/shared/form';

export const TxnDate = () => {
  const methods = useForm();
  const { getValues, reset } = methods;
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const disableButton = endOfDayData?.transaction?.endOfDayDate?.isInitialized;
  const { mutateAsync } = useEodDateSetupMutation();

  const { data } = useGetEodExceptionsQuery();

  const eodSeed = data?.settings?.general?.setup?.eodSeed;

  useEffect(() => {
    if (eodSeed) {
      reset({ eodSeed });
    }
  }, [eodSeed]);

  const submitButton = () => {
    const values = getValues();
    asyncToast({
      id: 'eod-date-id',
      msgs: {
        success: 'EOD Start Transaction Date Added',
        loading: 'Adding EOD Start Transaction Date',
      },
      promise: mutateAsync({ date: values?.eodSeed }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof SetupMutation, {
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
              EOD Start Transaction Date
            </Text>
            <Text fontWeight="Medium" color="gray.600" fontSize="s3" lineHeight="125%">
              Once the date is selected, it cannot be altered.
            </Text>
          </Box>

          <Box display="flex" p="s16" borderBottom="1px solid" borderBottomColor="border.layout">
            <Grid templateColumns="repeat(3,1fr)">
              <GridItem colSpan={1}>
                <FormDatePicker name="eodSeed" label="Date" />
              </GridItem>
            </Grid>
          </Box>

          <Box h="60px" px="s16" display="flex" justifyContent="end" alignItems="center">
            <Button disabled={disableButton} onClick={submitButton}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};

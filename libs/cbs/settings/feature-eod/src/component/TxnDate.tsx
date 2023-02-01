import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { asyncToast, Box, Button, Grid, GridItem, Loader, Text } from '@myra-ui';

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
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const hideButton = endOfDayData?.transaction?.endOfDayDate?.isInitialized;
  const { mutateAsync } = useEodDateSetupMutation();

  const { data, isLoading } = useGetEodExceptionsQuery();

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

  if (isLoading) {
    return (
      <Box display="flex" bg="white" h="100vh" justifyContent="center" pt="100px">
        <Loader />
      </Box>
    );
  }
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
            <Text fontWeight="Medium" color="danger.500" fontSize="s3" lineHeight="125%">
              Once the date is selected, it cannot be altered.
            </Text>
          </Box>

          <Box
            display="flex"
            p="s16"
            borderBottom={!hideButton ? '1px solid' : ' '}
            borderBottomColor={!hideButton ? 'border.layout' : ' '}
          >
            <Grid templateColumns="repeat(3,1fr)">
              <GridItem colSpan={1}>
                <FormDatePicker name="eodSeed" label="Date" />
              </GridItem>
            </Grid>
          </Box>
          {!hideButton && (
            <Box h="60px" px="s16" display="flex" justifyContent="end" alignItems="center">
              <Button onClick={onToggle}>Save</Button>
            </Box>
          )}
        </Box>
      </Box>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text fontWeight="SemiBold" fontSize="r2" color="gray.800" lineHeight="150%">
                Confirm EOD Start Transaction Date?
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout">
              <Text fontWeight="Regular" color="gray.800" fontSize="r1">
                This will permanently set up settings. This action is irreversible. To continue,
                click &quot;Save,&quot; and to discard, click &quot;Cancel.&quot;
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={submitButton} ml={3}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </FormProvider>
  );
};

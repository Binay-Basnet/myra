import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Box, Button, Loader, Text } from '@myra-ui';

import { useEodActivitiesSetupMutation, useGetEodExceptionsQuery } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormSwitchTab } from '@coop/shared/form';

const YesNo = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const eodActivitiesList = [
  {
    title: 'Loan Repayment',
    subTitle:
      'Pressing "Yes" will enable system to extract loan installment amount automatically from linked account.',
    fieldName: 'loanRepayment',
    border: true,
  },

  {
    title: 'Dormant Check',
    subTitle:
      'Pressing Yes will enable system to Dormant saving accounts automatically based on Dormancy Conditions.',
    fieldName: 'dormantCheck',
    border: true,
  },

  {
    title: 'Maturity Check',
    subTitle:
      'Pressing “Yes” will enable system to close the maturity condition satisfying accounts and transfer the available balance to nominee account.',
    fieldName: 'maturityCheck',
    border: false,
  },
];

export const EodActions = () => {
  const methods = useForm({
    defaultValues: {
      loanRepayment: true,
      dormantCheck: true,
      maturityCheck: true,
    },
  });
  const { getValues, reset } = methods;
  const { mutateAsync } = useEodActivitiesSetupMutation();
  const { data, refetch, isLoading } = useGetEodExceptionsQuery();

  const eodActivitiesData = data?.settings?.general?.setup?.eodAction;

  useEffect(() => {
    if (eodActivitiesData) {
      reset({ ...eodActivitiesData });
    }
  }, [eodActivitiesData]);

  const submitButton = () => {
    const values = getValues();
    asyncToast({
      id: 'eod-activities-id',
      msgs: {
        success: 'EOD Activities Added',
        loading: 'Updating EOD Activities',
      },
      promise: mutateAsync({ value: values }),
      onSuccess: () => refetch(),
      //   onError: (error) => {
      //     if (error.__typename === 'ValidationError') {
      //       Object.keys(error.validationErrorMsg).map((key) =>
      //         methods.setError(key as keyof EodActivitiesSetupMutation, {
      //           message: error.validationErrorMsg[key][0] as string,
      //         })
      //       );
      //     }
      //   },
    });
  };

  if (isLoading) {
    <Box display="flex" bg="white" h="100vh" justifyContent="center" pt="100px">
      <Loader />
    </Box>;
  }

  return (
    <FormProvider {...methods}>
      <Box p="s16">
        <SettingsCard
          title="EOD Activities"
          subtitle="Define what are the activities the system shall conduct during the day end process."
        >
          <Box display="flex" borderBottom="1px solid" borderBottomColor="border.layout">
            <Box display="flex" flexDirection="column" gap="s16" w="100%">
              {eodActivitiesList?.map((item) => (
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
            <Button onClick={() => reset({ ...eodActivitiesData })} variant="ghost">
              Discard Changes
            </Button>
            <Button onClick={submitButton}>Save Changes</Button>
          </Box>
        </SettingsCard>
      </Box>
    </FormProvider>
  );
};

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, SettingsFooter, Text } from '@myra-ui';

import { useChangeSmsStatusMutation, useListSmsSettingQuery } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormSwitch } from '@coop/shared/form';

export const AlternativeChannelSMSBankingSMSSetting = () => {
  const queryClient = useQueryClient();

  const methods = useForm();

  const { data: statusListData } = useListSmsSettingQuery();
  const statusList = statusListData?.settings?.sms?.listSmsSetting?.data ?? [];

  const transactionStatus =
    statusList?.filter((status) => status?.category === 'TRANSACTION') ?? [];
  const updateStatus = statusList?.filter((status) => status?.category === 'UPDATE') ?? [];
  const scheduleStatus = statusList?.filter((status) => status?.category === 'SCHEDULE') ?? [];

  const { mutateAsync: changeSMSStatus, isLoading } = useChangeSmsStatusMutation();

  useEffect(() => {
    if (statusList) {
      const temp: Record<string, boolean> = {};

      statusList?.forEach((status) => {
        temp[status?.id as string] = !!status?.activeStatus;
      });

      methods.reset(temp);
    }
  }, [statusList]);

  return (
    <>
      <FormProvider {...methods}>
        <Box p="s16" display="flex" flexDir="column" gap="s16">
          <Box display="flex" flexDir="column" gap="s16">
            <Box h="60px" display="flex" flexDir="column" gap="s4" justifyContent="center">
              <Text fontSize="r1" fontWeight="600" color="gray.800">
                SMS Setting
              </Text>
              <Text fontSize="s3" fontWeight={500} color="gray.600">
                Select events in which the SMS should be sent to the user
              </Text>
            </Box>
          </Box>

          <SettingsCard title="Transactions">
            <Box display="flex" flexDirection="column" gap="s8">
              {transactionStatus?.map((status) => (
                <FormSwitch name={status?.id as string} label={status?.name as string} />
              ))}
            </Box>
          </SettingsCard>

          <SettingsCard title="Update/Miscellaneous">
            <Box display="flex" flexDirection="column" gap="s8">
              {updateStatus?.map((status) => (
                <FormSwitch name={status?.id as string} label={status?.name as string} />
              ))}
            </Box>
          </SettingsCard>

          <SettingsCard title="Schedules">
            <Box display="flex" flexDirection="column" gap="s8">
              {scheduleStatus?.map((status) => (
                <FormSwitch name={status?.id as string} label={status?.name as string} />
              ))}
            </Box>
          </SettingsCard>
        </Box>
      </FormProvider>
      <SettingsFooter
        handleSave={async () => {
          const values = methods.getValues();

          await asyncToast({
            id: 'save',
            msgs: {
              success: 'Saved Successfully',
              loading: 'Saving Settings',
            },
            promise: changeSMSStatus({
              input: Object.keys(values)?.map((s) => ({ id: s, activeStatus: values[s] })),
            }),
            onSuccess: () => queryClient.invalidateQueries(['listSMSSetting']),
          });
        }}
        handleDiscard={() => {
          const temp: Record<string, boolean> = {};

          statusList?.forEach((status) => {
            temp[status?.id as string] = !!status?.activeStatus;
          });

          methods.reset(temp);
        }}
        saveLoading={isLoading}
      />
    </>
  );
};

export default AlternativeChannelSMSBankingSMSSetting;

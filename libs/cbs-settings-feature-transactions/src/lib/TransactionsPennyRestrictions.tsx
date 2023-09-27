import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, SettingsFooter, Text } from '@myra-ui';

import {
  AccountType,
  usePennyRestrictionListQuery,
  usePennyRestrictionMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormCheckboxGroup } from '@coop/shared/form';

const accountTypeOptions = Object.values(AccountType)?.map((val) => ({ label: val, value: val }));

export const TransactionsPennyRestrictions = () => {
  const queryClient = useQueryClient();

  const methods = useForm();

  const { mutateAsync: pennyRestrict } = usePennyRestrictionMutation();

  const { data: pennyRestrictionListData } = usePennyRestrictionListQuery();

  const restrictedList = pennyRestrictionListData?.settings?.general?.setup?.pennyRestriction ?? [];

  useEffect(() => {
    methods.reset({ accountType: restrictedList });
  }, [restrictedList]);

  const handleSave = () => {
    asyncToast({
      id: 'transaction-penny-restriction',
      msgs: {
        loading: 'Updating penny restrictions',
        success: 'Penny restrictions updated',
      },
      promise: pennyRestrict({ value: methods.getValues()?.['accountType'] }),
      onSuccess: () => {
        queryClient.invalidateQueries(['pennyRestrictionList']);
      },
    });
  };

  const handleDiscard = () => {
    methods.reset({ accountType: restrictedList });
  };

  return (
    <Box display="flex" flexDirection="row" h="fit-content">
      <Box flex={1} p="s16">
        <Box borderBottom="1px" borderBottomColor="border.layout" py="s8" w="100%">
          <Text fontSize="r2" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
            Penny Restrictions
          </Text>
          {/* <Text pt="s2" fontSize="r1" fontWeight="Reglular" color="gray.400">
            Select Account Type for Penny Restrictions
          </Text> */}
        </Box>
        <Box mt="s16" display="flex" flexDir="column" gap="s16">
          <FormProvider {...methods}>
            <SettingsCard
              title="Account Restrictions"
              subtitle="Select Account Type for Penny Restrictions"
            >
              <FormCheckboxGroup
                name="accountType"
                showOther={false}
                list={accountTypeOptions}
                orientation="grid"
              />
            </SettingsCard>
          </FormProvider>
        </Box>
      </Box>
      <SettingsFooter handleDiscard={handleDiscard} handleSave={handleSave} />
    </Box>
  );
};

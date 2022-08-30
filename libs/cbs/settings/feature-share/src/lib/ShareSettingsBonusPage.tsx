import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  TaxPayerOptions,
  useGetSettingsShareBonusDataQuery,
  useSetSettingsShareBonusMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
import { asyncToast, Box, SettingsFooter, toast } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsBonusPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const taxpayerOpt = [
    {
      label: t['shareBonusCooperative'],
      value: TaxPayerOptions?.Cooperative,
    },
    {
      label: t['shareBonusMember'],
      value: TaxPayerOptions?.Member,
    },
  ];

  const methods = useForm();
  const { getValues, reset } = methods;
  const { mutateAsync } = useSetSettingsShareBonusMutation();

  const { data, refetch } = useGetSettingsShareBonusDataQuery();
  const settingsBonusData = data?.settings?.general?.share?.bonus;
  useEffect(() => {
    if (settingsBonusData) {
      reset(settingsBonusData);
    }
  }, [settingsBonusData]);
  // const taxPayer = watch('taxPayer');
  // const taxRate = watch('taxRate');
  // const accountMapping = watch('accountMapping');
  const handleSubmit = () => {
    const values = getValues();
    asyncToast({
      id: 'share-settings-bonus-id',
      msgs: {
        success: 'Saved',
        loading: 'Saving Changes ',
      },
      onSuccess: () => router.push('/settings/general/share/bonus'),
      promise: mutateAsync(
        {
          data: {
            ...values,
            // taxPayer: taxPayer ?? settingsBonusData?.taxPayer,
            // taxRate: taxRate ?? settingsBonusData?.taxPayer,
            // accountMapping: accountMapping ?? settingsBonusData?.accountMapping,
          },
        },
        { onSuccess: () => refetch() }
      ),
    });
  };
  const handleDiscard = () => {
    router.reload();
    toast({
      message: 'Changes have been discarded',
      id: 'Discard-settings-shareBonus',
      type: 'info',
    });
  };

  return (
    <>
      {' '}
      <FormProvider {...methods}>
        <form>
          <Box p="s16" pb="80px" display="flex" flexDir="column" gap="s16">
            <ShareSettingsHeader title={t['settingsShareBonus']} />

            <ShareSettingsCard
              title={t['shareBonusWhoPaysTheTax']}
              subtitle={t['shareBonusChooseWhoPaysTheTax']}
            >
              <Box display="flex" flexDir="column" gap="s16">
                <FormRadioGroup
                  options={taxpayerOpt}
                  name="taxPayer"
                  orientation="vertical"
                />
              </Box>
            </ShareSettingsCard>

            <ShareSettingsCard
              title={t['shareBonusTaxRate']}
              subtitle={t['shareBonusAddRateOfTax']}
            >
              <Box w="33%">
                <FormInput
                  name="taxRate"
                  size="sm"
                  __placeholder={t['shareBonusRateTaxRate__placeholder']}
                />
              </Box>
            </ShareSettingsCard>

            <ShareSettingsCard
              title={t['shareAccountMapping']}
              subtitle={t['shareAccountBonusShareDebited']}
            >
              <Box w="33%">
                <FormInput
                  name="accountMapping"
                  size="sm"
                  __placeholder={t['shareAccountName']}
                />
              </Box>
            </ShareSettingsCard>
          </Box>
          <SettingsFooter
            handleSave={handleSubmit}
            handleDiscard={handleDiscard}
          />
        </form>
      </FormProvider>
    </>
  );
};

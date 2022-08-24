import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

import {
  DividendDistributionCondition,
  DividendTransferTreatment,
  ShareDividendSettingsInput,
  useGetSettingsShareDividendDataQuery,
  useSetSettingsShareDividendMutation,
} from '@coop/cbs/data-access';
import { FormRadioGroup, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { asyncToast, Input, SettingsFooter, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsDividendPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const methods = useForm<ShareDividendSettingsInput>({
    defaultValues: {
      distributionCondition: DividendDistributionCondition?.Quarterly,
      dividendTransferTreatment: DividendTransferTreatment?.ShareAndAccount,
    },
  });

  const { watch, getValues, reset } = methods;
  const { mutateAsync } = useSetSettingsShareDividendMutation();
  const { data, refetch } = useGetSettingsShareDividendDataQuery();
  const settingsDividendData = data?.settings?.general?.share?.dividend;
  useEffect(() => {
    if (settingsDividendData) {
      reset(settingsDividendData);
    }
  }, [settingsDividendData]);
  const handleSubmit = () => {
    const values = getValues();
    asyncToast({
      id: 'share-settings-bonus-id',
      msgs: {
        success: 'Saved',
        loading: 'Saving Changes ',
      },
      onSuccess: () => router.push('/share/register'),
      promise: mutateAsync(
        {
          data: {
            ...values,
          },
        },
        { onSuccess: () => refetch() }
      ),
    });
  };
  const dividentTransferTreatment = watch('dividendTransferTreatment');

  return (
    <FormProvider {...methods}>
      <form>
        {' '}
        <Box p="s16" pb="80px" display="flex" flexDir="column" gap="s16">
          <ShareSettingsHeader title={t['settingsShareDivident']} />
          <ShareSettingsCard
            title={t['shareDividentDistributionCondition']}
            subtitle={t['shareAddDifferentShareDividentRate']}
          >
            <Box display="flex" flexDir="column" gap={'s16'}>
              <FormSwitchTab
                name={'distributionCondition'}
                options={[
                  {
                    label: t['shareDividentDaily'],
                    value: DividendDistributionCondition?.Daily,
                  },
                  {
                    label: t['shareDividentMonthly'],
                    value: DividendDistributionCondition?.Monthly,
                  },
                  {
                    label: t['shareDividentQuarterly'],
                    value: DividendDistributionCondition?.Quarterly,
                  },
                ]}
              />
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['share1stQuarter']}
                </Text>
                <Box w="33%">
                  <Input size="sm" placeholder="100%" />
                </Box>
              </Box>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['share2ndQuarter']}
                </Text>
                <Box w="33%">
                  <Input size="sm" placeholder="100%" />
                </Box>
              </Box>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['share3rdQuarter']}
                </Text>
                <Box w="33%">
                  <Input size="sm" placeholder="100%" />
                </Box>
              </Box>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['share4thQuarter']}
                </Text>
                <Box w="33%">
                  <Input size="sm" placeholder="100%" />
                </Box>
              </Box>
            </Box>
          </ShareSettingsCard>
          <ShareSettingsCard
            title={t['shareDividentTransferTreatment']}
            subtitle={t['shareDividentTransferTreatmentSubtitle']}
          >
            <FormRadioGroup
              options={[
                {
                  label: t['shareDividentTransferTreatmentShareAndAccount'],
                  value: DividendTransferTreatment?.ShareAndAccount,
                },
                {
                  label: t['shareDividentTransferTreatmentAccountTransfer'],
                  value: DividendTransferTreatment?.AccountTransfer,
                },
                {
                  label: t['shareDividentTransferTreatmentBookPayable'],
                  value: DividendTransferTreatment?.BookPayable,
                },
              ]}
              name="dividendTransferTreatment"
            />
          </ShareSettingsCard>

          {dividentTransferTreatment ===
          DividendTransferTreatment?.ShareAndAccount ? (
            <ShareSettingsCard
              title={t['shareAndAccount']}
              subtitle={t['shareAndAccountSubtitle']}
            >
              <Box display="flex" flexDir="column" gap={'s16'}>
                <Box>
                  <Text
                    fontWeight="Regular"
                    color="neutralColorLight.Gray-80"
                    fontSize="r1"
                  >
                    {t['shareAndAccountNote']}
                  </Text>
                </Box>
                <Box
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  h="36px"
                >
                  <Text fontSize="r1" fontWeight="400" color="gray.800">
                    {t['shareChooseAccount']}
                  </Text>
                  <FormSelect
                    name="accountForFractionalDividends"
                    placeholder={t['shareSelectAccount']}
                  />
                </Box>
              </Box>
            </ShareSettingsCard>
          ) : dividentTransferTreatment ===
            DividendTransferTreatment?.AccountTransfer ? (
            <ShareSettingsCard
              title={t['shareAccountTransfer']}
              subtitle={t['shareAccountTransferSubtitle']}
            >
              <Box width="33%">
                <FormSelect
                  name="accountForShareDividends"
                  options={[]}
                  placeholder={t['shareSelectAccount']}
                />
              </Box>
            </ShareSettingsCard>
          ) : dividentTransferTreatment ===
            DividendTransferTreatment?.BookPayable ? (
            <ShareSettingsCard
              title={t['shareBookPayables']}
              subtitle={t['shareBookPayablesSubtitle']}
            >
              <Box width="33%">
                <FormSelect
                  name="organizationFundForDividends"
                  options={[]}
                  placeholder={t['shareNameOfTheFund']}
                />
              </Box>
            </ShareSettingsCard>
          ) : null}
        </Box>
        <SettingsFooter handleSave={handleSubmit} />
      </form>
    </FormProvider>
  );
};

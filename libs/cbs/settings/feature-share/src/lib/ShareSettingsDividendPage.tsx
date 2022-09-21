import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoInformationCircle } from 'react-icons/io5';
import { useRouter } from 'next/router';

import {
  DividendDistributionCondition,
  DividendTransferTreatment,
  ShareDividendSettingsInput,
  useGetSettingsShareDividendDataQuery,
  useSetSettingsShareDividendMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormRadioGroup, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { asyncToast, Box, Icon, SettingsFooter, Text, toast } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

const months = [
  {
    label: 'firstMonth',
    name: 'firstMonth',
  },
  {
    label: 'secondMonth',
    name: 'secondMonth',
  },
  {
    label: 'thirdMonth',
    name: 'thirdMonth',
  },
  {
    label: 'fourthMonth',
    name: 'fourthMonth',
  },
  {
    label: 'fifthMonth',
    name: 'fifthMonth',
  },
  {
    label: 'sixthMonth',
    name: 'sixthMonth',
  },
  {
    label: 'seventhMonth',
    name: 'seventhMonth',
  },
  {
    label: 'eightMonth',
    name: 'eightMonth',
  },
  {
    label: 'ninthMonth',
    name: 'ninthMonth',
  },
  {
    label: 'tenthMonth',
    name: 'tenthMonth',
  },
  {
    label: 'eleventhMonth',
    name: 'eleventhMonth',
  },
  {
    label: 'twelfthMonth',
    name: 'twelfthMonth',
  },
];

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
      id: 'share-settings-dividend-id',
      msgs: {
        success: 'Saved',
        loading: 'Saving Changes ',
      },
      onSuccess: () => router.push('/settings/general/share/dividend'),
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
  const handleDiscard = () => {
    router.reload();
    toast({
      message: 'Changes have been discarded',
      id: 'Discard-settings-sharedividend',
      type: 'info',
    });
  };

  const dividentTransferTreatment = watch('dividendTransferTreatment');
  const distributionCond = watch('distributionCondition');
  watch('dividendRate.quarterly.fourthQuarter');

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
            <Box display="flex" flexDir="column" gap="s16">
              <FormSwitchTab
                name="distributionCondition"
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
              {distributionCond === DividendDistributionCondition?.Daily && (
                <Box
                  bg="info.0"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  borderRadius="br2"
                  gap="s16"
                  p="s16"
                >
                  <Icon as={IoInformationCircle} color="info.900" />
                  <Text fontWeight="500" fontSize="r1" color="info.900">
                    {t['shareDividendSettingsDailyInput']}
                  </Text>
                </Box>
              )}
              {distributionCond === DividendDistributionCondition?.Quarterly && (
                <>
                  {' '}
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
                      <FormInput
                        name="dividendRate.quarterly.firstQuarter"
                        size="sm"
                        __placeholder="100%"
                      />
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
                      <FormInput
                        name="dividendRate.quarterly.secondQuarter"
                        size="sm"
                        __placeholder="100%"
                      />
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
                      <FormInput
                        name="dividendRate.quarterly.thirdQuarter"
                        size="sm"
                        __placeholder="100%"
                      />
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
                      <FormInput
                        name="dividendRate.quarterly.fourthQuarter"
                        size="sm"
                        __placeholder="100%"
                      />
                    </Box>
                  </Box>
                </>
              )}
              {distributionCond === DividendDistributionCondition?.Monthly && (
                <Box display="flex" flexDirection="column" gap="s16">
                  {months.map(({ label, name }) => (
                    <Box
                      display="flex"
                      flexDir="row"
                      alignItems="center"
                      justifyContent="space-between"
                      key={name}
                      gap="s8"
                    >
                      <Text fontWeight="400" fontSize="r1">
                        {t[label]}
                      </Text>
                      <Box w="20%">
                        <FormInput
                          name={`dividendRate.monthly.${name}`}
                          size="sm"
                          type="number"
                          __placeholder="100%"
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
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

          {dividentTransferTreatment === DividendTransferTreatment?.ShareAndAccount ? (
            <ShareSettingsCard title={t['shareAndAccount']} subtitle={t['shareAndAccountSubtitle']}>
              <Box display="flex" flexDir="column" gap="s16">
                <Box>
                  <Text fontWeight="Regular" color="neutralColorLight.Gray-80" fontSize="r1">
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
                    __placeholder={t['shareSelectAccount']}
                  />
                </Box>
              </Box>
            </ShareSettingsCard>
          ) : dividentTransferTreatment === DividendTransferTreatment?.AccountTransfer ? (
            <ShareSettingsCard
              title={t['shareAccountTransfer']}
              subtitle={t['shareAccountTransferSubtitle']}
            >
              <Box width="33%">
                <FormSelect
                  name="accountForShareDividends"
                  options={[]}
                  __placeholder={t['shareSelectAccount']}
                />
              </Box>
            </ShareSettingsCard>
          ) : dividentTransferTreatment === DividendTransferTreatment?.BookPayable ? (
            <ShareSettingsCard
              title={t['shareBookPayables']}
              subtitle={t['shareBookPayablesSubtitle']}
            >
              <Box width="33%">
                <FormSelect
                  name="organizationFundForDividends"
                  options={[]}
                  __placeholder={t['shareNameOfTheFund']}
                />
              </Box>
            </ShareSettingsCard>
          ) : null}
        </Box>
        <SettingsFooter handleSave={handleSubmit} handleDiscard={handleDiscard} />
      </form>
    </FormProvider>
  );
};

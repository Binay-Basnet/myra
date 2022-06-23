import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box } from '@chakra-ui/react';

import { FormRadioGroup, FormSwitchTab } from '@coop/shared/form';
import { Input, Select, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsDividendPage = () => {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      distributionCondition: 'quarterly',
      dividentTransferTreatment: 'shareAndAccount',
    },
  });

  const { watch } = methods;

  const dividentTransferTreatment = watch('dividentTransferTreatment');

  return (
    <FormProvider {...methods}>
      <ShareSettingsHeader title={t['settingsShareDivident']} />
      <ShareSettingsCard
        title={t['shareDividentDistributionCondition']}
        subtitle={t['shareAddDifferentShareDividentRate']}
      >
        <Box display="flex" flexDir="column" gap={'s16'}>
          <FormSwitchTab
            name={'distributionCondition'}
            options={[
              { label: t['shareDividentDaily'], value: 'daily' },
              { label: t['shareDividentMonthly'], value: 'monthly' },
              {
                label: t['shareDividentQuarterly'],
                value: 'quarterly',
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
              value: 'shareAndAccount',
            },
            {
              label: t['shareDividentTransferTreatmentAccountTransfer'],
              value: 'accountTransfer',
            },
            {
              label: t['shareDividentTransferTreatmentBookPayable'],
              value: 'bookPayable',
            },
          ]}
          name="dividentTransferTreatment"
        />
      </ShareSettingsCard>

      {dividentTransferTreatment === 'shareAndAccount' ? (
        <ShareSettingsCard
          title={t['shareAndAccount']}
          subtitle={t['shareAndAccountSubtitle']}
        >
          <Box display="flex" flexDir="column" gap={'s16'}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              h="36px"
            >
              <Text fontSize="r1" fontWeight="400" color="gray.500">
                {t['shareAllocation']}
              </Text>
              <Text fontSize="r1" fontWeight="400" color="gray.500">
                12
              </Text>
            </Box>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              h="36px"
            >
              <Text fontSize="r1" fontWeight="400" color="gray.500">
                {t['shareAccountAllocation']}
              </Text>
              <Text fontSize="r1" fontWeight="400" color="gray.500">
                32
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
              <Select
                menuPlacement="top"
                size="sm"
                options={[]}
                placeholder={t['shareSelectAccount']}
              />
            </Box>
          </Box>
        </ShareSettingsCard>
      ) : dividentTransferTreatment === 'accountTransfer' ? (
        <ShareSettingsCard
          title={t['shareAccountTransfer']}
          subtitle={t['shareAccountTransferSubtitle']}
        >
          <Box width="33%">
            <Select
              menuPlacement="top"
              size="sm"
              options={[]}
              placeholder={t['shareSelectAccount']}
            />
          </Box>
        </ShareSettingsCard>
      ) : dividentTransferTreatment === 'bookPayable' ? (
        <ShareSettingsCard
          title={t['shareBookPayables']}
          subtitle={t['shareBookPayablesSubtitle']}
        >
          <Box width="33%">
            <Select
              menuPlacement="top"
              size="sm"
              options={[]}
              placeholder={t['shareNameOfTheFund']}
            />
          </Box>
        </ShareSettingsCard>
      ) : null}
    </FormProvider>
  );
};

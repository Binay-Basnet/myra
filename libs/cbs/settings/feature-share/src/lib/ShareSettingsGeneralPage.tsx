import React from 'react';

import { Box, Checkbox, Input, Select, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsGeneralPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <ShareSettingsHeader title={t['settingsShareGeneral']} />
      <ShareSettingsCard
        title={t['shareTypesOfShare']}
        subtitle={t['shareChooseTypeOfShare']}
      >
        <Box display="flex" flexDir="column" gap="s16">
          <Checkbox label={t['sharePaidUpShare']} isChecked />
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard title={t['shareIssueQuantity']}>
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareMultiplicityFactor']}
            </Text>
            <Box>
              <Input size="sm" placeholder="50" />
            </Box>
          </Box>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareTransactableMinimumQuantityOfShareThatCanBeIssued']}
            </Text>
            <Box>
              <Input size="sm" placeholder="100" />
            </Box>
          </Box>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareMaximumQuantityOfShareThatCanBeIssued']}
            </Text>
            <Box>
              <Input size="sm" placeholder="200" />
            </Box>
          </Box>
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard title={t['shareRate']}>
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['sharePaidUpShare']}
            </Text>
            <Box>
              <Input size="sm" placeholder="100" isDisabled />
            </Box>
          </Box>
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard
        title={t['shareIssueAuthority']}
        subtitle={t['shareIssueAuthoritySubtitle']}
      >
        <Box display="flex" flexDir="column" gap="s16">
          <Checkbox label={t['shareHeadOffice']} isChecked />
          <Checkbox label={t['shareRegionalOffice']} />
          <Checkbox label={t['shareServiceCenterBranch']} />
          <Checkbox label={t['shareContactOffice']} />
          <Checkbox label={t['shareOther']} />
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard
        title={t['shareKitta']}
        subtitle={t['shareKittaSubtitle']}
      >
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareTypeOfShare']}
            </Text>
            <Box width="190px">
              <Select
                options={[
                  {
                    label: t['shareTransactable'],
                    value: 'transactable',
                  },
                  {
                    label: t['shareNonTransactable'],
                    value: 'non-transactable',
                  },
                ]}
                placeholder={t['sharePaidUpShare']}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareNumberOfAuthorizedPaidUpShare']}
            </Text>
            <Box>
              <Input size="sm" placeholder="10,000" />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareNumberOfIssuedShare']}
            </Text>
            <Box>
              <Input size="sm" placeholder="25,000" />
            </Box>
          </Box>
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard
        title={t['shareCertificateNumber']}
        subtitle={t['shareCertificateNumberSubtitle']}
      >
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareStartNumber']}
            </Text>
            <Box>
              <Input size="sm" placeholder="00001" />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareEndNumber']}
            </Text>
            <Box>
              <Input size="sm" placeholder="00001" />
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareIncrementer']}
            </Text>
            <Box>
              <Input size="sm" placeholder="1" />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareNumberOfDigits']}
            </Text>
            <Box>
              <Input size="sm" placeholder="7" />
            </Box>
          </Box>
        </Box>{' '}
        <Box
          mt="s16"
          mx="-16px"
          p="s16"
          mb="-16px"
          width="calc(100% + 32px)"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="background.500"
        >
          <Text p="s12" color="gray.800" fontSize="r1" fontWeight="500">
            {t['sharePreview']}
          </Text>
          <Text p="s12" color="gray.800" fontSize="r1" fontWeight="400">
            XYZ12346342
          </Text>
        </Box>
      </ShareSettingsCard>
    </>
  );
};

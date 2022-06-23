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
          <Checkbox label={t['shareTransactable']} isChecked />
          <Checkbox label={t['shareNonTransactable']} />
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard title={t['shareIssueQuantity']}>
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareMultiplicityFactor']}
            </Text>
            <Box w="33%">
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
            <Box w="33%">
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
            <Box w="33%">
              <Input size="sm" placeholder="200" />
            </Box>
          </Box>
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard title={t['shareRate']}>
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareTransactableShare']}
            </Text>
            <Box w="33%">
              <Input size="sm" placeholder="100" isDisabled />
            </Box>
          </Box>{' '}
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              {t['shareNonTransactableShare']}
            </Text>
            <Box w="33%">
              <Input size="sm" placeholder="100" isDisabled />
            </Box>
          </Box>
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard
        title="Share Issue Authority"
        subtitle="Who can issue the share"
      >
        <Box display="flex" flexDir="column" gap="s16">
          <Checkbox label="Head Office" isChecked />
          <Checkbox label="Regional Office" />
          <Checkbox label="Service Center / Branch" />
          <Checkbox label="Contact Office (Samparka Karyalaya)" />
          <Checkbox label="Other" />
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard title="Share Kitta" subtitle="Who can issue the share">
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Type of Share
            </Text>
            <Box width="33%">
              <Select
                size="sm"
                options={[
                  {
                    label: 'Transactable',
                    value: 'transactable',
                  },
                  {
                    label: 'Non-Transactable',
                    value: 'non-transactable',
                  },
                ]}
                placeholder="Transactable"
              />
            </Box>
          </Box>{' '}
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Number of Authorized Paid-up Share
            </Text>
            <Box w="33%">
              <Input size="sm" placeholder="10,000" />
            </Box>
          </Box>{' '}
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Number of Issued Share
            </Text>
            <Box w="33%">
              <Input size="sm" placeholder="25,000" />
            </Box>
          </Box>
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard
        title="Share Certificate Number"
        subtitle="Who can issue the share"
      >
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Start Number
            </Text>
            <Box w="33%">
              <Input size="sm" placeholder="00001" />
            </Box>
          </Box>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              End Number
            </Text>
            <Box w="33%">
              <Input size="sm" placeholder="00001" />
            </Box>
          </Box>

          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Incrementer
            </Text>
            <Box w="33%">
              <Input size="sm" placeholder="1" />
            </Box>
          </Box>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Number of Digits
            </Text>
            <Box w="33%">
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
            Preview
          </Text>
          <Text p="s12" color="gray.800" fontSize="r1" fontWeight="400">
            XYZ12346342
          </Text>
        </Box>
      </ShareSettingsCard>
    </>
  );
};

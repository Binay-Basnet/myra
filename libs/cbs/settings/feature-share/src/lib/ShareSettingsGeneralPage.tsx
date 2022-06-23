import React from 'react';

import { Box, Checkbox, Input, Select, Text } from '@coop/shared/ui';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsGeneralPage = () => {
  return (
    <>
      <ShareSettingsHeader title="General" />
      <ShareSettingsCard
        title="Types of Share"
        subtitle="Choose which type of share is allowed"
      >
        <Box display="flex" flexDir="column" gap="s16">
          <Checkbox label="Transactable" isChecked />
          <Checkbox label="Non-transactable" />
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard title="Share Issue Quantity">
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Multiplicity Factor
            </Text>
            <Input size="sm" placeholder="50" maxWidth="188px" />
          </Box>{' '}
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Minimum Quantity of Share that can be issued
            </Text>
            <Input size="sm" placeholder="100" maxWidth="188px" />
          </Box>{' '}
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Maximum Quantity of Share that can be issued
            </Text>
            <Input size="sm" placeholder="200" maxWidth="188px" />
          </Box>
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard title="Share Rate">
        <Box display="flex" flexDir="column" width="100%" gap="s16">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Transactable Share
            </Text>
            <Input size="sm" placeholder="100" isDisabled maxWidth="188px" />
          </Box>{' '}
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r1" color="gray.800">
              Transactable Share
            </Text>
            <Input size="sm" placeholder="100" isDisabled maxWidth="188px" />
          </Box>{' '}
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
            <Box maxWidth="188px">
              <Select placeholder="Transactable" />
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
            <Input size="sm" placeholder="10,000" maxWidth="188px" />
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
            <Input size="sm" placeholder="25,000" maxWidth="188px" />
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
            <Input size="sm" placeholder="00001" maxWidth="188px" />
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
            <Input size="sm" placeholder="00001" maxWidth="188px" />
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
            <Input size="sm" placeholder="1" maxWidth="188px" />
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
            <Input size="sm" placeholder="7" maxWidth="188px" />
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

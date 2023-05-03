import { AiOutlineMail } from 'react-icons/ai';
import { BsGlobe, BsTelephone } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { Avatar, Box, DetailPageTabs, Divider, Icon, Scrollable, Text } from '@myra-ui';

import { useGetOrganizationDataQuery } from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';

import Documents from '../components/Documents';
import { OrganizationalProfile } from '../components/OrganizationalProfile';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureOrgDetailsProps {}

export const CbsSettingsFeatureOrgDetails = () => {
  const router = useRouter();
  const { data } = useGetOrganizationDataQuery();
  const organizationData = data?.settings?.general?.organization?.mine?.data;
  const tabQuery = router.query['tab'] as string;
  return (
    <>
      <SettingsPageHeader heading="Organization" />
      <Box>
        <Box
          bg="gray.0"
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <Box p="s16" display="flex" gap={2}>
            <Avatar
              size="lg"
              src={organizationData?.basicDetails?.logo as string}
              name={organizationData?.basicDetails?.name as string}
            />
            <Box>
              <Text fontSize="r1" fontWeight="medium">
                {organizationData?.basicDetails?.name}
              </Text>
              <Text fontSize="r1">{organizationData?.basicDetails?.typeOfOrganization}</Text>
            </Box>
          </Box>
          <Divider />
          <Box p="s16" display="flex" flexDir="column" gap={2}>
            <Box display="flex" gap={2} alignItems="center">
              <Icon size="sm" as={BsTelephone} />
              <Text fontSize="s3">{organizationData?.contactDetails?.phoneNumber}</Text>
            </Box>
            <Box display="flex" gap={2} alignItems="center">
              <Icon size="sm" as={AiOutlineMail} />
              <Text fontSize="s3">{organizationData?.contactDetails?.email}</Text>
            </Box>
            <Box display="flex" gap={2} alignItems="center">
              <Icon size="sm" as={BsGlobe} />
              <Text fontSize="s3">{organizationData?.contactDetails?.website}</Text>
            </Box>
          </Box>
          <Divider />
          <DetailPageTabs tabs={['Organizational Profile', 'Documents']} />
        </Box>
        <Scrollable detailPage>
          <Box
            bg="background.500"
            ml="320px"
            p="s16"
            display="flex"
            flexDir="column"
            gap="s16"
            minH="100%"
          >
            {(tabQuery === 'organizational profile' || tabQuery === 'undefined' || !tabQuery) && (
              <OrganizationalProfile data={organizationData} />
            )}
            {tabQuery === 'documents' && <Documents data={organizationData} />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

export default CbsSettingsFeatureOrgDetails;

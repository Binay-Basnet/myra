import { IoAddOutline } from 'react-icons/io5';

import { Box, Grid, Icon, Text } from '@coop/shared/ui';

import { MemberBasicInformation, MemberDetailsSidebar, MemberStatistics } from '../components';

export const MemberDetails = () => (
  <>
    {' '}
    <Box
      w="320px"
      position="fixed"
      h="calc(100vh - 110px)"
      borderRight="1px"
      borderRightColor="border.layout"
    >
      <MemberDetailsSidebar />
    </Box>
    <Box display="flex" p="s16" flexDir="column" gap="s16" ml="320px" bg="border.layout">
      <Text fontSize="r3" fontWeight="600">
        Overview
      </Text>
      <Box display="flex" flexDirection="column" gap="s16">
        <Text fontWeight="600" fontSize="r3">
          Quick Links
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s16">
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderRadius="br2"
            gap="s12"
            h="58px"
            pl="s16"
          >
            <Icon as={IoAddOutline} />
            <Text fontWeight="500" fontSize="s3">
              here
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderRadius="br2"
            gap="s12"
            h="58px"
            pl="s16"
          >
            <Icon as={IoAddOutline} />
            <Text fontWeight="500" fontSize="s3">
              here
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderRadius="br2"
            gap="s12"
            h="58px"
            pl="s16"
          >
            <Icon as={IoAddOutline} />
            <Text fontWeight="500" fontSize="s3">
              here
            </Text>
          </Box>
        </Grid>
      </Box>
      <MemberBasicInformation />
      <MemberStatistics />
    </Box>
  </>
);

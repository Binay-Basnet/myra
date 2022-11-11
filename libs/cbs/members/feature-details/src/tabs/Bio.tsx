import { IoCreateOutline, IoEyeOutline, IoPrintOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, Icon, Text } from '@coop/shared/ui';

import {
  MemberAddressInfo,
  MemberBasicInfo,
  MemberContactInfo,
  MemberFamilyInfo,
} from '../components';

// const links = [
//   {
//     icon: IoCreateOutline,
//     title: 'Edit KYM',
//   },
//   {
//     icon: IoEyeOutline,
//     title: 'View KYM',
//   },
//   {
//     icon: IoPrintOutline,
//     title: 'Print KYM',
//   },
// ];
export const Bio = () => {
  const router = useRouter();

  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Bio{' '}
      </Text>
      <Box display="flex" flexDirection="column" gap="s16" pb="s16">
        <Text fontWeight="600" fontSize="r1">
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
            cursor="pointer"
            onClick={() => {
              router.push(`/members/individual/edit/${router.query['id'] as string}`);
            }}
          >
            <Icon as={IoCreateOutline} />

            <Text fontWeight="500" fontSize="s3">
              Edit KYM
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
            <Icon as={IoEyeOutline} />

            <Text fontWeight="500" fontSize="s3">
              View KYM{' '}
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
            <Icon as={IoPrintOutline} />

            <Text fontWeight="500" fontSize="s3">
              Print KYM{' '}
            </Text>
          </Box>
        </Grid>
      </Box>
      <MemberBasicInfo />
      <MemberContactInfo />
      <MemberAddressInfo />
      <MemberFamilyInfo />
    </>
  );
};

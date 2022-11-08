import { IoCreateOutline, IoEyeOutline, IoPrintOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, Icon, Text } from '@coop/shared/ui';

import {
  MemberAddressInfo,
  MemberBasicInfo,
  MemberContactInfo,
  MemberFamilyInfo,
} from '../components';

const links = [
  {
    icon: IoCreateOutline,
    title: 'Edit KYM',
    link: '/',
  },
  {
    icon: IoEyeOutline,
    title: 'View KYM',
    link: '/',
  },
  {
    icon: IoPrintOutline,
    title: 'Print KYM',
    link: '/',
  },
];
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
          {links?.map((item) => (
            <Box key={`${item.link}${item.title}`}>
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
                onClick={() => router.push(`${item.link}`)}
              >
                <Icon as={item?.icon} />

                <Text fontWeight="500" fontSize="s3">
                  {item.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
      <MemberBasicInfo />
      <MemberContactInfo />
      <MemberAddressInfo />
      <MemberFamilyInfo />
    </>
  );
};

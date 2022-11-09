import { IoAddOutline, IoList } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, Icon, Text } from '@coop/shared/ui';

import { ShareInfo, ShareRegister, ShareTable } from '../components';

const links = [
  {
    title: 'New Share Issue',
    link: '/share/share-issue',
  },
  {
    title: 'New Share Return',
    link: '/share/share-return',
  },
  {
    title: 'Share Register',
    link: '/share/register',
  },
];
export const MemberShareInfo = () => {
  const router = useRouter();
  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Share
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
                <Icon as={item.title !== 'Share Register' ? IoAddOutline : IoList} />

                <Text fontWeight="500" fontSize="s3">
                  {item.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
      <ShareInfo />
      <ShareRegister />
      <ShareTable />
    </>
  );
};

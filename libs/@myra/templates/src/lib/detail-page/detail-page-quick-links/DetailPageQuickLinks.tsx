import { IconType } from 'react-icons';
import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, Icon, Text } from '@myra-ui/foundations';

/* eslint-disable-next-line */
export interface DetailPageQuickLinksProps {
  links: { title: string; link?: string; icon?: IconType; onClick?: () => void }[];
}

export const DetailPageQuickLinks = ({ links }: DetailPageQuickLinksProps) => {
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" gap="s8" pb="s16">
      {/* <Text fontWeight="600" fontSize="r1">
        Quick Links
      </Text> */}
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
              boxShadow="E0"
              onClick={() => (item.onClick ? item.onClick() : router.push(`${item.link}`))}
            >
              <Icon color="primary.500" as={item.icon || IoAddOutline} />

              <Text fontWeight="500" fontSize="s3">
                {item.title}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default DetailPageQuickLinks;

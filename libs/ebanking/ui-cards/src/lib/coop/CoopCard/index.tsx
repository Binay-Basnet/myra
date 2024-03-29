import { IconType } from 'react-icons';
import Link from 'next/link';

import { Box, Icon, Text } from '@myra-ui';

interface ICoopCardProps {
  icon?: IconType;
  title: string;
  link: string;
}
export const CoopCard = ({ icon, title, link }: ICoopCardProps) => (
  <Link href={link}>
    <Box
      w="100%"
      display="flex"
      flexDir="column"
      gap="s8"
      p="s16"
      cursor="pointer"
      border="1px"
      borderColor="border.layout"
      borderRadius="br2"
      _hover={{ bg: 'gray.100' }}
    >
      <Icon as={icon} size="lg" color="primary.500" />
      <Text variant="tableHeader" color="gray.800">
        {title}
      </Text>
    </Box>
  </Link>
);

import { IconType } from 'react-icons';
import Link from 'next/link';

import { Box, Icon, TextFields } from '@coop/shared/ui';

interface ICoopCardProps {
  icon?: IconType;
  title: string;
  link: string;
}
export const CoopDownloadCard = ({ icon, title, link }: ICoopCardProps) => {
  return (
    <Link href={link}>
      <Box
        display="flex"
        gap="s8"
        p="s16"
        _hover={{ bg: 'gray.100' }}
        cursor="pointer"
        border="1px"
        borderColor="border.layout"
        borderRadius="br2"
      >
        <Icon as={icon} size="lg" color="primary.500" />
        <TextFields variant="tableHeader" color="gray.800">
          {title}
        </TextFields>
      </Box>
    </Link>
  );
};

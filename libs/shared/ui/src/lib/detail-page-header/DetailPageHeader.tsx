import { IoChevronForwardOutline, IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { IconButton, Text } from '@chakra-ui/react';

import Avatar from '../avatar/Avatar';
import Box from '../box/Box';
import Icon from '../icon/Icon';

export interface DetailPageHeaderProps {
  title: string;
  member: {
    name: string;
    profilePicUrl?: string | undefined | null;
  };
  closeLink?: string;
}

export const DetailPageHeader = ({ title, member, closeLink }: DetailPageHeaderProps) => {
  const router = useRouter();
  return (
    <Box
      h="60px"
      bg="white"
      zIndex="10"
      w="100%"
      borderBottom="1px solid "
      borderColor="border.layout"
      px="s16"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" gap="s10">
        <Text fontSize="r2" fontWeight="500" color="gray.700">
          {title}
        </Text>
        <Icon as={IoChevronForwardOutline} size="md" />
        <Avatar name={member.name} src={member.profilePicUrl ?? ''} size="sm" />
        <Text fontSize="r2" fontWeight="500" color="gray.700">
          {member.name}
        </Text>
      </Box>
      <IconButton
        variant="ghost"
        aria-label="close"
        color="gray.500"
        height="40px"
        icon={<Icon as={IoClose} size="lg" />}
        onClick={() => {
          if (closeLink) {
            router.push(closeLink);
          } else {
            router.back();
          }
        }}
      />
    </Box>
  );
};

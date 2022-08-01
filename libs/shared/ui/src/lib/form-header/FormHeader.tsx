import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Box, IconButton } from '@chakra-ui/react';

import Icon from '../icon/Icon';
import TextFields from '../text-fields/TextFields';

export interface FormHeaderProps {
  title: string;
  closeLink?: string;
}

export function FormHeader({ title, closeLink }: FormHeaderProps) {
  const router = useRouter();

  return (
    <Box
      h="50px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="s16"
      bg="white"
      borderBottom="1px"
      borderBottomColor="border.layout"
    >
      <TextFields variant="pageHeader" color="gray.800">
        {title}
      </TextFields>
      <IconButton
        variant={'ghost'}
        aria-label="close"
        color="gray.500"
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
}

export default FormHeader;

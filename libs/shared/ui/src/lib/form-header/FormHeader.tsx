import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Box, Button, IconButton } from '@chakra-ui/react';

import Icon from '../icon/Icon';
import TextFields from '../text-fields/TextFields';

export interface FormHeaderProps {
  title: string;
  closeLink?: string;
  buttonLabel?: string;
  buttonHandler?: () => void;
}

export const FormHeader = ({ title, closeLink, buttonLabel, buttonHandler }: FormHeaderProps) => {
  const router = useRouter();

  return (
    <Box
      w="100%"
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

      <Box display="flex" gap="s24">
        {buttonLabel && buttonHandler && (
          <Button variant="ghost" onClick={buttonHandler}>
            {buttonLabel}
          </Button>
        )}
        <IconButton
          variant="ghost"
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
    </Box>
  );
};

export default FormHeader;

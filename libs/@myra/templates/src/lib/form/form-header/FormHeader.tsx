import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Button, Icon, IconButton, Text } from '@myra-ui/foundations';

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
      <Text variant="pageHeader" color="gray.800">
        {title}
      </Text>

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
    </Box>
  );
};

export default FormHeader;

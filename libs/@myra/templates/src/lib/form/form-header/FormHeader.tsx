import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { AlertDialog } from '@myra-ui';
import { Box, Button, Icon, IconButton, Text } from '@myra-ui/foundations';

export interface FormHeaderProps {
  title: string;
  closeLink?: string;
  buttonLabel?: string;
  buttonHandler?: () => void;
  isFormDirty?: boolean;
}

export const FormHeader = ({
  title,
  closeLink,
  buttonLabel,
  buttonHandler,
  isFormDirty,
}: FormHeaderProps) => {
  const router = useRouter();
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleLeavePageButton = () => {
    if (isFormDirty) {
      setShowAlertDialog(true);
    } else {
      router?.back();
    }
  };

  const handleCloseModal = () => {
    setShowAlertDialog(false);
  };

  return (
    <Box
      w="100%"
      h="3.125rem"
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
        {!isFormDirty && (
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
        )}

        {isFormDirty && (
          <IconButton
            variant="ghost"
            aria-label="close"
            color="gray.500"
            height="40px"
            icon={<Icon as={IoClose} size="lg" />}
            onClick={handleLeavePageButton}
          />
        )}

        <AlertDialog onClose={handleCloseModal} show={showAlertDialog} />
      </Box>
    </Box>
  );
};

export default FormHeader;

import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, Text } from '@coop/shared/ui';

interface IAccountingPageHeader {
  heading: string;
  buttonLabel?: string;
  buttonHandler?: () => void;
}

export const AccountingPageHeader = ({
  heading,
  buttonLabel,
  buttonHandler,
}: IAccountingPageHeader) => {
  return (
    <Box
      bg="white"
      zIndex="10"
      w="100%"
      top="110px"
      position="sticky"
      borderBottom="1px solid #E6E6E6"
      display="flex"
      alignItems="center"
      px="s16"
      py="s8"
      height="60px"
      gap="s48"
    >
      <Text fontSize="r2" fontWeight="600" color="gray.800">
        {heading}
      </Text>

      {buttonLabel && buttonHandler && (
        <Box display="flex" justifyContent="flex-end" flexGrow={100}>
          <Button leftIcon={<AddIcon />} onClick={buttonHandler}>
            {buttonLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
};

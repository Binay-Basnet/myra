import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, Text } from '@myra-ui';

interface IAccountingPageHeader {
  heading: string;
  buttonLabel?: string;
  buttonHandler?: () => void;
}

export const AccountingPageHeader = ({
  heading,
  buttonLabel,
  buttonHandler,
}: IAccountingPageHeader) => (
  <Box
    bg="white"
    zIndex="10"
    w="100%"
    position="sticky"
    borderBottom="1px solid "
    borderColor="border.layout"
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

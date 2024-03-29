import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, PageHeaderTab, Text } from '@myra-ui';

interface IDetailPageHeader {
  heading: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
  buttonLabel?: string;
  buttonHandler?: () => void;
}

export const DetailPageHeader = ({
  tabItems,
  heading,
  buttonLabel,
  buttonHandler,
}: IDetailPageHeader) => (
  <Box
    bg="white"
    zIndex="10"
    w="100%"
    top="110px"
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

    <PageHeaderTab list={tabItems ?? []} />

    {buttonLabel && buttonHandler && (
      <Box display="flex" justifyContent="flex-end" flexGrow={100}>
        <Button leftIcon={<AddIcon />} onClick={buttonHandler}>
          {buttonLabel}
        </Button>
      </Box>
    )}
  </Box>
);

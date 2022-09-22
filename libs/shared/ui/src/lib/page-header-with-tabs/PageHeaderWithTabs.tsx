import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, PageHeaderTab, Text } from '@coop/shared/ui';

interface PageHeaderWithTabsProps {
  heading: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
  buttonLabel?: string;
  buttonHandler?: () => void;
}

export const PageHeaderWithTabs = ({
  tabItems,
  heading,
  buttonLabel,
  buttonHandler,
}: PageHeaderWithTabsProps) => (
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
    <Text fontSize="r2" fontWeight="SemiBold" color="gray.800" w="250px">
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

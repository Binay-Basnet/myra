import { Box, Button, PageHeaderTab, Text } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface ITableListPageHeader {
  heading: string;
  onClickHandler?: () => void;
  tabItems?: {
    title: string;
    key: string;
  }[];
}

export const InventoryWarehouseHeader = ({
  tabItems,
  heading,
  onClickHandler,
}: ITableListPageHeader) => {
  const { t } = useTranslation();
  return (
    <Box
      bg="white"
      zIndex="10"
      w="100%"
      top="110px"
      position="fixed"
      borderBottom="1px solid"
      borderColor="border.layout"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="s16"
    >
      <Box display="flex" gap="s48" alignItems="center">
        {' '}
        <Text fontSize="r2" fontWeight="600" color="gray.800">
          {t[heading]}
        </Text>
        <PageHeaderTab list={tabItems ?? []} />
      </Box>

      <Button onClick={onClickHandler}> New Warehouse </Button>
      <Box>jj</Box>
    </Box>
  );
};

import { Box, PageHeaderTab, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface ITableListPageHeader {
  heading: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
}

export const InventoryWarehouseHeader = ({
  tabItems,
  heading,
}: ITableListPageHeader) => {
  const { t } = useTranslation();
  return (
    <Box
      bg="white"
      zIndex="10"
      w="100%"
      top="110px"
      position="fixed"
      borderBottom="1px solid #E6E6E6"
      display="flex"
      alignItems="center"
      px="s16"
      gap="s48"
    >
      <Text fontSize="r2" fontWeight="600" color="gray.800">
        {t[heading]}
      </Text>

      <PageHeaderTab list={tabItems ?? []} />
    </Box>
  );
};
